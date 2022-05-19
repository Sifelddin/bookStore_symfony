<?php

namespace App\DataFixtures;

use App\Entity\Book;
use App\Entity\BookOrder;
use App\Entity\Order;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class BookOrderFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        $book1 = $manager->getRepository(Book::class)->findOneBy([ "id" => "1"]);
        $order1 = $manager->getRepository(Order::class)->findOneBy([ "id" => "1"]);

        $bookOrder = new BookOrder();
        $bookOrder->setQuantity(2);
        $bookOrder->setDiscount(0);
        $bookOrder->setUnitPrice(10.3);
        $bookOrder->setBook($book1);
        $bookOrder->setOrder($order1);
        $manager->persist($bookOrder);

        
    }
}
