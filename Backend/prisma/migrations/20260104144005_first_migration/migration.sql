-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "CategoryName" TEXT NOT NULL DEFAULT 'no category',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "CategoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_CategoryName_key" ON "Category"("CategoryName");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
