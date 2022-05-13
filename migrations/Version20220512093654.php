<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220512093654 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE book CHANGE price price NUMERIC(6, 2) DEFAULT NULL');
        $this->addSql('ALTER TABLE `order` CHANGE shipped_date shipped_date DATE DEFAULT NULL, CHANGE ship_address ship_address VARCHAR(255) DEFAULT NULL, CHANGE ship_city ship_city VARCHAR(255) DEFAULT NULL, CHANGE ship_zip_code ship_zip_code VARCHAR(5) DEFAULT NULL, CHANGE bill_address bill_address VARCHAR(255) DEFAULT NULL, CHANGE bill_zip_code bill_zip_code VARCHAR(5) DEFAULT NULL, CHANGE bill_city bill_city VARCHAR(255) DEFAULT NULL, CHANGE discount discount NUMERIC(6, 2) DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE book CHANGE price price NUMERIC(6, 2) DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE `order` CHANGE shipped_date shipped_date DATE DEFAULT \'NULL\', CHANGE ship_address ship_address VARCHAR(255) DEFAULT \'NULL\', CHANGE ship_city ship_city VARCHAR(255) DEFAULT \'NULL\', CHANGE ship_zip_code ship_zip_code VARCHAR(5) DEFAULT \'NULL\', CHANGE bill_address bill_address VARCHAR(255) DEFAULT \'NULL\', CHANGE bill_zip_code bill_zip_code VARCHAR(5) DEFAULT \'NULL\', CHANGE bill_city bill_city VARCHAR(255) DEFAULT \'NULL\', CHANGE discount discount NUMERIC(6, 2) DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_bin`');
    }
}
