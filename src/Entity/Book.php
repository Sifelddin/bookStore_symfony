<?php

namespace App\Entity;

use App\Repository\BookRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $title;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private $slug;

    #[ORM\Column(type: 'decimal', precision: 6, scale: 2, nullable: true)]
    private $price;

    #[ORM\Column(type: 'string', length: 255)]
    private $photo;

    #[ORM\Column(type: 'text')]
    private $description;

    #[ORM\Column(type: 'integer')]
    private $stock;

    #[ORM\Column(type: 'integer')]
    private $stockAlert;

    #[ORM\Column(type: 'date')]
    private $releaseDate;

    #[ORM\Column(type: 'boolean')]
    private $published;

    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $category;

    #[ORM\ManyToOne(targetEntity: Supplier::class, inversedBy: 'books')]
    #[ORM\JoinColumn(nullable: false)]
    private $supplier;

    #[ORM\OneToMany(mappedBy: 'book', targetEntity: BookOrder::class)]
    private $bookOrders;

    #[ORM\OneToMany(mappedBy: 'book', targetEntity: DeliveryDetails::class)]
    private $deliveryDetails;

    public function __construct()
    {
        $this->bookOrders = new ArrayCollection();
        $this->deliveryDetails = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getStockAlert(): ?int
    {
        return $this->stockAlert;
    }

    public function setStockAlert(int $stockAlert): self
    {
        $this->stockAlert = $stockAlert;

        return $this;
    }

    public function getReleaseDate(): ?\DateTimeInterface
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(\DateTimeInterface $releaseDate): self
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }

    public function getPublished(): ?bool
    {
        return $this->published;
    }

    public function setPublished(bool $published): self
    {
        $this->published = $published;

        return $this;
    }


    /**
     * Get the value of slug
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Set the value of slug
     *
     * @return  self
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getSupplier(): ?Supplier
    {
        return $this->supplier;
    }

    public function setSupplier(?Supplier $supplier): self
    {
        $this->supplier = $supplier;

        return $this;
    }

    /**
     * @return Collection<int, BookOrder>
     */
    public function getBookOrders(): Collection
    {
        return $this->bookOrders;
    }

    public function addBookOrder(BookOrder $bookOrder): self
    {
        if (!$this->bookOrders->contains($bookOrder)) {
            $this->bookOrders[] = $bookOrder;
            $bookOrder->setBook($this);
        }

        return $this;
    }

    public function removeBookOrder(BookOrder $bookOrder): self
    {
        if ($this->bookOrders->removeElement($bookOrder)) {
            // set the owning side to null (unless already changed)
            if ($bookOrder->getBook() === $this) {
                $bookOrder->setBook(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, DeliveryDetails>
     */
    public function getDeliveryDetails(): Collection
    {
        return $this->deliveryDetails;
    }

    public function addDeliveryDetail(DeliveryDetails $deliveryDetail): self
    {
        if (!$this->deliveryDetails->contains($deliveryDetail)) {
            $this->deliveryDetails[] = $deliveryDetail;
            $deliveryDetail->setBook($this);
        }

        return $this;
    }

    public function removeDeliveryDetail(DeliveryDetails $deliveryDetail): self
    {
        if ($this->deliveryDetails->removeElement($deliveryDetail)) {
            // set the owning side to null (unless already changed)
            if ($deliveryDetail->getBook() === $this) {
                $deliveryDetail->setBook(null);
            }
        }

        return $this;
    }
}
