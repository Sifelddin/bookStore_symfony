<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrderHistoryController extends AbstractController
{
    #[Route('/orders/history', name: 'app_order_history')]
    public function index(): Response
    {
        return $this->render('order_history/index.html.twig', [
            'controller_name' => 'OrderHistoryController',
        ]);
    }
}
