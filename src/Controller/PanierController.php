<?php

namespace App\Controller;

use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class PanierController extends AbstractController
{
    #[Route('/panier', name: 'app_panier')]
    public function index(SessionInterface $session, BookRepository $bookRepository)
    {
        $panier= $session->get('panier',[]);

        $panier2=[];

        foreach ($panier as $id => $quantity){
            $panier2 []= [
                'products'=>$bookRepository->find($id),
                'quantity'=> $quantity
            ];

        }
           //dd($panier2);


        return $this->render('panier/index.html.twig', [
            'items'=>$panier2
        ]);
    }

    #[Route('/panier/add/{id}', name: 'add_panier')]
    public function add($id, Request $request){
        $session = $request->getSession();
        $panier = $session->get('panier',[]);

        if(!empty($panier[$id])){
            $panier[$id]++;
        }else{
            $panier[$id]=1;
        }
    
        $session->set('panier',$panier);
        dd($session->get('panier'));
    }

    #[Route('/panier/remove/{id}', name: 'remove_panier')]
    public function remove($id, SessionInterface $session){

        $panier = $session->get('panier',[]);

        if(!empty($panier[$id])){
            unset($panier[$id]);
        }
        $session->set('panier',$panier);
        dd($session->get('panier'));

        return $this->redirectToRoute("app_panier");
    }


    #[Route('/panier/minus/{id}', name: 'minus_panier')]
    public function minus($id, SessionInterface $session){ 

        $panier = $session->get('panier',[]);

        if(!empty($panier[$id])){
            $panier[$id]--;
        }

        $session->set('panier',$panier);
       // dd($session->get('panier'));

        return $this->redirectToRoute("app_panier");

    }


    #[Route('/panier/plus/{id}', name: 'plus_panier')]
    public function plus($id, SessionInterface $session){ 

        $panier = $session->get('panier',[]);

        if(!empty($panier[$id])){
            $panier[$id]++;
        }

        $session->set('panier',$panier);

        return $this->redirectToRoute("app_panier");

    }

}
