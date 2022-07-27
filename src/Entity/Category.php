<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CategoryRepository;
use Gedmo\Mapping\Annotation as Gedmo;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Controller\Api\Categories\EmptyController;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;



#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[Vich\Uploadable]
#[UniqueEntity('name', message: 'category name should be unique')]
#[
    ApiResource(
        collectionOperations: [
            "get" => [
                "pagination_items_per_page" => 8,
            ],
            "electron" => [
                'method' => 'get',
                'path' => '/v2/categories',
                'pagination_items_per_page' => 6,
            ],
            "all" => [
                'method' => 'get',
                'path' => '/v2/categories/all',
                'paginationEnabled' => false,
            ],
            "post"
        ],
        itemOperations: [
            "get" => [
                'normalization_context' => ['groups' => 'cat:item']
            ], "delete", "patch",
            'image' => [
                'method' => 'POST',
                'path' => '/categories/{id}/image',
                'controller' => EmptyController::class,
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

        denormalizationContext: ['groups' => ['cat:write']],
        normalizationContext: ['groups' => ['cat:list']]
    ),
]
// #[ApiFilter(SearchFilter::class, properties: ['catParent' => 'exact'])]
#[ApiFilter(ExistsFilter::class, properties: ['catParent', 'subCategories'])]
#[ApiFilter(SearchFilter::class, properties: ['catParent.name' => 'exact'])]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['cat:list'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3)]
    #[Groups(['cat:list', 'cat:write', 'cat:item'])]
    private $name;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Gedmo\Slug(fields: ["name"])]
    private $slug;

    #[Groups(['cat:list', 'cat:item'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $photo;

    #[Vich\UploadableField(mapping: 'category_image', fileNameProperty: 'photo')]
    #[Groups(['cat:write'])]
    private ?File $imageFile = null;

    #[Groups(['cat:list', 'cat:write', 'cat:item'])]
    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'subCategories')]
    #[ORM\JoinColumn(onDelete: "SET NULL")]
    private $catParent;

    #[Groups(['cat:item'])]
    #[ORM\OneToMany(mappedBy: 'catParent', targetEntity: self::class)]
    private $subCategories;

    #[Groups(['cat:item'])]
    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Book::class)]
    private $books;

    #[Gedmo\Timestampable(on: "create")]
    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[Gedmo\Timestampable(on: "update")]
    #[ORM\Column(type: 'datetime_immutable')]
    private ?\DateTimeInterface $updatedAt = null;

    public function __construct()
    {
        $this->books = new ArrayCollection();
        $this->subCategories = new ArrayCollection();
    }

    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }
    }


    public function getId(): ?int
    {
        return $this->id;
    }


    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    public function getCatParent(): ?self
    {
        return $this->catParent;
    }

    public function setCatParent(?self $catParent): self
    {

        $this->catParent = $catParent;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getSubCategories(): Collection
    {
        return $this->subCategories;
    }

    public function addCategory(self $category): self
    {
        if (!$this->subCategories->contains($category)) {
            $this->subCategories[] = $category;
            $category->setCatParent($this);
        }

        return $this;
    }

    public function removeCategory(self $category): self
    {
        if ($this->subCategories->removeElement($category)) {
            // set the owning side to null (unless already changed)
            if ($category->getCatParent() === $this) {
                $category->setCatParent(null);
            }
        }

        return $this;
    }
    public function __toString()
    {
        return $this->getName();
    }

    /**
     * Get the value of slug
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * @return Collection<int, Book>
     */
    public function getBooks(): Collection
    {
        return $this->books;
    }

    public function addBook(Book $book): self
    {
        if (!$this->books->contains($book)) {
            $this->books[] = $book;
            $book->setCategory($this);
        }

        return $this;
    }

    public function removeBook(Book $book): self
    {
        if ($this->books->removeElement($book)) {
            // set the owning side to null (unless already changed)
            if ($book->getCategory() === $this) {
                $book->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * Get the value of imageFile
     */
    public function getImageFile(): ?File
    {
        return $this->imageFile;
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
}
