<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\BookRepository;
use Gedmo\Mapping\Annotation as Gedmo;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: BookRepository::class)]
#[UniqueEntity('title', message: 'the title should be unique')]
#[
    ApiResource(
        attributes: ["pagination_items_per_page" => 5],
        collectionOperations: ["get" => ['normalization_context' => ['groups' => 'book:list']]],
        itemOperations: ["get" => [
            'normalization_context' => ['groups' => 'book:item']
        ]]
    ),
]
#[ApiFilter(SearchFilter::class, properties: ['category' => 'exact', 'slug' => 'exact'])]

class Book
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['book:list', 'book:item'])]
    private $id;

    #[Assert\NotBlank]
    #[Assert\Length(min: 4, max: 255, minMessage: 'the title should be more than 4 character long', maxMessage: 'the title should be less than 255 character long')]
    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups(['book:list', 'book:item'])]
    private $title;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Gedmo\Slug(fields: ["title"])]
    #[Groups(['book:list', 'book:item'])]
    private $slug;

    #[Assert\NotBlank]
    #[Assert\Positive(message: "the price should be positive")]
    #[ORM\Column(type: 'decimal', precision: 6, scale: 2)]
    #[Groups(['book:list', 'book:item'])]
    private $price;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['book:list', 'book:item'])]
    private $photo;

    #[Assert\NotBlank]
    #[ORM\Column(type: 'text')]
    #[Groups(['book:item'])]
    private $description;

    #[Assert\NotBlank]
    #[Assert\PositiveOrZero(message: "the price should be positive or zero")]
    #[ORM\Column(type: 'integer')]
    private $stock;

    #[Assert\NotBlank]
    #[Assert\PositiveOrZero(message: "the price should be positive or zero")]
    #[ORM\Column(type: 'integer')]
    private $stockAlert;

    #[Assert\NotBlank]
    #[ORM\Column(type: 'date')]
    #[Groups(['book:list', 'book:item'])]
    private $releaseDate;

    #[ORM\Column(type: 'boolean')]
    #[ApiFilter(BooleanFilter::class)]
    private $published;

    #[Assert\NotBlank]
    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'books')]
    #[ORM\JoinColumn(nullable: false)]
    private $category;

    #[Assert\NotBlank]
    #[ORM\ManyToOne(targetEntity: Supplier::class, inversedBy: 'books')]
    #[ORM\JoinColumn(nullable: false)]
    private $supplier;

    #[ORM\OneToMany(mappedBy: 'book', targetEntity: BookOrder::class)]
    private $bookOrders;

    #[ORM\OneToMany(mappedBy: 'book', targetEntity: DeliveryDetails::class)]
    private $deliveryDetails;

    #[Gedmo\Timestampable(on: "create")]
    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[Gedmo\Timestampable(on: "update")]
    #[ORM\Column(type: 'datetime_immutable')]
    private $updatedAt;

    #[Groups(['book:item'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $editor;

    #[Groups(['book:list', 'book:item'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $author;

    public function __construct()
    {
        $this->bookOrders = new ArrayCollection();
        $this->deliveryDetails = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->title;
    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }


    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(?string $price): self
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

    public function setReleaseDate(?\DateTimeInterface $releaseDate): self
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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getEditor(): ?string
    {
        return $this->editor;
    }

    public function setEditor(string $editor): self
    {
        $this->editor = $editor;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = $author;

        return $this;
    }
}
