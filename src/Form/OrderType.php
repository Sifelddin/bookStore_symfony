<?php

namespace App\Form;

use App\Entity\Order;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class OrderType extends AbstractType


{

    public $classInput = 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full ';
    public $classLabel = 'ml-2 block font-normal text-base text-gray-700 mt-4';

       public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            // ->add('shippedDate', null, [
            //     'empty_data' => '',
            //     'widget' => 'single_text',
            //     "attr" => [
            //         'class' => $this->classInput
            //     ],
            //     'label_attr' => ['class' => $this->classLabel],
            //     'required' => false
            // ])
            ->add('ShipAddress', null, [
                'empty_data' => '',
                "attr" => [
                    'class' => $this->classInput,
                ],
                'label'=> 'Address',
                'label_attr' => ['class' => $this->classLabel],
                'required' => false
            ])
            ->add('shipCity', null, [
                'empty_data' => '',
                "attr" => [
                    'class' => $this->classInput,
                ],
                'label'=> 'City',
                'label_attr' => ['class' => $this->classLabel],
                'required' => false
            ])
            ->add('shipZipCode', null, [
                'empty_data' => '',
                "attr" => [
                    'class' => $this->classInput,
                ],
                'label'=> 'ZipCode',
                'label_attr' => ['class' => $this->classLabel],
                'required' => false
            ])
            // ->add('coef', null, [
            //     'empty_data' => '',
            //     "attr" => [
            //         'class' => $this->classInput,
            //     ],
            //     'label'=> 'coeffient',
            //     'label_attr' => ['class' => $this->classLabel],
            //     'required' => false
            // ])

            ->add('billAddress', null, [
                'empty_data' => '',
                "attr" => [
                    'class' => $this->classInput,
                ],
                'label'=> 'Address',
                'label_attr' => ['class' => $this->classLabel],
                'required' => false
            ])
            ->add('billZipCode', null, [
                'empty_data' => '',
                "attr" => [
                    'class' => $this->classInput,
                ],
                'label'=> 'ZipCode',
                'label_attr' => ['class' => $this->classLabel],
                'required' => false
            ])
            ->add('billCity', null, [
                'empty_data' => '',
                "attr" => [
                    'class' => $this->classInput,
                ],
                'label'=> 'City',
                'label_attr' => ['class' => $this->classLabel],
                'required' => false,
                
            ])
            ->add('payMethod', ChoiceType::class, [
                    'choices' => [
                        'Bank check' => 'Bank check',
                        'Bank transfer' => 'Bank transfer',
                    ],
                'expanded' => true,
                'data'=> 'Bank check'
                ]
            );
    }

     public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Order::class,
        ]);
    }
}
