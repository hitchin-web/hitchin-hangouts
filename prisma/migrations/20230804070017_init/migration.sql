-- CreateTable
CREATE TABLE "Place" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "telephone" TEXT,
    "url" TEXT,
    "latitude" DECIMAL(8,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "what3Words" TEXT,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaceToTag" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaceToTag_AB_unique" ON "_PlaceToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaceToTag_B_index" ON "_PlaceToTag"("B");

-- AddForeignKey
ALTER TABLE "_PlaceToTag" ADD CONSTRAINT "_PlaceToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Place"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaceToTag" ADD CONSTRAINT "_PlaceToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
