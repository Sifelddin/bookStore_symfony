<?php

namespace App\DataFixtures;

use DateTime;
use App\Entity\Order;
use App\Entity\Delivery;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class DeliveryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $order1 = $manager->getRepository(Order::class)->findOneBy([ "id" => "1"]);
        $deliveryDate = new DateTime('2000-01-01');
             
        $delivery = new Delivery();
        $delivery ->setDate($deliveryDate);
        $delivery ->setOrder($order1);


        $manager->persist($delivery);

    }
}
