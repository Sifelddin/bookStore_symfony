<?php

namespace App\Controller;

use App\Entity\Book;
use App\Entity\Category;
use Gedmo\Mapping\Annotation\Slug;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

#[Route('/catalogue')]
class CatalogueController extends AbstractController
{
    #[Route('/', name: 'app_catalogue')]
    public function index(CategoryRepository $categoriesRepository): Response
    {
        //$categories= $categoriesRepository->findAll();
        $categories= $categoriesRepository->allParentCategory();
        
        //dd($categories);

        return $this->render('catalogue/index.html.twig', [
            'categories' => $categories,
            'controller_name' => 'CatalogueController',
        ]);
    }

    #[Route('/{slug}', name: 'subCatalogue')]
    public function subCat(CategoryRepository $categoriesRepository , Category $cat): Response
    {

        //dd($cat->getCategories());
       
        $id = $cat->getId();

        //dd(  $categories= $categoriesRepository->isParent($id));
        $categories= $categoriesRepository->isParent($id);


        return $this->render("catalogue/subCatalogue.html.twig",[
            'categories' => $categories,
           
        ]);
    }

    
    #[Route('/{slug}/books/', name: 'books')]
    public function books(Category $cat,Request $request): Response
    {

        // $path=($request->getPathInfo());
        // //dd($path);

        return $this->render("catalogue/books.html.twig",[
            'cat' => $cat
        ]);
    }

    #[Route('/book/{slug}', name: 'book')]
    public function book(Book $book, CategoryRepository $catRepo): Response
    {
    

    $slug =$catRepo->find($book->getCategory()->getId())->getSlug();
    // dd($slug);


        return $this->render("catalogue/show.html.twig",[
            'book' => $book,
            'slug' => $slug
           
        ]);
    }
}
