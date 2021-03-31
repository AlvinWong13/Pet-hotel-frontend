-- Create db `pethotel`
-- TABLES
CREATE TABLE "owners" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "pets" (
  "id" SERIAL PRIMARY KEY,
  "owner_id" INT NOT NULL REFERENCES "owners" ON DELETE CASCADE,
  "name" VARCHAR(255) NOT NULL,
  "breed" VARCHAR(255),
  "color" VARCHAR(255),
  "checkin" DATE
);

-- Test Data
INSERT INTO "owners" ("name")
VALUES ('Alvin'), ('Johnny'), ('Vada');
INSERT INTO "pets" ("owner_id", "name", "breed", "color")
VALUES ('3', 'Ender', 'Silken', 'Black'),
        ('3', 'Frida', 'Lurcher', 'Silver'),
        ('1', 'Mochi', 'Tabby', 'Orange'),
        ('2', 'Taz', 'Min Pin', 'Brown');