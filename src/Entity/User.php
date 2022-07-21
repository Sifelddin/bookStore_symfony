<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use App\Controller\Api\Users\MeController;
use ApiPlatform\Core\Action\NotFoundAction;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
#[ApiResource(
    security: 'is_granted("ROLE_USER")',
    collectionOperations: [],
    itemOperations: [
        'get' => [
            'controller' => NotFoundAction::class,
            'openapi_context' => ['summary' => 'hidden'],
            'read' => false,
            'output' => false
        ],
        'me' => [
            'pagination_enabled' => false,
            'path' => '/me',
            'method' => 'get',
            'controller' => MeController::class,
            'read' => false,
        ]
    ],
    normalizationContext: ['groups' => ['read:User']]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:User"])]
    private $id;

    #[Assert\NotBlank]
    #[Assert\Email(
        message: 'The email {{ value }} is not a valid email.',
    )]
    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(["read:User"])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(["read:User"])]
    private $roles = [];


    #[ORM\Column(type: 'string')]
    private $password;

    #[Assert\NotBlank]
    #[Assert\Regex('/\d+/', htmlPattern: false, match: false, message: "firstname does not have numbers",)]
    #[Assert\Length(min: 2, max: 50, minMessage: '3 letters minmum please', maxMessage: '50 letters maximum please')]
    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(["read:User"])]
    private $firstname;

    #[Assert\NotBlank]
    #[Assert\Regex('/\d+/', htmlPattern: false, match: false, message: "lastname name does not have numbers")]
    #[Assert\Length(min: 2, max: 50, minMessage: '3 letters minmum please', maxMessage: '50 letters maximum please')]
    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(["read:User"])]
    private $lastname;

    #[Assert\NotBlank]
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:User"])]
    private $address;

    #[Assert\NotBlank(message: 'zipcode field must be filled')]
    #[Assert\Regex('/^[0-9]{5}$/', match: true, message: "zipcode is not valid, please insert a valid zipcode ex: 76000",)]
    #[ORM\Column(type: 'string', length: 5)]
    #[Groups(["read:User"])]
    private $zipCode;

    #[Assert\NotBlank]
    #[Assert\Regex('/\d+/', match: false, htmlPattern: false, message: "city name does not have numbers",)]
    #[Assert\Length(min: 3, max: 50, minMessage: '3 letters minmum please', maxMessage: '50 letters maximum please')]
    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(["read:User"])]
    private $city;

    #[Assert\NotBlank]
    #[Assert\Regex('/^0{1}[0-9]{9}$/', match: true, message: "phone numbre is not valid, please insert a valid phone number ex: 0660801097",)]
    #[ORM\Column(type: 'string', length: 10)]
    #[Groups(["read:User"])]
    private $phone;


    #[Assert\PositiveOrZero(message: "the coefficient should be positive")]
    #[ORM\Column(type: 'decimal', precision: 5, scale: 2, updatable: true, options: ["default" => 0])]
    #[Groups(["read:User"])]
    private $Coef;

    #[ORM\Column(type: 'boolean', nullable: true, options: ["default" => true])]
    #[Groups(["read:User"])]
    private $private;

    #[ORM\OneToMany(mappedBy: 'userClient', targetEntity: Order::class)]
    private $orders;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }
    public function getFirstName(): ?string
    {
        return $this->firstname;
    }
    public function setFirstName(string $firstname): self
    {
        $this->firstname = $firstname;
        return $this;
    }
    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }


    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * Get the value of lastname
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set the value of lastname
     *
     * @return  self
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get the value of address
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set the value of address
     *
     * @return  self
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get the value of zipCode
     */
    public function getZipCode()
    {
        return $this->zipCode;
    }

    /**
     * Set the value of zipCode
     *
     * @return  self
     */
    public function setZipCode($zipCode)
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    /**
     * Get the value of city
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set the value of city
     *
     * @return  self
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get the value of phone
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set the value of phone
     *
     * @return  self
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get the value of Coef
     * 
     * 
     */
    public function getCoef(): string
    {

        return $this->Coef;
    }


    /**
     * Set the value of Coef
     *
     * @return  self
     */
    public function setCoef($Coef)
    {
        $this->Coef = $Coef;

        return $this;
    }

    /**
     * Get the value of private
     */
    public function getPrivate()
    {
        return $this->private;
    }

    /**
     * Set the value of private
     *
     * @return  self
     */
    public function setPrivate($private)
    {
        $this->private = $private;

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setUserClient($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getUserClient() === $this) {
                $order->setUserClient(null);
            }
        }

        return $this;
    }

    public function __toString()
    {
        return $this->getRoles();
    }
}
