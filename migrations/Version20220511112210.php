<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220511112210 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE book DROP category_id, DROP supllier_id');
        $this->addSql('ALTER TABLE category ADD books_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE category ADD CONSTRAINT FK_64C19C17DD8AC20 FOREIGN KEY (books_id) REFERENCES book (id)');
        $this->addSql('CREATE INDEX IDX_64C19C17DD8AC20 ON category (books_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE book ADD category_id INT NOT NULL, ADD supllier_id INT NOT NULL');
        $this->addSql('ALTER TABLE category DROP FOREIGN KEY FK_64C19C17DD8AC20');
        $this->addSql('DROP INDEX IDX_64C19C17DD8AC20 ON category');
        $this->addSql('ALTER TABLE category DROP books_id');
    }
}
