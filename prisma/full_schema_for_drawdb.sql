CREATE TABLE "produit" (
    "id" SERIAL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prix" INTEGER NOT NULL
);

CREATE TABLE "utilisateur" (
    "id" SERIAL PRIMARY KEY,
    "mail" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE "commande" (
    "id" SERIAL PRIMARY KEY,
    "utilisateurId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id")
);

CREATE TABLE "commandeproduit" (
    "id" SERIAL PRIMARY KEY,
    "commandeId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY ("commandeId") REFERENCES "commande"("id"),
    FOREIGN KEY ("produitId") REFERENCES "produit"("id")
);