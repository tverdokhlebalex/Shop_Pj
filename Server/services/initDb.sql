USE ProductsApplication;
CREATE TABLE IF NOT EXISTS products (
	product_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) DEFAULT NULL,
	description TEXT,
    price DECIMAL(10,2),
    PRIMARY KEY (product_id)
);
CREATE TABLE IF NOT EXISTS comments (
	id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
CREATE TABLE IF NOT EXISTS images (
	id VARCHAR(36) NOT NULL,
    url VARCHAR(255) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    main BOOL NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);