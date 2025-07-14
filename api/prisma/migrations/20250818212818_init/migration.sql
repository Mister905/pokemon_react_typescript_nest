-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Favourite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemonId" INTEGER NOT NULL,
    "pokemonName" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "favouriteId" INTEGER NOT NULL,
    CONSTRAINT "Note_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "Favourite" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
