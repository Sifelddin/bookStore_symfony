<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiController extends AbstractController
{

    #[Route('/react', name: 'app_react')]
    public function index(Request $request): Response
    {
        if ($request->isXmlHttpRequest()) {
            $data = $request->getContent();
            dd($data);
            return new JsonResponse($data);
        }
        return $this->render("api/index.html.twig");
    }

    #[Route('/checkout', name: 'app_api')]
    public function checkout(Request $request, SessionInterface $session): Response
    {
        if (!$request->isXmlHttpRequest()) {
            $cart = $session->get('cart');
            dd($cart);
            return $this->json(['data' => 'empty']);
        } else {
            $data = $request->toArray();
            $session->set('cart', $data);
            return new JsonResponse($data);
        }

        //return  new JsonResponse(['data' => 123]);
    }
}
