<?php

namespace App\Controller;

use App\Entity\Order;
use App\Form\OrderType;
use App\Repository\BookRepository;
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

        $session = $request->getSession();
     
        if($session->get('order')){
            
            $user = $this->getUser();
            $order = $session->get('order');
            $form = $this->createForm(OrderType::class, $order);
        
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $orderRepository->add($order, false);
                $session->set('order',$order);
                return $this->redirectToRoute('app_summary', [], Response::HTTP_SEE_OTHER);
            }

            return $this->render('catalogue/order.html.twig', [
                'order' => $order,
                'form' => $form->createView(),
                'user' => $user
            ]);
                

        }
        else {
     
            $user = $this->getUser();
            $order = new Order();


            // $Address = $this->getUser()->getAddress();
            // $ZipCode = $this->getUser()->getZipCode();
            // $City = $this->getUser()->getCity();

            // $order->setUserClient($user);
            // $order->setCoef($this->getUser()->getCoef());
            // $order->setBillAddress($Address);
            // $order->setBillZipCode($ZipCode);
            // $order->setBillCity($City);

            // $order->setShipAddress($Address);
            // $order->setShipZipCode($ZipCode);
            // $order->setShipCity($City);
            //dd($order);
            $form = $this->createForm(OrderType::class, $order);
            $form->handleRequest($request);

            if ($form->isSubmitted()) {
                $orderRepository->add($order, false);
                $session->set('order',$order);
                return $this->redirectToRoute('app_summary', [], Response::HTTP_SEE_OTHER);
            }

    
         
            return $this->render('catalogue/order.html.twig', [
                'order' => $order,
                'form' => $form->createView(),
                //'user' => $user
            ]);
        }
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
        
}