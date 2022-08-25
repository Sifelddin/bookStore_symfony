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
    #[Route('/files/{orderId}/pdf', name: 'app_files',)]
    public function index()
    {

        $html =  $this->render('pdf.html.twig', ['order' => order]);
        $options = new Options();
        $options->set('defaultFont', 'Courier');
        $options->isRemoteEnabled(true);
        $dompdf = new Dompdf($options);

        // instantiate and use the dompdf class

        $dompdf->loadHtml($html);

        // (Optional) Setup the paper size and orientation
        // Render the HTML as PDF
        $dompdf->render();


        $dompdf->stream("test.pdf", ['Attachment' => false]);


        return new Response('', 200, [
            'Content-Type' => 'application/pdf',
        ]);
    }

    #[Route('/files/{orderId}/pdf/template', name: 'app_pdf',)]
    public function pdf(int $orderId)
    {

        return $this->render('pdf.html.twig', [
            'orderId' => $orderId,
        ]);
    }
}
