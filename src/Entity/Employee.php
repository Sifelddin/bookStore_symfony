<?php

namespace App\Entity;

use App\Repository\EmployeeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'array')]
    private $employePost = [];

    #[ORM\Column(type: 'array')]
    private $employeDepartement = [];

    #[ORM\Column(type: 'integer')]
    private $employeUserId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmpPost(): ?array
    {
        return $this->employePost;
    }

    public function setEmpPost(array $employePost): self
    {
        $this->employePost = $employePost;

        return $this;
    }

    public function getEmpDepartement(): ?array
    {
        return $this->employeDepartement;
    }

    public function setEmpDepartement(array $employeDepartement): self
    {
        $this->employeDepartement = $employeDepartement;

        return $this;
    }

    public function getEmpUserId(): ?int
    {
        return $this->employeUserId;
    }

    public function setEmpUserId(int $employeUserId): self
    {
        $this->employeUserId = $employeUserId;

        return $this;
    }
}
