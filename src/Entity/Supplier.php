<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SupplierRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ApiResource(
    security: "is_granted('ROLE_CATALOGUE')",
    routePrefix: '/v2',
    paginationItemsPerPage: 8,
    itemOperations: ['delete', 'put', 'get'],
    denormalizationContext: ['groups' => ['write:post']]
)]
#[UniqueEntity('contactName', message: 'contactName should be unique')]
#[ORM\Entity(repositoryClass: SupplierRepository::class)]
class Supplier
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255, minMessage: 'contactName should be more than 3 character long', maxMessage: 'contactName should be less than 255 character long')]
    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups(['write:post', 'book:item'])]
    private $contactName;

    #[ORM\OneToMany(mappedBy: 'supplier', targetEntity: Book::class)]
    private $books;

    public function __construct()
    {
        $this->books = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->contactName;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContactName(): ?string
    {
        return $this->contactName;
    }

    public function setContactName(string $contactName): self
    {
        $this->contactName = $contactName;

        return $this;
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
            $book->setSupplier($this);
        }

        return $this;
    }

    public function removeBook(Book $book): self
    {
        if ($this->books->removeElement($book)) {
            // set the owning side to null (unless already changed)
            if ($book->getSupplier() === $this) {
                $book->setSupplier(null);
            }
        }

        return $this;
    }
}
