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
        foreach ($this->getUser()->getOrders() as $ord) {
            if ($ord->getId() === $order->getId()) {
                $html =  $this->renderView('pdf.html.twig', ['order' => $order]);
                $options = new Options();
                $options->set('isRemoteEnabled', true);
                $dompdf = new Dompdf($options);
                $dompdf->loadHtml($html);
                $dompdf->render();
                $dompdf->stream("test.pdf", ['Attachment' => false]);
                return new Response('', 200, [
                    'Content-Type' => 'application/pdf',
                ]);
            }
        }

        return new Response('Page Not Found', 404);
    }

    #[Route('/files/orders/{order}/pdf/template', name: 'app_pdf',)]
    public function pdf(Order $order)
    {
        return $this->render('pdf.html.twig', ['order' => $order]);
    }
}
