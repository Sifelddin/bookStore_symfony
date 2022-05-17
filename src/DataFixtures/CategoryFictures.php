<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $category = new Category(); 
        //$category->setId(1);
        $category->setName('Roman');
        $category->setPhoto('/chemin/photo.jpg');
        $manager->persist($category);

        // $category2 = new Category(); 
        // $category2->setId(12);
        // $category2->setName('SciFi');
        // $category2->setPhoto('/chemin/photo2.jpg');
        // $category2->setCatParent(1);
        // $manager->persist($category2);

        $manager->flush();


    }
}
