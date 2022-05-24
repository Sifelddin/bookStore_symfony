<?php

namespace App\Form;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class CategoryType extends AbstractType

{

    public function __construct()
    {
    }


    public function buildForm(FormBuilderInterface $builder, array $options): void
    {


        $builder
            ->add('name', TextType::class, [
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full my-',
                    'placeholder' => 'Entre title ...'
                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700']
            ])
            ->add('catParent', EntityType::class, [
                'class' => Category::class,
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                    'placeholder' => 'Seclect parent category',
                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-6'],
                'label' => 'category parent',
                'query_builder' => function (CategoryRepository $catRepo) {
                    return $catRepo->createQueryBuilder('c')
                        ->where('c.catParent is null');
                },
                'empty_data' => '',
                'placeholder' => 'select a parent category',
                'required' => false

            ])
            ->add('photo', FileType::class, [
                'attr' => array(
                    'class' => 'py-8 my-8 mt-6',
                ),
                'label' => 'Category image',
                'mapped' => false,
                'constraints' => [
                    new File([
                        'maxSize' => '1024k',
                        'mimeTypes' => ['image/jpeg', 'image/png',],
                        'mimeTypesMessage' => 'please upload a valide image'
                    ])
                ],
                'required' => false
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Category::class,
        ]);
    }
}
