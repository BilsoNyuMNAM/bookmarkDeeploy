-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "notecategoryId" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notecategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',

    CONSTRAINT "Notecategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_notecategoryId_fkey" FOREIGN KEY ("notecategoryId") REFERENCES "Notecategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
