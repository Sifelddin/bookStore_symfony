<?php

namespace App\Controller;

use App\Entity\Order;
use Dompdf\Dompdf;
use Dompdf\Options;
use App\Service\SetUpPDFfiles;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FilesController extends AbstractController
{
    #[Route('/files/orders/{orderId}/pdf', name: 'app_files',)]
    public function index($orderId)
    {

        $html =  $this->render('pdf.html.twig');
        $options = new Options();
        $options->set('defaultFont', 'Courier');
        $options->isRemoteEnabled(true);
        // instantiate and use the dompdf class
        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        // (Optional) Setup the paper size and orientation
        // Render the HTML as PDF
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
