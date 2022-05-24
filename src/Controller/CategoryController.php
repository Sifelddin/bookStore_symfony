<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Service\FileUploader;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Constraints\File as ValidationImage;


#[Route('/categories')]
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
    public function new(Request $request, CategoryRepository $categoryRepository, FileUploader $fileUploader): Response
    {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            //get uploaded image data
            $categoryImage = $form->get('photo')->getData();

            if ($categoryImage) {
                $originalFileName = $fileUploader->upload($categoryImage);
                $category->setPhoto($originalFileName);
            }

            $categoryRepository->add($category, true);

            return $this->redirectToRoute('app_category_index', [], Response::HTTP_SEE_OTHER);
        }
        return $this->renderForm('category/new.html.twig', [
            'category' => $category,
            'form' => $form,
        ]);
    }


    #[Route('/{id}/edit', name: 'app_category_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Category $category, CategoryRepository $categoryRepository, FileUploader $fileUploader, $id): Response
    {

        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        $oldImage = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'public/uploads/categories' . DIRECTORY_SEPARATOR . $category->getPhoto();

        if ($form->isSubmitted() && $form->isValid()) {

            $categoryImage = $form->get('photo')->getData();
            if ($categoryImage) {
                $originalFileName = $fileUploader->upload($categoryImage);
                if (file_exists($oldImage)) {
                    unlink(new File($this->getParameter('categories_directory') . DIRECTORY_SEPARATOR . $category->getPhoto()));
                }
                $category->setPhoto($originalFileName);
            }
            $categoryRepository->add($category, true);

            return $this->redirectToRoute('app_category_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('category/edit.html.twig', [
            'category' => $category,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_category_delete', methods: ['POST'])]
    public function delete(Request $request, Category $category, CategoryRepository $categoryRepository): Response
    {
        if ($this->isCsrfTokenValid('delete' . $category->getId(), $request->request->get('_token'))) {

            $oldImage = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'public/uploads/categories' . DIRECTORY_SEPARATOR . $category->getPhoto();
            $categoryRepository->remove($category, true);
            if (file_exists($oldImage)) {
                unlink(new File($this->getParameter('categories_directory') . DIRECTORY_SEPARATOR . $category->getPhoto()));
            }
        }

        return $this->redirectToRoute('app_category_index', [], Response::HTTP_SEE_OTHER);
    }
}
