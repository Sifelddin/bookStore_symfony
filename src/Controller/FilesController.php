<?php

namespace App\Controller;

use App\Entity\Order;
use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FilesController extends AbstractController
{
    #[Route('/files/orders/{order}/pdf', name: 'app_files',)]
    public function index(Order $order)
    {

        $html =  $this->renderView('pdf.html.twig', ['order' => $order]);
        
        $options = new Options();
        // $options->setRootDir(__DIR__);
        // instantiate and use the dompdf class

        $options->set('isRemoteEnabled', true);
      
        // $options->isRemoteEnabled(true);
       
        $dompdf = new Dompdf($options);
        
        $dompdf->loadHtml($html);
        $dompdf->render();
        $dompdf->stream("test.pdf", ['Attachment' => false]);
        return new Response('', 200, [
            'Content-Type' => 'application/pdf',
        ]);
    }

    #[Route('/files/orders/{order}/pdf/template', name: 'app_pdf',)]
    public function pdf(Order $order)
    {
        return $this->render('pdf.html.twig', ['order' => $order]);
    }
}
