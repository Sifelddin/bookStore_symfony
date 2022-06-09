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
        $cat1 = $manager->getRepository(Category::class)->findOneBy([ "name" => "SciFi"]);
        $sup1 = $manager->getRepository(Supplier::class)->findOneBy([ "contactName" => "Flammarion"]);
        $book = new Book(); 
        $book ->setTitle('Dune');
        $book->setPrice(15);
        $book->setPhoto('/chemin/photo.jpg');
        $book->setDescription("Sur Dune, planète désertique, monde des sables, germe l'épice qui donne longévité et préscience.
        N'était l'épice, jamais les hommes n'auraient entrepris de conquérir Dune, encore nommée Arrakis.
        Mais à cause de l'épice, tout l'empire galactique, sur lequel règne le Padishah Shaddam IV, tourne autour de Dune.
        Les nobles maisons du Landsraad convoitent la fabuleuse richesse de Dune.
        La Guilde des Navigateurs qui détient le monopole des voies interstellaires se laisse acheter avec de l'épice.
        Leto Atreides, Duc et Cousin de l'Empereur, a reçu Dune en fief. Pour peu de temps. En 10191, il meurt assassiné, victime de la trahison d'un docteur Suk et de la félonie du Baron Vladimir Harkonnen.
        Mais son fils Paul et la mère de Paul, concubine du Duc Leto, trouvent asile dans les repaires du peuple Fremen, indompté, invaincu, la lie de Dune selon les Harkonnen, le sel de la terre pour d'autres.
        Paul grandit dans le désert et forge l'arme de sa vengeance.
        Mais son destin ne va-t-il pas lui échapper et ne va-t-il pas dépasser son but, lancer sur l'univers entier les légions Fremen en une effroyable croisade ? Il a, dit-on, le pouvoir de connaitre l'avenir. Aura-t-il celui de l'éviter ?");
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
