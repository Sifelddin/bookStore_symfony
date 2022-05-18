<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $user = new User(); 
        $user->setEmail('');
        $user->setFirstName('gerard');
        $user->setRoles(['client']);
        $user->setPassword('test');
        $user->setLastname('lanvin');
        $user->setAddress('15 rue de Poulainville');
        $user->setZipCode(80000);
        $user->setCity('Amiens');
        $user->setPhone(0102030405);
        $user->setCoef(0.9);
        $user->setPrivate(0);







        $manager->persist($user);

    }
}
