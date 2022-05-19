<?php

namespace App\Form;

use App\Entity\Category;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CategoryType extends AbstractType
{
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
            ->add('catParent', ChoiceType::class, [
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ',
                    'placeholder' => 'Seclect parent category'
                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-6']


            ])
            ->add('photo', FileType::class, [
                'attr' => array(
                    'class' => 'py-8 my-8 mt-6',
                ),
                'label' => false
            ]);
        // ->add('save', SubmitType::class, [
        //     'attr' => [
        //         'class' => 'bg-gray-500'
        //     ]
        // ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Category::class,
        ]);
    }
}
