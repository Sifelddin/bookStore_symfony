<?php

namespace App\Entity;

use App\Repository\DeliveryDetailsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DeliveryDetailsRepository::class)]
class DeliveryDetails
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer')]
    private $quantity;

    #[ORM\ManyToOne(targetEntity: Delivery::class, inversedBy: 'deliveryDetails')]
    #[ORM\JoinColumn(nullable: false)]
    private $delivery;

    #[ORM\ManyToOne(targetEntity: Book::class, inversedBy: 'deliveryDetails')]
    #[ORM\JoinColumn(nullable: false)]
    private $book;

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

    public function getDelivery(): ?Delivery
    {
        return $this->delivery;
    }

    public function setDelivery(?Delivery $delivery): self
    {
        $this->delivery = $delivery;

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
}
