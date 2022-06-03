<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Mime\Message;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Assert\NotBlank]
    #[Assert\Email(
        message: 'The email {{ value }} is not a valid email.',
    )]
    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private $email;

    #[ORM\Column(type: 'json')]
    private $roles = [];


    #[ORM\Column(type: 'string')]
    private $password;

    #[Assert\NotBlank]
    #[Assert\Regex('/\d+/', htmlPattern: false, match: false, message: "firstname does not have numbers",)]
    #[Assert\Length(min: 2, max: 50, minMessage: '3 letters minmum please', maxMessage: '50 letters maximum please')]
    #[ORM\Column(type: 'string', length: 50)]
    private $firstname;

    #[Assert\NotBlank]
    #[Assert\Regex('/\d+/', htmlPattern: false, match: false, message: "lastname name does not have numbers")]
    #[Assert\Length(min: 2, max: 50, minMessage: '3 letters minmum please', maxMessage: '50 letters maximum please')]
    #[ORM\Column(type: 'string', length: 50)]
    private $lastname;

    #[Assert\NotBlank]
    #[ORM\Column(type: 'string', length: 255)]
    private $address;

    #[Assert\NotBlank(message: 'zipcode field must be filled')]
    #[Assert\Regex('/^[0-9]{2}0{3}$/', match: true, message: "zipcode is not valid, please insert a valid zipcode ex: 76000",)]
    #[ORM\Column(type: 'string', length: 5)]
    private $zipCode;

    #[Assert\NotBlank]
    #[Assert\Regex('/\d+/', match: false, htmlPattern: false, message: "city name does not have numbers",)]
    #[Assert\Length(min: 3, max: 50, minMessage: '3 letters minmum please', maxMessage: '50 letters maximum please')]
    #[ORM\Column(type: 'string', length: 50)]
    private $city;

    #[Assert\NotBlank]
    #[Assert\Regex('/^0{1}[0-9]{9}$/', match: true, message: "phone numbre is not valid, please insert a valid phone number ex: 066001097",)]
    #[ORM\Column(type: 'string', length: 10)]
    private $phone;


    #[Assert\Positive(message: "the coefficient should be positive")]
    #[ORM\Column(type: 'decimal', precision: 5, scale: 2, updatable: true, options: ["default" => 0])]
    private $Coef;

    #[ORM\Column(type: 'boolean', nullable: true, options: ["default" => true])]
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
     */
    public function getCoef()
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
