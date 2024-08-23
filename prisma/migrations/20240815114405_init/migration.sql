-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "description" TEXT,
    "value" INTEGER,
    "rarity" TEXT,
    "image" TEXT,
    "type" TEXT,
    "count" INTEGER,
    "playerId" TEXT NOT NULL,
    CONSTRAINT "Items_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Items" ("count", "description", "id", "image", "name", "playerId", "rarity", "type", "value") SELECT "count", "description", "id", "image", "name", "playerId", "rarity", "type", "value" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "race" TEXT,
    "class" TEXT,
    "description" TEXT,
    "image" TEXT,
    "level" INTEGER,
    "strength" INTEGER,
    "dexterity" INTEGER,
    "intelligence" INTEGER,
    "wisdom" INTEGER,
    "charisma" INTEGER,
    "constitution" INTEGER,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("charisma", "class", "constitution", "description", "dexterity", "firstName", "id", "image", "intelligence", "lastName", "level", "race", "strength", "userId", "wisdom") SELECT "charisma", "class", "constitution", "description", "dexterity", "firstName", "id", "image", "intelligence", "lastName", "level", "race", "strength", "userId", "wisdom" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
