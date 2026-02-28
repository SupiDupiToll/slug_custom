ALTER TABLE "Links" ADD COLUMN "passwordHash" TEXT;

CREATE TABLE "PasswordAttempt" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "ip" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "PasswordAttempt_ip_createdAt_idx" ON "PasswordAttempt"("ip", "createdAt");
CREATE INDEX "PasswordAttempt_slug_ip_idx" ON "PasswordAttempt"("slug", "ip");
