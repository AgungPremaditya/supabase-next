ALTER TABLE products
ADD COLUMN purchase_price decimal(10, 2) NOT NULL DEFAULT 0,
    ADD COLUMN selling_price decimal(10, 2) NOT NULL DEFAULT 0;
UPDATE products
SET purchase_price = price,
    selling_price = price;
ALTER TABLE products DROP COLUMN price;