<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class CategoryFixtures extends Fixture
{

    public function load(ObjectManager $manager): void
    {


        // $cat =[
        //         [13,'Art', 'chemin/photo.jpg'],
        //         [1,'Biography', 'chemin/photo.jpg'],
        //         [2,'Business & career ', 'chemin/photo.jpg'],
        //         [3,'Children & Youth', 'chemin/photo.jpg'],
        //         [4,'Environment', 'chemin/photo.jpg'],
        //         [5,'Fiction & Literature', 'chemin/photo.jpg'],
        //         [6,'Health & Fitness', 'chemin/photo.jpg'],
        //         [7,'Lifestyle', 'chemin/photo.jpg'],
        //         [8,'Personnal Growth', 'chemin/photo.jpg'],
        //         [9,'Politics & Laws', 'chemin/photo.jpg'],
        //         [10,'Religion', 'chemin/photo.jpg'],
        //         [11,'Science & Research', 'chemin/photo.jpg'],
        //         [12,'Academic & Education', 'chemin/photo.jpg']
        // ];

        // $sousCat = [
        //     ['Environment', 'chemin/photo.jpg',12],
        //     ['History', 'chemin/photo.jpg',12],
        //     ['Engineering', 'chemin/photo.jpg',12],
        //     ['Psychology', 'chemin/photo.jpg',12],
        //     ['Medical', 'chemin/photo.jpg',12],
        //     ['Language', 'chemin/photo.jpg',12],
        //     ['Religion', 'chemin/photo.jpg',12],
        //     ['Sociology', 'chemin/photo.jpg',12],
        //     ['Geography', 'chemin/photo.jpg',12],
        //     ['Economic', 'chemin/photo.jpg',12],

        //     ['Photography', 'chemin/photo.jpg',13],
        //     ['Painting & Drawing', 'chemin/photo.jpg',13],
        //     ['Craft & Hobbies', 'chemin/photo.jpg',13],
        //     ['Architecture', 'chemin/photo.jpg',13],
        //     ['Graphic Design', 'chemin/photo.jpg',13],
        //     ['Music', 'chemin/photo.jpg',13],
        //     ['Fashion & Beauty', 'chemin/photo.jpg',13],

        //     ['Finance', 'chemin/photo.jpg',2],
        //     ['Marketing', 'chemin/photo.jpg',2],
        //     ['Career', 'chemin/photo.jpg',2],
        //     ['Time Management', 'chemin/photo.jpg',2],
        //     ['Leadership', 'chemin/photo.jpg',2],
        //     ['Economic', 'chemin/photo.jpg',2],    

        //     ['Parenting', 'chemin/photo.jpg',3],

        //     ['Classic Literature', 'chemin/photo.jpg',5],
        //     ['Historial Fiction', 'chemin/photo.jpg',5],
        //     ['Mystery & Crime', 'chemin/photo.jpg',5],
        //     ['Horror', 'chemin/photo.jpg',5],
        //     ['Poetry', 'chemin/photo.jpg',5],
        //     ['Romance', 'chemin/photo.jpg',5],
        //     ['Science Fiction', 'chemin/photo.jpg',5],
        //     ['Drama', 'chemin/photo.jpg',5],
        //     ['Story', 'chemin/photo.jpg',5],



        //     ['Medical', 'chemin/photo.jpg',6],
        //     ['Fitness & Diet', 'chemin/photo.jpg',6],
        //     ['Food & Nutrition', 'chemin/photo.jpg',6],

        //     ['Fashion & Beauty', 'chemin/photo.jpg',7],
        //     ['Home & Garden', 'chemin/photo.jpg',7],
        //     ['Food & Nutrition', 'chemin/photo.jpg',7],
        //     ['Environment', 'chemin/photo.jpg',7],
        //     ['Travel', 'chemin/photo.jpg',7],

        //     ['Spiritualty', 'chemin/photo.jpg',8],
        //     ['Psychology', 'chemin/photo.jpg',8],
        //     ['Relationships', 'chemin/photo.jpg',8],
        //     ['Religion', 'chemin/photo.jpg',8],
        //     ['Self-improvement', 'chemin/photo.jpg',8],

        //     ['Politics', 'chemin/photo.jpg',9],
        //     ['Law', 'chemin/photo.jpg',9],

        //     ['Physics', 'chemin/photo.jpg',11],
        //     ['Math', 'chemin/photo.jpg',11],
        //     ['Chemistry', 'chemin/photo.jpg',11],
        //     ['Biology', 'chemin/photo.jpg',10],
        //     ['Environment', 'chemin/photo.jpg',11],
        //     ['Astronomy & Space', 'chemin/photo.jpg',11],
        //     ['Archaeology', 'chemin/photo.jpg',11],

        //     ['Software', 'chemin/photo.jpg',12],
        //     ['Internet', 'chemin/photo.jpg',12],
        //     ['

        //     foreach($cat as $row)
        //     {
        //       // On crée la catégorie
        //       $category = new Category();
    
        //       $category->setId($row[0]);
        //       $category->setName($row[1]);
        //       $category->setPhoto($row[2]);
            
        //       // On la persiste
        //       $manager->persist($category);
        //     }


        // ];

        // foreach($cat as $row)
        // {
        //   // On crée la catégorie
        //   $category = new Category();

        //   $category->setId($row[0]);
        //   $category->setName($row[1]);
        //   $category->setPhoto($row[2]);
        
        //   // On la persiste
        //   $manager->persist($category);
        // }

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
