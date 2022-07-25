<?php

namespace App\Form;

use App\Entity\Book;
use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Vich\UploaderBundle\Form\Type\VichImageType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
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
                'empty_data' => '',
                'required' => false
            ])
            ->add('author', TextType::class, [
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'empty_data' => '',
                'required' => false
            ])
            ->add('editor', TextType::class, [
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'empty_data' => '',
                'required' => false
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
                'empty_data' => '',
                'required' => false
            ])

            ->add('description', TextareaType::class, [
                'attr' => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                    'rows' => '6'
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'empty_data' => '',
                'required' => false
            ])
            ->add('stock', null, [
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'empty_data' => '',
                'required' => false
            ])
            ->add('stockAlert', null, [
                "attr" => [
                    'class' => ' rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'empty_data' => '',
                'required' => false
            ])
            ->add('releaseDate', DateType::class, [
                'empty_data' => '',
                'widget' => 'single_text',
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'required' => false
            ])
            ->add('published', null, [
                "attr" => [
                    'class' => ' shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-4 mr-10 ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 ml-4 mt-4'],
                'required' => false
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
                },
                'required' => false
            ])
            ->add('supplier', null, [
                "attr" => [
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'required' => false
            ])
            ->add('imageFile', VichImageType::class, [
                'attr' => array(
                    'class' => 'py-8 my-4 cursor-pointer',
                ),
                'label' => 'Book Image',
                'constraints' => [
                    new File([
                        'maxSize' => '1024k',
                        'mimeTypes' => ['image/jpeg', 'image/png',],
                        'mimeTypesMessage' => 'please upload a valide image',
                    ])

                ],
                'required' => true,
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'empty_data' => '',
                'required' => false,
                'download_link' => false,
                'image_uri' => false,
                'allow_delete' => false,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Book::class,
        ]);
    }
}
