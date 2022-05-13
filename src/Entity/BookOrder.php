<?php

namespace App\Entity;

use App\Repository\BookOrderRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BookOrderRepository::class)]
class BookOrder
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer')]
    private $quantity;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, nullable: true)]
    private $discount;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    private $unitPrice;

    #[ORM\ManyToOne(targetEntity: Book::class, inversedBy: 'bookOrders')]
    #[ORM\JoinColumn(nullable: false)]
    private $book;

    #[ORM\ManyToOne(targetEntity: Order::class, inversedBy: 'bookOrders')]
    #[ORM\JoinColumn(nullable: false)]
    private $order;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getDiscount(): ?string
    {
        return $this->discount;
    }

    public function setDiscount(?string $discount): self
    {
        $this->discount = $discount;

        return $this;
    }

    public function getUnitPrice(): ?string
    {
        return $this->unitPrice;
    }

    public function setUnitPrice(string $unitPrice): self
    {
        $this->unitPrice = $unitPrice;

        return $this;
    }

    public function getBook(): ?Book
    {
        return $this->book;
    }

    public function setBook(?Book $book): self
    {
        $this->book = $book;

        return $this;
    }

    public function getorder(): ?Order
    {
        return $this->order;
    }

    public function setorder(?Order $order): self
    {
        $this->order = $order;

        return $this;
    }
}
