-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "telephone" TEXT,
    "url" TEXT,
    "latitude" DECIMAL(8,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "what3Words" TEXT,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnPlaces" (
    "placeId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "TagsOnPlaces_pkey" PRIMARY KEY ("placeId","tagId")
);

-- AddForeignKey
ALTER TABLE "TagsOnPlaces" ADD CONSTRAINT "TagsOnPlaces_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPlaces" ADD CONSTRAINT "TagsOnPlaces_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
