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
    public function index(Request $request): Response
    {
        if ($request->isXmlHttpRequest() && $request->isMethod('GET')) {
            $user = $this->getUser();
            return  $this->json($user);
        }
        return $this->render("api/index.html.twig");
    }

    #[Route('/checkout', name: 'app_api')]
    public function checkout(Request $request, OrderRepository $orderRepository): Response
    {

//dd($request);

        $user = $this->getUser();

        $coef = $this->getUser()->getCoef();

//dd($coef);
//dd($user);
        $order = new Order();
        
//dd($order);

        $form = $this->createForm(OrderType::class, $order);
    
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            //dd($form);
            //dd($coef);
            $order->setUserClient($user);
            $order->setCoef($coef);
            $orderRepository->add($order, false);
            //dd($order);

            $session = $request->getSession();
            $session->set('order',$order);
            //dd($session->get('order'));
            return $this->redirectToRoute('app_summary', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('catalogue/order.html.twig', [
            'order' => $order,
            'form' => $form->createView(),
            'user' => $user
        ]);
    }

    #[Route('/summary', name: 'app_summary')]
    public function summary(Request $request, SessionInterface $session, OrderRepository $orderRepository): Response
    {

        dd($session->get('order'));
        
                $user = $this->getUser();
                $coef = $this->getUser()->getCoef();

                $order->setUserClient($user);
                $order->setCoef($coef);
        
        //dd($coef);
        //dd($user);
                $order = new Order();
                
        //dd($order);
        
                $form = $this->createForm(OrderType::class, $order);
        
        //dd($form);
        
                $form->handleRequest($request);
        
                if ($form->isSubmitted() && $form->isValid()) {
                    //dd($form);
                    //dd($coef);

                    $orderRepository->add($order, false);
                    return $this->redirectToRoute('app_book_index', [], Response::HTTP_SEE_OTHER);
                }
        
                return $this->render('catalogue/summary.html.twig', [
                    'order' => $order,
                    'form' => $form->createView(),
                    'user' => $user
                ]);
            }
        
}