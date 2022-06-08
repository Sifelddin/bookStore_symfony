<?php

namespace App\Repository;

use App\Entity\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Category>
 *
 * @method Category|null find($id, $lockMode = null, $lockVersion = null)
 * @method Category|null findOneBy(array $criteria, array $orderBy = null)
 * @method Category[]    findAll()
 * @method Category[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(Category $entity, bool $flush = true): void
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
    public function remove(Category $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return Category[] Returns an array of Category objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /**
     * 
     * @return array[]
     */
    public function parentCategoryList($value): array
    {
        return $this->createQueryBuilder('c')
            ->Where('c.catParent is null')
            ->andWhere("c.id != $value")
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * 
     * @return array[]
     */
    public function allParentCategory(): array
    {
        return $this->createQueryBuilder('c')
            ->Where('c.catParent is null')
            ->getQuery()
            ->getArrayResult();
    }


    //find parent category in the category table depends on the category to update

    /**
     * @param string
     * 
     */
    public function isParent($value)
    {
        return $this->createQueryBuilder('c')
            ->where("c.catParent = $value")
            ->getQuery()
            ->getResult();
    }
}
