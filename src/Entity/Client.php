<?php

namespace App\Entity;

use App\Repository\ClientRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClientRepository::class)]
class Client
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'array')]
    private $clientType = [];

    #[ORM\Column(type: 'decimal', precision: 4, scale: 2)]
    private $clientCoef;

    #[ORM\Column(type: 'integer')]
    private $clientEmployeId;

    #[ORM\Column(type: 'integer')]
    private $clientUserId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCliType(): ?array
    {
        return $this->clientType;
    }

    public function setCliType(array $clientType): self
    {
        $this->clientType = $clientType;

        return $this;
    }

    public function getCliCoef(): ?string
    {
        return $this->clientCoef;
    }

    public function setCliCoef(string $clientCoef): self
    {
        $this->clientCoef = $clientCoef;

        return $this;
    }

    public function getCliEmployeId(): ?int
    {
        return $this->clientEmployeId;
    }

    public function setCliEmployeId(int $clientEmployeId): self
    {
        $this->clientEmployeId = $clientEmployeId;

        return $this;
    }

    public function getCliUserId(): ?int
    {
        return $this->clientUserId;
    }

    public function setCliUserId(int $clientUserId): self
    {
        $this->clientUserId = $clientUserId;

        return $this;
    }
}
