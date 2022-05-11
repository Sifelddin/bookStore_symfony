<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220511094731 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE employee');
        $this->addSql('ALTER TABLE book ADD title VARCHAR(255) NOT NULL, ADD slug VARCHAR(255) NOT NULL, ADD price NUMERIC(6, 2) DEFAULT NULL, ADD photo VARCHAR(255) NOT NULL, ADD stock INT NOT NULL, ADD stock_alert INT NOT NULL, ADD category_id INT NOT NULL, ADD supllier_id INT NOT NULL, DROP book_title, DROP book_price, DROP book_photo, DROP book_stock, DROP book_stock_alert, DROP book_category_id, DROP book_supllier_id, CHANGE book_description description LONGTEXT NOT NULL, CHANGE book_release_date release_date DATE NOT NULL, CHANGE book_published published TINYINT(1) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_CBE5A331989D9B62 ON book (slug)');
        $this->addSql('ALTER TABLE category ADD name VARCHAR(255) NOT NULL, ADD photo VARCHAR(255) NOT NULL, DROP category_name, DROP cat_photo, CHANGE category_parent_id cat_parent_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE supplier CHANGE sup_contact_name contact_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user ADD coef NUMERIC(5, 2) NOT NULL, ADD private TINYINT(1) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE client (id INT AUTO_INCREMENT NOT NULL, client_type LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:array)\', client_coef NUMERIC(4, 2) NOT NULL, client_employe_id INT NOT NULL, client_user_id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE employee (id INT AUTO_INCREMENT NOT NULL, employe_post LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:array)\', employe_departement LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:array)\', employe_user_id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP INDEX UNIQ_CBE5A331989D9B62 ON book');
        $this->addSql('ALTER TABLE book ADD book_title VARCHAR(255) NOT NULL, ADD book_price NUMERIC(6, 2) NOT NULL, ADD book_photo VARCHAR(255) NOT NULL, ADD book_stock INT NOT NULL, ADD book_stock_alert INT NOT NULL, ADD book_category_id INT NOT NULL, ADD book_supllier_id INT NOT NULL, DROP title, DROP slug, DROP price, DROP photo, DROP stock, DROP stock_alert, DROP category_id, DROP supllier_id, CHANGE description book_description LONGTEXT NOT NULL, CHANGE release_date book_release_date DATE NOT NULL, CHANGE published book_published TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE category ADD category_name VARCHAR(255) NOT NULL, ADD cat_photo VARCHAR(255) NOT NULL, DROP name, DROP photo, CHANGE cat_parent_id category_parent_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE supplier CHANGE contact_name sup_contact_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user DROP coef, DROP private');
    }
}
