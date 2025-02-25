-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assinatura" (
    "id" SERIAL NOT NULL,
    "pessoaCpf" TEXT NOT NULL,
    "dataAssinatura" TIMESTAMP(3) NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Assinatura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cpf_key" ON "Pessoa"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Assinatura_pessoaCpf_dataAssinatura_key" ON "Assinatura"("pessoaCpf", "dataAssinatura");

-- AddForeignKey
ALTER TABLE "Assinatura" ADD CONSTRAINT "Assinatura_pessoaCpf_fkey" FOREIGN KEY ("pessoaCpf") REFERENCES "Pessoa"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;
