-- CreateTable
CREATE TABLE "produit" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prix" INTEGER NOT NULL,

    CONSTRAINT "produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utilisateur" (
    "id" SERIAL NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commande" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commandeproduit" (
    "commandeId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "commandeproduit_pkey" PRIMARY KEY ("commandeId","produitId")
);

-- CreateIndex
CREATE INDEX "commande_utilisateurId_idx" ON "commande"("utilisateurId");

-- CreateIndex
CREATE INDEX "commandeproduit_produitId_idx" ON "commandeproduit"("produitId");

-- AddForeignKey
ALTER TABLE "commande" ADD CONSTRAINT "commande_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandeproduit" ADD CONSTRAINT "commandeproduit_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandeproduit" ADD CONSTRAINT "commandeproduit_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
