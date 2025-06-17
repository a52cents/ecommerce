-- CreateTable
CREATE TABLE `produit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `prix` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mail` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL DEFAULT 'user',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commande` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `utilisateurId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `commande_utilisateurId_fkey`(`utilisateurId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commandeproduit` (
    `commandeId` INTEGER NOT NULL,
    `produitId` INTEGER NOT NULL,

    INDEX `commandeProduit_produitId_fkey`(`produitId`),
    PRIMARY KEY (`commandeId`, `produitId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commandeproduit` ADD CONSTRAINT `commandeProduit_commandeId_fkey` FOREIGN KEY (`commandeId`) REFERENCES `commande`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commandeproduit` ADD CONSTRAINT `commandeProduit_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `produit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
