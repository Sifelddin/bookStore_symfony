<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MeController extends AbstractController
{
   
 public function __invoke()
 {
   return $this->getUser();
 }
}
