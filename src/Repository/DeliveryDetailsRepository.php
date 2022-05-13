<?php

namespace App\Repository;

use App\Entity\DeliveryDetails;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<DeliveryDetails>
 *
 * @method DeliveryDetails|null find($id, $lockMode = null, $lockVersion = null)
 * @method DeliveryDetails|null findOneBy(array $criteria, array $orderBy = null)
 * @method DeliveryDetails[]    findAll()
 * @method DeliveryDetails[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DeliveryDetailsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DeliveryDetails::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(DeliveryDetails $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(DeliveryDetails $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return DeliveryDetails[] Returns an array of DeliveryDetails objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DeliveryDetails
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
