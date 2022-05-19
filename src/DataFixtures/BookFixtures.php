<?php

namespace App\DataFixtures;

use DateTime;
use App\Entity\Book;
use App\Entity\Category;
use App\Entity\Supplier;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;


class BookFixtures extends Fixture {
    public function load(ObjectManager $manager): void
    {
        $datejour = new DateTime('2000-01-01');
        $cat1 = $manager->getRepository(Category::class)->findOneBy([ "name" => "Roman"]);
        $sup1 = $manager->getRepository(Supplier::class)->findOneBy([ "contactName" => "Flammarion"]);
        $book = new Book(); 
        $book ->setTitle('Dune');
        $book->setPrice(15);
        $book->setPhoto('/chemin/photo.jpg');
        $book->setDescription('Roman de science fiction se déroulant sur une lointaine planete');
        $book->setStock(1000);
        $book->setStockAlert(100);
        $book->setSlug('dune');
        $book->setPublished(0);
        $book->setReleaseDate($datejour);
        $book->setCategory($cat1);
        $book->setSupplier($sup1);
       
        $manager->persist($book);

       

    }

   
}
