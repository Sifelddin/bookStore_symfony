<?php

namespace App\Controller;

use App\Form\RegistrationFormType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CommandeController extends AbstractController
{
    #[Route('/commande', name: 'app_commande')]
    public function commande(): Response
    {
        $form = $this->createForm(RegistrationFormType::class);

        return $this->render('commande/index.html.twig', [
            //'commandeForm'  => $form->createView(),
        ]);
    }
}
