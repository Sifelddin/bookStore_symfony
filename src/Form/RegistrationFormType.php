<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstname', null, [
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full my-',

                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700'],
                'required' => false
            ])
            ->add('lastname', null, [
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full my-',

                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700'],
                'required' => false
            ])
            ->add('address', null, [
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full my-',

                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700'],
                'required' => false
            ])
            ->add('zipcode', null, [
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full my-',
                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700'],
                'required' => false
            ])
            ->add('city', null, [
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full my-',

                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700'],
                'required' => false
            ])
            ->add('phone', null, [
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full my-',
                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700'],
                'required' => false
            ])
            ->add('email', null, [
                'attr' => array(
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full my-',
                    'placeholder' => 'Entre Email ...'
                ),
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700'],
                'required' => false
            ])
            ->add('agreeTerms', CheckboxType::class, [
                "attr" => [
                    'class' => ' shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-2',
                ],
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700 mt-2'],
                'required' => false,
                'mapped' => false,
                'constraints' => [
                    new IsTrue([
                        'message' => 'You should agree to our terms.',
                    ]),
                ],
            ])
            ->add('plainPassword', PasswordType::class, [
                'label_attr' => ['class' => 'block font-normal text-base text-gray-700'],
                'required' => false,
                // instead of being set onto the object directly,
                // this is read and encoded in the controller
                'mapped' => false,
                'attr' => [
                    'autocomplete' => 'new-password',
                    'class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full my-',
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Please enter a password',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Your password should be at least {{ limit }} characters',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'error_mapping' => [],
        ]);
    }
}
