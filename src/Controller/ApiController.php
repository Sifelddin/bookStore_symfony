<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    #[Route('/api', name: 'app_api')]
    public function sendApi(): Response
    {
        $data = [
            "test" => "exemple1",
            "test1" => "exemple1",
            "test2" => "exemple1",
            "test3" => "exemple1"
        ];
        return $this->json($data);
    }

    #[Route('/react', name: 'app_react')]
    public function index(): Response
    {
        return $this->render("api/index.html.twig");
    }
}
