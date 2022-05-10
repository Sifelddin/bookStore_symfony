<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $categoryName;

    #[ORM\Column(type: 'string', length: 255)]
    private $cat_photo;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $categoryParentId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCatName(): ?string
    {
        return $this->categoryName;
    }

    public function setCatName(string $categoryName): self
    {
        $this->categoryName = $categoryName;

        return $this;
    }

    public function getCatPhoto(): ?string
    {
        return $this->cat_photo;
    }

    public function setCatPhoto(string $cat_photo): self
    {
        $this->cat_photo = $cat_photo;

        return $this;
    }

    public function getCatParentId(): ?int
    {
        return $this->categoryParentId;
    }

    public function setCatParentId(?int $categoryParentId): self
    {
        $this->categoryParentId = $categoryParentId;

        return $this;
    }
}
