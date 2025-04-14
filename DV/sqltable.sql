use itcs2;
CREATE TABLE arrivales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day DATE,
    time TIME,
    flight_number VARCHAR(20),
    origin VARCHAR(100),
    airline VARCHAR(100),
    remark varchar(100),
    unnamed varchar(100),
    logo_url TEXT,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE departure (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day DATE,
    time TIME,
    flight_number VARCHAR(20),
    destination VARCHAR(100),
    airline VARCHAR(100),
    remark varchar(100),
    unnamed varchar(100),
    logo_url TEXT,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);