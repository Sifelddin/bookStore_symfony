<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220511125115 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `order` (id INT AUTO_INCREMENT NOT NULL, user_client_id INT NOT NULL, order_date DATE NOT NULL, shipped_date DATE DEFAULT NULL, ship_address VARCHAR(255) DEFAULT NULL, ship_city VARCHAR(255) DEFAULT NULL, ship_zip_code VARCHAR(5) DEFAULT NULL, payment_date DATE NOT NULL, coef NUMERIC(5, 2) NOT NULL, bill_address VARCHAR(255) DEFAULT NULL, bill_zip_code VARCHAR(5) DEFAULT NULL, bill_city VARCHAR(255) DEFAULT NULL, discount NUMERIC(6, 2) DEFAULT NULL, pay_method VARCHAR(50) NOT NULL, INDEX IDX_F5299398190BE4C5 (user_client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F5299398190BE4C5 FOREIGN KEY (user_client_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE `order`');
    }
}
