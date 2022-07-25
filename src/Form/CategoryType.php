<?php

namespace App\Form;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Vich\UploaderBundle\Form\Type\VichImageType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

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
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700'],
                'required' => false
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
            ->add('imageFile', VichImageType::class, [
                'attr' => array(
                    'class' => 'py-8 my-4',
                ),
                'label' => 'Category image',
                'constraints' => [
                    new File([
                        'maxSize' => '1024k',
                        'mimeTypes' => ['image/jpeg', 'image/png',],
                        'mimeTypesMessage' => 'please upload a valide image'
                    ]),
                    new NotBlank()
                ],
                'required' => false,
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Category::class,
        ]);
    }
}
