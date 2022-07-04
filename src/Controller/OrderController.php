<?php

namespace App\Controller;

use App\Entity\BookOrder;
use App\Entity\Order;
use App\Form\OrderType;
use App\Repository\BookOrderRepository;
use App\Repository\BookRepository;
use App\Repository\OrderRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
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

        $session = $request->getSession();

        $order = new Order();

        $form = $this->createForm(OrderType::class, $order);
        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            $session->set('order',$order);
            return $this->redirectToRoute('app_summary', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('catalogue/order.html.twig', [
            'order' => $order,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/summary', name: 'app_summary')]
    public function summary(Request $request, SessionInterface $session, BookRepository $bookRepository): Response
    {

        $order = $session->get('order'); 
        $user = $this->getUser();

        $panier= $session->get('panier',[]);

        $panier2=[];

        foreach ($panier as $id => $quantity){
            $panier2 []= [
                'products'=>$bookRepository->find($id),
                'quantity'=> $quantity
            ];

        }
    
        return $this->render('catalogue/summary.html.twig', [
            'order' => $order,
            'user' => $user,
            'items'=>$panier2
        ]);
    }


    #[Route('/test', name: 'new_order')]
    public function test(SessionInterface $session, OrderRepository $orderRepository,BookOrderRepository $bookOrderRepository,BookRepository $bookRepository ): Response
    {

        $order = $session->get('order'); 
        $panier= $session->get('panier',[]);
        //dd ($panier);
        $user = $this->getUser();

        $order->setUserClient($user);
        $order->setCoef($user->getCoef());

         $orderRepository->add($order, true);

        

        foreach ($panier as $id => $quantity){

            $book=$bookRepository->find($id);
            $price=$book->getPrice();
            $results = $orderRepository->findOneBy([], ['id' => 'DESC']);;
            
            $bookOrder  = new BookOrder;
            $bookOrder->setQuantity($quantity);
            $bookOrder->setBook($book);
            $bookOrder->setUnitPrice($price);
            $bookOrder->setOrder($results);

            $bookOrderRepository->add($bookOrder, true);

       }

        return $this->redirectToRoute('app_catalogue', [], Response::HTTP_SEE_OTHER);

    }

            
        
}