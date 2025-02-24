-- CreateTable
CREATE TABLE "Assinatura" (
    "id" SERIAL NOT NULL,
    "clienteCpf" TEXT NOT NULL,
    "dataAssinatura" TIMESTAMP(3) NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Assinatura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assinatura_clienteCpf_dataAssinatura_key" ON "Assinatura"("clienteCpf", "dataAssinatura");

-- AddForeignKey
ALTER TABLE "Assinatura" ADD CONSTRAINT "Assinatura_clienteCpf_fkey" FOREIGN KEY ("clienteCpf") REFERENCES "Cliente"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;
