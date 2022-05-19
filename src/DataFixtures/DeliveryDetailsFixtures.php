<?php

namespace App\DataFixtures;

use App\Entity\Book;
use App\Entity\Delivery;
use App\Entity\DeliveryDetails;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class DeliveryDetailsFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $delivery1 = $manager->getRepository(Delivery::class)->findOneBy([ "id" => "1"]);
        $book1 = $manager->getRepository(Book::class)->findOneBy([ "id" => "1"]);

        $deliveryDetails = new DeliveryDetails();
        $deliveryDetails ->setQuantity(1);
        $deliveryDetails ->setDelivery($delivery1 );
        $deliveryDetails ->setBook($book1);
        $manager->persist($deliveryDetails);

    }
}
