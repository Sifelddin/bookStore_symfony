<?php
// src/Service/FileUploader.php
namespace App\Service;

use Dompdf\Dompdf;

class SetUpPDFfiles
{

    private $pdf;

    public function __construct()
    {
        $this->pdf = new Dompdf();
    }

    public function setPDF($html)
    {
        $this->pdf->loadHtml($html);
        $this->pdf->setPaper('A4', 'landscape');
        $this->pdf->render();
    }
}
