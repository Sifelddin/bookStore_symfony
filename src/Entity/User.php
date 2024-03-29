<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use App\Controller\Api\Users\MeController;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Positive;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
#[ApiResource(
    collectionOperations: [
        // admin | commercial : get all users 
        "get" => [
            "path" => "/v2/users",
            "security" => "is_granted('ROLE_COMMERCIAL')"
        ]
    ],
    itemOperations: [
        // admin | commercial : get user data and his orders 
        'get' => [
            'normalization_context' => ['groups' => ['read:user']],
            "method" => "GET",
            "path" => "/v2/users/{id}",
            "security" => "is_granted('ROLE_COMMERCIAL')"
        ],
        // user : for ordering and checking the profile and the orders history
        'me' => [
            'pagination_enabled' => false,
            'path' => '/me',
            "security" => "is_granted('ROLE_USER')",
            'method' => 'get',
            'controller' => MeController::class,
            'read' => false,
        ],
        //  user :  update the profile data
        'patch' => [
            'denormalization_context' => ['groups' => ['patch:user']],
            "method" => "patch",
            "path" => "/users/{id}",
            "security" => "is_granted('ROLE_USER')",
        ],
        //  admin | commercial : to update the status , role of each user and the coef
        'status' => [
            'denormalization_context' => ['groups' => ['patch:status']],
            'path' => '/v2/users/{id}/status',
            'method' => 'put',
        ]

    ],
    normalizationContext: ['groups' => ['user:list']]
)]
#[ApiFilter(ExistsFilter::class, properties: ['private'])]
#[ApiFilter(BooleanFilter::class, properties: ['private'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:user", 'user:list'])]
    private $id;

    #[Assert\NotBlank]
    #[Assert\Email(message: 'The email {{ value }} is not a valid email.')]
    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(["read:user", 'patch:user', 'user:list'])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(["read:user", 'user:list', 'patch:status'])]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[Assert\NotBlank]
    #[Assert\Regex('/\d+/', htmlPattern: false, match: false, message: "firstname does not have numbers",)]
    #[Assert\Length(min: 2, max: 50, minMessage: '3 letters minmum please', maxMessage: '50 letters maximum please')]
    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(["read:user", 'patch:user', 'user:list'])]
    private $firstname;

    #[Assert\NotBlank]
    #[Assert\Regex('/\d+/', htmlPattern: false, match: false, message: "lastname name does not have numbers")]
    #[Assert\Length(min: 2, max: 50, minMessage: '3 letters minmum please', maxMessage: '50 letters maximum please')]
    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(["read:user", 'patch:user', 'user:list'])]
    private $lastname;

    #[Assert\NotBlank]
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:user", 'patch:user', 'user:list'])]
    private $address;

    #[Assert\NotBlank(message: 'zipcode field must be filled')]
    #[Assert\Regex('/^[0-9]{5}$/', match: true, message: "zipcode is not valid, please insert a valid zipcode ex: 76000",)]
    #[ORM\Column(type: 'string', length: 5)]
    #[Groups(["read:user", 'patch:user', 'user:list'])]
    private $zipCode;

    #[Assert\NotBlank]
    #[Assert\Regex('/\d+/', match: false, htmlPattern: false, message: "city name does not have numbers",)]
    #[Assert\Length(min: 3, max: 50, minMessage: '3 letters minmum please', maxMessage: '50 letters maximum please')]
    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(["read:user", 'patch:user', 'user:list'])]
    private $city;

    #[Assert\NotBlank]
    #[Assert\Regex('/^0{1}[0-9]{9}$/', match: true, message: "phone numbre is not valid, please insert a valid phone number ex: 0660801097",)]
    #[ORM\Column(type: 'string', length: 10)]
    #[Groups(["read:user", 'patch:user', 'user:list'])]
    private $phone;

    // #[Assert\NotBlank]
    // #[Assert\Positive]
    #[Assert\Regex('/(\d+)(.\d+)?$/', match: true, message: "Coef should be a number !")]
    #[ORM\Column(type: 'decimal', precision: 5, scale: 2, options: ["default" => '1.00'])]
    #[Groups(["read:user", 'user:list', 'patch:status'])]
    private $Coef = "1.00";

    #[ORM\Column(type: 'boolean', nullable: true, options: ["default" => true])]
    #[Groups(["read:user", 'user:list', 'patch:status'])]
    private $private = 1;

    #[Groups(['read:user'])]
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
