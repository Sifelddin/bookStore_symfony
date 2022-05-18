<?php

namespace App\DataFixtures;

use DateTime;
use App\Entity\User;
use App\Entity\Order;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class OrderFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
       
        $orderDate = new DateTime('2000-01-01');
        $shippedDate = new DateTime('2000-01-01');
        $payementDate = new DateTime('2000-01-01');


        $use1 = $manager->getRepository(User::class)->findOneBy([ "lastname" => "Lanvin"]);
        $order = new Order(); 
        
        $order ->setOrderDate($orderDate); 
        $order ->setShippedDate($shippedDate); 
        $order ->setShipAddress('15 rue de poulainville'); 
        $order ->setShipCity('Amiens'); 
        $order ->setShipZipCode(80000); 
        $order ->setPaymentDate($payementDate); 
        $order ->setCoef(0.9); 
        $order ->setBillAddress('15 rue de poulainville'); 
        $order ->setBillZipCode(80000); 
        $order ->setBillCity('Amiens'); 
        $order ->setDiscount(100); 
        $order ->setUserClient($use1); 
        $order ->setPayMethod(0); 
        $manager->persist($order);
        }
}
