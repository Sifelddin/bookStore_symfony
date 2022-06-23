<?php

namespace App\DataFixtures;


use App\DataFixtures\BookFixtures;
use App\DataFixtures\UserFixtures;
use App\DataFixtures\OrderFixtures;
use App\DataFixtures\CategoryFixtures;
use App\DataFixtures\DeliveryFixtures;
use App\DataFixtures\SupplierFixtures;
use App\DataFixtures\BookOrderFixtures;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use App\DataFixtures\DeliveryDetailsFixtures;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
         $cat = new CategoryFixtures();
         $sup = new SupplierFixtures();
         $book = new BookFixtures();
         $user = new UserFixtures();
         $order = new OrderFixtures();
         $bookOrder= new BookOrderFixtures();
         $delivery = new DeliveryFixtures();
         $deliveryDetails = new DeliveryDetailsFixtures();

         $cat->load($manager);
         $manager->flush();

         $sup->load($manager);
         $manager->flush();

         $book->load($manager);
         $manager->flush();

         $user->load($manager);
         $manager->flush();

         $order->load($manager);
         $manager->flush();

         $bookOrder->load($manager);
         $manager->flush();

         $delivery ->load($manager);
         $manager->flush();

         $deliveryDetails ->load($manager);
         $manager->flush();
    }
}
