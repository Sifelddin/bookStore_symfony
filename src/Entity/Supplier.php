<?php

namespace App\Entity;

use App\Repository\SupplierRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SupplierRepository::class)]
class Supplier
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $supContactName;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSupContactName(): ?string
    {
        return $this->supContactName;
    }

    public function setSupContactName(string $supContactName): self
    {
        $this->supContactName = $supContactName;

        return $this;
    }
}
