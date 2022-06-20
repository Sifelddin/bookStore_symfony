<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $category = new Category();
        $category->setName('Roman');
        $category->setPhoto('chemin/photo.jpg');
        $manager->persist($category);

        $category2 = new Category();

        $category2->setName('SciFi');
        $category2->setPhoto('chemin/photo2.jpg');
        $category2->setCatParent($category);
        $manager->persist($category2);
    }
}
