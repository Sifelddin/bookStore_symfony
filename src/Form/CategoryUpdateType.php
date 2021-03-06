<?php

namespace App\Form;

use App\Entity\Category;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Vich\UploaderBundle\Form\Type\VichImageType;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;


class CategoryUpdateType extends AbstractType

{

    public function __construct()
    {
    }


    public function buildForm(FormBuilderInterface $builder, array $options): void
    {


        $builder
            ->add('name', TextType::class, [
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                    'placeholder' => 'Entre title ...'
                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'label' => 'Category',
                'required' => false,
                'empty_data' => ''
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
                    ])
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-4'],
                'required' => false,
                'download_link' => false,
                'image_uri' => false,
                'allow_delete' => false,

            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Category::class,

        ]);
    }
}
