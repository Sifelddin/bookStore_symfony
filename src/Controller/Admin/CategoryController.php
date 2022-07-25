<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Service\FileUploader;
use App\Form\CategoryUpdateType;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



#[Route('/dashboard/categories')]
class CategoryController extends AbstractController
{
    #[Route('/', name: 'app_category_index', methods: ['GET'])]
    public function index(CategoryRepository $categoryRepository): Response
    {


        return $this->render('category/index.html.twig', [
            'categories' => $categoryRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_category_new', methods: ['GET', 'POST'])]
    public function new(Request $request, CategoryRepository $categoryRepository): Response
    {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $categoryRepository->add($category, true);
            return $this->redirectToRoute('app_category_index', [], Response::HTTP_SEE_OTHER);
        }
        return $this->renderForm('category/new.html.twig', [
            'category' => $category,
            'form' => $form,
        ]);
    }


    #[Route('/{id}/edit', name: 'app_category_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Category $category, CategoryRepository $categoryRepository): Response
    {

        $parentId = null;
        $parents = $categoryRepository->isParent($category->getId());
        $parentCategories = $categoryRepository->parentCategoryList($category->getId());
        if ($category->getCatParent()) {
            $parentId = $category->getCatParent()->getId();
        }
        $form = $this->createForm(CategoryUpdateType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $catParentRequest = null;
            if ($request->request->get("catParent")) {
                $catParentRequest  = $categoryRepository->find($request->request->get("catParent"));
            }
            $category->setCatParent($catParentRequest);
            $categoryRepository->add($category, true);

            return $this->redirectToRoute('app_category_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('category/edit.html.twig', [
            'category' => $category,
            'form' => $form,
            'parentList' => $parentCategories,
            'parents' => $parents,
            'parentID' => $parentId
        ]);
    }

    #[Route('/{id}', name: 'app_category_delete', methods: ['POST'])]
    public function delete(Request $request, Category $category, CategoryRepository $categoryRepository): Response
    {
        if ($this->isCsrfTokenValid('delete' . $category->getId(), $request->request->get('_token'))) {
            $categoryRepository->remove($category, true);
            return $this->redirectToRoute('app_category_index', [], Response::HTTP_SEE_OTHER);
        }
    }
}
