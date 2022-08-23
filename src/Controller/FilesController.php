<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FilesController extends AbstractController
{
    #[Route('/files', name: 'app_files')]
    public function index(): Response
    {
        $filesystem = new Filesystem();
      
       $user = $this->getUser();
       dd($filesystem->exists('C:\Users\abekh\Downloads\dossier-professionnelle.odt'));
        if(!$filesystem->exists('C:/Users/abekh/Downloads/annexes.zip/Facture.docx')){
            $filesystem->touch('../assets/images/file.txt');
        }
       
      $filesystem->appendToFile('../assets/images/file.txt' , $user->getUserIdentifier());
        
    
    

       

        return $this->render('files/index.html.twig', [
            'controller_name' => 'FilesController',
        ]);
    }
}
