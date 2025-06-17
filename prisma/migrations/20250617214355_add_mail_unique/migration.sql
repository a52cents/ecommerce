/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `utilisateur` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_mail_key" ON "utilisateur"("mail");
