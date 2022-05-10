<?php

namespace App\Entity;

use App\Repository\BookRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $bookTitle;

    #[ORM\Column(type: 'decimal', precision: 6, scale: 2)]
    private $bookPrice;

    #[ORM\Column(type: 'string', length: 255)]
    private $bookPhoto;

    #[ORM\Column(type: 'text')]
    private $bookDescription;

    #[ORM\Column(type: 'integer')]
    private $bookStock;

    #[ORM\Column(type: 'integer')]
    private $bookStockAlert;

    #[ORM\Column(type: 'date')]
    private $bookReleaseDate;

    #[ORM\Column(type: 'boolean')]
    private $bookPublished;

    #[ORM\Column(type: 'integer')]
    private $bookCategoryId;

    #[ORM\Column(type: 'integer')]
    private $bookSupllierId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBookTitle(): ?string
    {
        return $this->bookTitle;
    }

    public function setBookTitle(string $bookTitle): self
    {
        $this->bookTitle = $bookTitle;

        return $this;
    }

    public function getBookPrice(): ?string
    {
        return $this->bookPrice;
    }

    public function setBookPrice(string $bookPrice): self
    {
        $this->bookPrice = $bookPrice;

        return $this;
    }

    public function getBookPhoto(): ?string
    {
        return $this->bookPhoto;
    }

    public function setBookPhoto(string $bookPhoto): self
    {
        $this->bookPhoto = $bookPhoto;

        return $this;
    }

    public function getBookDescription(): ?string
    {
        return $this->bookDescription;
    }

    public function setBookDescription(string $bookDescription): self
    {
        $this->bookDescription = $bookDescription;

        return $this;
    }

    public function getBookStock(): ?int
    {
        return $this->bookStock;
    }

    public function setBookStock(int $bookStock): self
    {
        $this->bookStock = $bookStock;

        return $this;
    }

    public function getBookStockAlert(): ?int
    {
        return $this->bookStockAlert;
    }

    public function setBookStockAlert(int $bookStockAlert): self
    {
        $this->bookStockAlert = $bookStockAlert;

        return $this;
    }

    public function getBookReleaseDate(): ?\DateTimeInterface
    {
        return $this->bookReleaseDate;
    }

    public function setBookReleaseDate(\DateTimeInterface $bookReleaseDate): self
    {
        $this->bookReleaseDate = $bookReleaseDate;

        return $this;
    }

    public function getBookPublished(): ?bool
    {
        return $this->bookPublished;
    }

    public function setBookPublished(bool $bookPublished): self
    {
        $this->bookPublished = $bookPublished;

        return $this;
    }

    public function getBookCategoryId(): ?int
    {
        return $this->bookCategoryId;
    }

    public function setBookCategoryId(int $bookCategoryId): self
    {
        $this->bookCategoryId = $bookCategoryId;

        return $this;
    }

    public function getBookSupllierId(): ?int
    {
        return $this->bookSupllierId;
    }

    public function setBookSupllierId(int $bookSupllierId): self
    {
        $this->bookSupllierId = $bookSupllierId;

        return $this;
    }
}
