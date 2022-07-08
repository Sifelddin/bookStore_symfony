<?php

namespace App\Controller;

use App\Entity\Book;
use App\Entity\BookOrder;
use App\Repository\BookRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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
    public function add($id, Request $request, Book $book){
        $session = $request->getSession();
        $panier = $session->get('panier',[]);
        if(!empty($panier[$id])){
            $panier[$id]++;
        }else{
            $panier[$id]=1;
        }
  


        $session->set('panier',$panier);
       return $this->redirect($request->headers->get('referer'));
    }

    #[Route('/panier/add2/{id}', name: 'add_panier2')]
    public function add2($id, Request $request, Book $book){
        $session = $request->getSession();
        $panier = $session->get('panier',[]);
        if(!empty($panier[$id])){
            $panier[$id]++;
        }else{
            $panier[$id]=1;
        }
        $session->set('panier',$panier);
       return $this->redirectToRoute("books",['slug'=>$book->getCategory()]);
    }

    #[Route('/panier/remove/{id}', name: 'remove_panier')]
    public function remove($id, SessionInterface $session){

        $panier = $session->get('panier',[]);

        if(!empty($panier[$id])){
            unset($panier[$id]);
        }
        $session->set('panier',$panier);
        //dd($session->get('panier'));

        return $this->redirectToRoute("app_panier");
    }


    #[Route('/panier/minus/{id}', name: 'minus_panier')]
    public function minus($id, SessionInterface $session){ 

        $panier = $session->get('panier',[]);

        if($panier[$id] >1){
            $panier[$id]--;
        }
        else{
            unset($panier[$id]);
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
