<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\BookRepository;
use Gedmo\Mapping\Annotation as Gedmo;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\Common\Collections\ArrayCollection;
use App\Controller\Api\Categories\EmptyController;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Serializer\Annotation\Context;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

#[ORM\Entity(repositoryClass: BookRepository::class)]
#[Vich\Uploadable]
#[UniqueEntity('title', message: 'the title should be unique')]
#[
    ApiResource(
        attributes: ["pagination_items_per_page" => 5],
        order: ["id" => "DESC"],
        collectionOperations: [
            "get" => [
                'normalization_context' => ['groups' => 'book:list']
            ],
            "search" => [
                "method" => "get",
                "path" => '/books/search',
                'normalization_context' => ['groups' => 'book:list:search'],
                'pagination_items_per_page' => 10,
            ],
            "post" => [
                "path" => "/v2/books",
                "security" => "is_granted('ROLE_CATALOGUE')",
            ]
        ],
        itemOperations: [
            "get" => [
                'normalization_context' => ['groups' => 'book:item']

            ], "delete" => [
                "path" => "/v2/books/{id}",
                "security" => "is_granted('ROLE_CATALOGUE')",
            ],

            // post request with contentType : multipart/form
            'image' => [
                'method' => 'POST',
                'path' => '/v2/books/{id}/image',
                'controller' => EmptyController::class,
                "security" => "is_granted('ROLE_CATALOGUE')",
                'openapi_context' => [
                    'requestBody' => [
                        'content' => [
                            'multipart/form-data' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'file' => [
                                            'type' => 'string',
                                            'format' => 'binary',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        denormalizationContext: ['groups' => ["book:write"]]
    ),
]
#[ApiFilter(SearchFilter::class, properties: ['category' => 'exact', 'slug' => 'partial'])]

class Book
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['book:list', 'book:item', 'read:order', 'book:list:search'])]
    private $id;

    #[Assert\NotBlank]
    #[Assert\Length(min: 4, max: 255, minMessage: 'the title should be more than 4 character long', maxMessage: 'the title should be less than 255 character long')]
    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups(['book:list', 'book:item', 'read:order', "book:write", 'read:user'])]
    private $title;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Gedmo\Slug(fields: ["title"])]
    #[Groups(['book:list', 'book:item', 'book:list:search'])]
    private $slug;

    #[Assert\NotBlank]
    #[Assert\Positive(message: "the price should be positive")]
    #[ORM\Column(type: 'decimal', precision: 6, scale: 2)]
    #[Groups(['book:list', 'book:item', "book:write"])]
    private $price;

    /**
     * This is not a mapped field of entity metadata, just a simple property.
     */
    #[Vich\UploadableField(mapping: 'book_image', fileNameProperty: 'photo')]
    #[Groups(["book:write"])]
    private ?File $imageFile = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['book:list', 'book:item'])]
    private $photo;

    #[Assert\NotBlank]
    #[ORM\Column(type: 'text')]
    #[Groups(['book:item', "book:write"])]
    private $description;

    #[Assert\NotBlank]
    #[Assert\PositiveOrZero(message: "stock quantity should be positive or zero")]
    #[ORM\Column(type: 'integer')]
    #[Groups(['book:list', 'book:item', "book:write"])]
    private $stock;

    #[Assert\NotBlank]
    #[Assert\PositiveOrZero(message: "stock alert quantity should be positive or zero")]
    #[ORM\Column(type: 'integer')]
    #[Groups(["book:write", 'book:item'])]
    private $stockAlert;

    #[Assert\NotBlank]
    #[ORM\Column(type: 'date')]
    #[Groups(['book:list', 'book:item', "book:write"])]
    #[Context(normalizationContext: [DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
    private $releaseDate;

    #[ORM\Column(type: 'boolean')]
    #[ApiFilter(BooleanFilter::class)]
    #[Groups(['book:list', 'book:item', "book:write"])]
    private $published;

    #[Assert\NotBlank]
    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'books')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["book:write", "book:item"])]
    private $category;

    #[Assert\NotBlank]
    #[ORM\ManyToOne(targetEntity: Supplier::class, inversedBy: 'books')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["book:write", 'book:item'])]
    private $supplier;

    #[Groups(['book:list'])]
    #[ORM\OneToMany(mappedBy: 'book', targetEntity: BookOrder::class)]
    private $bookOrders;

    #[ORM\OneToMany(mappedBy: 'book', targetEntity: DeliveryDetails::class)]
    private $deliveryDetails;

    #[Gedmo\Timestampable(on: "create")]
    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['book:item'])]
    #[Context(normalizationContext: [DateTimeNormalizer::FORMAT_KEY => 'd-m-Y'])]
    private $createdAt;

    #[Gedmo\Timestampable(on: "update")]
    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['book:item'])]
    #[Context(normalizationContext: [DateTimeNormalizer::FORMAT_KEY => 'd-m-Y'])]
    private $updatedAt;

    #[Groups(['book:item', "book:write"])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255, minMessage: 'the editor field should be 3 or more character long', maxMessage: 'the editor field should be less than 255 character long')]
    #[ORM\Column(type: 'string', length: 255)]
    private $editor;

    #[Groups(['book:list', 'book:item', "book:write"])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255, minMessage: 'the author field should be 3 or more character long', maxMessage: 'the author field should be less than 255 character long')]
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

    public function setPhoto(?string $photo): self
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


    /**
     * Get the value of imageFile
     */
    public function getImageFile()
    {
        return $this->imageFile;
    }

    /**
     * Set the value of imageFile
     *
     * @return  self
     */
    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;
        if (null !== $imageFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }
    }
}
