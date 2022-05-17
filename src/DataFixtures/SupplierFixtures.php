<?php

namespace App\DataFixtures;

use App\Entity\Supplier;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class SupplierFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $supplier = new Supplier(); 
        //$category->setId(1);
        $supplier->setContactName('hachette');
        $manager->persist($supplier);

        $supplier2 = new Supplier();
        $supplier2->setContactName('Flammarion');
        $manager->persist($supplier2);


        $manager->flush();
    }
}
