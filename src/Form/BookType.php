<?php

namespace App\Form;

use App\Entity\Book;
use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class BookType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            ])
            // ->add('slug', TextType::class, [
            //     "attr" => [
            //         'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
            //     ],
            //     'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            //     'required' => false
            // ])
            ->add('price', null, [
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            ])

            ->add('description', TextareaType::class, [
                'attr' => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            ])
            ->add('stock', null, [
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            ])
            ->add('stockAlert', null, [
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            ])
            ->add('releaseDate', null, [
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            ])
            ->add('published', null, [
                "attr" => [
                    'class' => ' shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            ])
            ->add('category', EntityType::class, [
                'class' => Category::class,
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'query_builder' => function (CategoryRepository  $re) {
                    return   $re->createQueryBuilder('c')
                        ->where('c.catParent is not null');
                }
            ])
            ->add('supplier', null, [
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            ])
            ->add('photo', FileType::class, [
                'attr' => array(
                    'class' => 'py-8 my-4 cursor-pointer',
                ),
                'label' => 'Book Image',
                'mapped' => false,
                'constraints' => [
                    new File([
                        'maxSize' => '1024k',
                        'mimeTypes' => ['image/jpeg', 'image/png',],
                        'mimeTypesMessage' => 'please upload a valide image',
                    ])
                ],
                'required' => true,
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Book::class,
        ]);
    }
}
