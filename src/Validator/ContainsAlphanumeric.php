<?php


namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class ContainsAlphanumeric extends Constraint
{
    public $ZipCodemessage = 'The string "{{ string }}" contains an illegal character: it can only contain letters or numbers.';
}
