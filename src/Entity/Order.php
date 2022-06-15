<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\OrderRepository;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]

class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'date', nullable: true)]
    private $shippedDate;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $ShipAddress;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $shipCity;

    #[ORM\Column(type: 'string', length: 5, nullable: true)]
    private $shipZipCode;

    #[ORM\Column(type: 'date')]
    private $paymentDate;

    #[ORM\Column(type: 'decimal', precision: 5, scale: 2)]
    private $coef;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $billAddress;

    #[ORM\Column(type: 'string', length: 5, nullable: true)]
    private $billZipCode;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $billCity;

    #[ORM\Column(type: 'decimal', precision: 6, scale: 2, nullable: true)]
    private $discount;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private $userClient;

    #[ORM\Column(type: 'string', length: 50)]
    private $payMethod;

    #[Gedmo\Timestampable(on: "create")]
    #[ORM\Column(type: 'datetime_immutable')]
    private $orderDate;

    #[ORM\OneToMany(mappedBy: 'order', targetEntity: BookOrder::class)]
    private $bookOrders;

    #[ORM\OneToMany(mappedBy: 'order', targetEntity: Delivery::class)]
    private $deliveries;


    public function __construct()
    {
        $this->bookOrders = new ArrayCollection();
        $this->deliveries = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrderDate(): ?\DateTimeInterface
    {
        return $this->orderDate;
    }

    public function getShippedDate(): ?\DateTimeInterface
    {
        return $this->shippedDate;
    }

    public function setShippedDate(?\DateTimeInterface $shippedDate): self
    {
        $this->shippedDate = $shippedDate;

        return $this;
    }

    public function getShipAddress(): ?string
    {
        return $this->ShipAddress;
    }

    public function setShipAddress(?string $ShipAddress): self
    {
        $this->ShipAddress = $ShipAddress;

        return $this;
    }

    public function getShipCity(): ?string
    {
        return $this->shipCity;
    }

    public function setShipCity(?string $shipCity): self
    {
        $this->shipCity = $shipCity;

        return $this;
    }

    public function getShipZipCode(): ?string
    {
        return $this->shipZipCode;
    }

    public function setShipZipCode(?string $shipZipCode): self
    {
        $this->shipZipCode = $shipZipCode;

        return $this;
    }

    public function getPaymentDate(): ?\DateTimeInterface
    {
        return $this->paymentDate;
    }

    public function setPaymentDate(\DateTimeInterface $paymentDate): self
    {
        $this->paymentDate = $paymentDate;

        return $this;
    }

    public function getCoef(): ?string
    {
        return $this->coef;
    }

    public function setCoef(string $coef): self
    {
        $this->coef = $coef;

        return $this;
    }

    public function getBillAddress(): ?string
    {
        return $this->billAddress;
    }

    public function setBillAddress(?string $billAddress): self
    {
        $this->billAddress = $billAddress;

        return $this;
    }

    public function getBillZipCode(): ?string
    {
        return $this->billZipCode;
    }

    public function setBillZipCode(?string $billZipCode): self
    {
        $this->billZipCode = $billZipCode;

        return $this;
    }

    public function getBillCity(): ?string
    {
        return $this->billCity;
    }

    public function setBillCity(?string $billCity): self
    {
        $this->billCity = $billCity;

        return $this;
    }

    public function getDiscount(): ?string
    {
        return $this->discount;
    }

    public function setDiscount(?string $discount): self
    {
        $this->discount = $discount;

        return $this;
    }

    public function getUserClient(): ?User
    {
        return $this->userClient;
    }

    public function setUserClient(?User $userClient): self
    {
        $this->userClient = $userClient;

        return $this;
    }

    public function getPayMethod(): ?string
    {
        return $this->payMethod;
    }

    public function setPayMethod(string $payMethod): self
    {
        $this->payMethod = $payMethod;

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
            $bookOrder->setOrder($this);
        }

        return $this;
    }

    public function removeBookOrder(BookOrder $bookOrder): self
    {
        if ($this->bookOrders->removeElement($bookOrder)) {
            // set the owning side to null (unless already changed)
            if ($bookOrder->getOrder() === $this) {
                $bookOrder->setOrder(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Delivery>
     */
    public function getDeliveries(): Collection
    {
        return $this->deliveries;
    }

    public function addDelivery(Delivery $delivery): self
    {
        if (!$this->deliveries->contains($delivery)) {
            $this->deliveries[] = $delivery;
            $delivery->setOrder($this);
        }

        return $this;
    }

    public function removeDelivery(Delivery $delivery): self
    {
        if ($this->deliveries->removeElement($delivery)) {
            // set the owning side to null (unless already changed)
            if ($delivery->getOrder() === $this) {
                $delivery->setOrder(null);
            }
        }

        return $this;
    }
}
