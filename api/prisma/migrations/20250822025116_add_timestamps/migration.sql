/*
  Warnings:

  - Added the required column `updatedAt` to the `Favourite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Favourite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemonId" INTEGER NOT NULL,
    "pokemonName" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Favourite" ("id", "pokemonId", "pokemonName", "userId", "createdAt", "updatedAt") SELECT "id", "pokemonId", "pokemonName", "userId", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "Favourite";
DROP TABLE "Favourite";
ALTER TABLE "new_Favourite" RENAME TO "Favourite";
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "favouriteId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Note_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "Favourite" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("content", "favouriteId", "id", "createdAt", "updatedAt") SELECT "content", "favouriteId", "id", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
