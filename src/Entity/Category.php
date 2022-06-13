<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CategoryRepository;
use Gedmo\Mapping\Annotation as Gedmo;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[UniqueEntity('name', message: 'category name should be unique')]
#[
    ApiResource(
        attributes: ["pagination_items_per_page" => 8],
        collectionOperations: ["get" => ['normalization_context' => ['groups' => ['cat:list']]]],
        itemOperations: ["get"]
    ),
    ApiFilter(SearchFilter::class, properties: ['catParent' => 'exact'])
]

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
    #[Groups(['book:full:item', 'cat:list'])]
    private $name;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Gedmo\Slug(fields: ["name"])]
    private $slug;

    #[Groups(['cat:list'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $photo;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'subCategories')]
    #[ORM\JoinColumn(onDelete: "SET NULL")]
    #[Groups(['cat:list'])]
    private $catParent;

    #[Groups(['cat:list'])]
    #[ORM\OneToMany(mappedBy: 'catParent', targetEntity: self::class)]
    private $subCategories;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Book::class)]
    private $books;

    public function __construct()
    {
        $this->books = new ArrayCollection();
        $this->subCategories = new ArrayCollection();
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

    public function setPhoto(string $photo): self
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
}
