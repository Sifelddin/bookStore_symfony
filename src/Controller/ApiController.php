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
    public function index(): Response
    {
        return $this->render("api/index.html.twig");
    }

    #[Route('/checkout', name: 'app_api', methods: ["POST", "GET"])]
    public function checkout(Request $request, SessionInterface $session): Response
    {
        $data = $request->toArray();
        //dd($data);
        return new JsonResponse($data);
        //return  new JsonResponse(['data' => 123]);
    }
}
