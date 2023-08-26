-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "openingTimes" TEXT;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToPlace" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPlace_AB_unique" ON "_CategoryToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPlace_B_index" ON "_CategoryToPlace"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToPlace" ADD CONSTRAINT "_CategoryToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPlace" ADD CONSTRAINT "_CategoryToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "Place"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
