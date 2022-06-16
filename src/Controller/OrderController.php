<?php

namespace App\Controller;

use App\Entity\Order;
use App\Form\OrderType;
use App\Repository\OrderRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class OrderController extends AbstractController
{

    #[Route('/api/cart', name: 'api_cart')]
    public function apiCart(Request $request, SessionInterface $session): Response
    {

        $cart = $session->get('cart');
        if ($cart) {
            return $this->json($cart);
        }
        return $this->json(null);
    }
    
    #[Route('/{reactRouting}', name :'app_react', priority:"-1", defaults :["reactRouting" => null] , requirements :["reactRouting"=>".+"])]
    public function index(): Response
    {
        return $this->render("api/index.html.twig");
    }

    #[Route('/checkout', name: 'app_api')]
    public function checkout(Request $request, SessionInterface $session, OrderRepository $orderRepository): Response
    {
        if ($request->isXmlHttpRequest()) {
            $data = $request->toArray();
            $cart = $session->set('cart', $data);
            return $this->json($cart);
        }
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
