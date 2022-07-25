<?php 


namespace App\EventListener;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use ApiPlatform\Core\EventListener\DeserializeListener as DecoratedListener;
use ApiPlatform\Core\Serializer\SerializerContextBuilderInterface;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class DeserializerListener{

    public function __construct(
        private SerializerContextBuilderInterface  $serializerContextBuilderInterface,
        private DenormalizerInterface $denormalizer,
        private DecoratedListener $decorated)
        
    {
        
    }

    public function onKernelRequest (RequestEvent $event){
        $request = $event->getRequest();
        if($request->isMethodCacheable() || $request->isMethod(Request::METHOD_DELETE)){
            return;
        }

        if($request->getContentType() === 'multipart'){
            $this->denormalizeFromRequest($request);

        }else{
            $this->decorated->onKernelRequest($event);
        }
        
    }
    
    private function denormalizeFromRequest(Request $request): void
    {
        $attributes = RequestAttributesExtractor::extractAttributes($request);
        if(empty($attributes)){
            return;
        }
        $context = $this->serializerContextBuilderInterface->createFromRequest($request,false,$attributes);
        $populated = $request->attributes->get('data');
        if($populated !== null){
            $context['object_to_populate'] = $populated;
        }
        $data = $request->request->all();
        $files = $request->files->all();
        $object = $this->denormalizer->denormalize(array_merge($data,$files) , $attributes['resource_class'],null,$context);
        $request->attributes->set('data', $object);

    }
}