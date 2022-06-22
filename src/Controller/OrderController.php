<?php

namespace App\Controller;

use App\Entity\Order;
use App\Form\OrderType;
use App\Repository\OrderRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class OrderController extends AbstractController
{


    #[Route('/{reactRouting}', name: 'app_react', priority: "-1", defaults: ["reactRouting" => null], requirements: ["reactRouting" => ".+"])]
    public function index(): Response
    {
        return $this->render("api/index.html.twig");
    }

    #[Route('/checkout', name: 'app_api')]
    public function checkout(Request $request, OrderRepository $orderRepository): Response
    {
        $user = $this->getUser();

        $order = new Order();
        $form = $this->createForm(OrderType::class, $order);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $order->setUserClient($user);
            $orderRepository->add($order, true);
            return $this->redirectToRoute('app_book_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('catalogue/order.html.twig', [
            'order' => $order,
            'form' => $form->createView(),
            'user' => $user
        ]);
    }
}
