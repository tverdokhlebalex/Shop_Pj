export const COMMENT_DUPLICATE_QUERY = `
  SELECT * FROM comments c
  WHERE LOWER(c.email) = ?
  AND LOWER(c.name) = ?
  AND LOWER(c.body) = ?
  AND c.product_id = ?
`;

export const INSERT_COMMENT_QUERY = `
  INSERT INTO comments
  (comment_id, email, name, body, product_id)
  VALUES
  (?, ?, ?, ?, ?)
`;

export const INSERT_PRODUCT_QUERY = `
  INSERT INTO products
  (product_id, title, description, price)
  VALUES
  (?, ?, ?, ?)
`;

export const INSERT_PRODUCT_IMAGES_QUERY = `
  INSERT INTO images
  (image_id, url, product_id, main)
  VALUES ?
`;

export const DELETE_IMAGES_QUERY = `
  DELETE FROM images 
  WHERE image_id IN ?;
`;

export const REPLACE_PRODUCT_THUMBNAIL = `
  UPDATE images
  SET main = CASE
    WHEN image_id = ? THEN 0
    WHEN image_id = ? THEN 1
    ELSE main
END
WHERE image_id IN (?, ?);
`;

export const UPDATE_PRODUCT_FIELDS = `
    UPDATE products 
    SET title = ?, description = ?, price = ? 
    WHERE product_id = ?
`;

export const FIND_PROJECT_BY_ID = `SELECT * FROM products WHERE product_id = ?`;

export const SELECT_SIMILAR_PRODUCTS = `
    SELECT products.* FROM similar
    JOIN products ON item2 = products.product_id
    WHERE item1 = ?
`;

export const SELECT_OTHER_PRODUCTS = `
    SELECT * FROM products
    WHERE product_id != ?
`;

export const SELECT_OTHER_PRODUCTS_WITHOUT_SIMILAR = `
    SELECT * FROM products
    WHERE product_id != ? AND product_id NOT IN ?
`;

export const FIND_DUPLICATED_SIMILAR_PRODUCTS = `
    SELECT * FROM similar
    WHERE item1 = ?
    AND item2 = ?
`;

export const INSERT_SIMILAR_PRODUCT = `
    INSERT INTO similar
    (item1, item2)
    VALUES ?
`;

export const DELETE_PRODUCTS_FROM_SIMILAR = `
    DELETE FROM similar 
    WHERE item1 IN ? OR item2 IN ?;
`;

export const DELETE_SIMILAR_PRODUCTS = `
    DELETE FROM similar 
    WHERE item1 = ? AND item2 IN ?;
`;
