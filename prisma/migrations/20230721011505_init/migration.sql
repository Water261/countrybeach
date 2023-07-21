-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL DEFAULT '$2a$10$OMP7ry3jH1NGAbMTO3x17OkZAe40S6nBbuR.9R.ZKV9r2VdVpgQ9K',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "shopId" TEXT NOT NULL,
    CONSTRAINT "users_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "shops" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumbers" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionExpires" BIGINT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shops_name_key" ON "shops"("name");

-- CreateIndex
CREATE UNIQUE INDEX "shops_address_key" ON "shops"("address");

-- CreateIndex
CREATE UNIQUE INDEX "shops_email_key" ON "shops"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shops_phoneNumbers_key" ON "shops"("phoneNumbers");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_key" ON "sessions"("userId");
