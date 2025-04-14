use itcs2;
SELECT * FROM itcs2.departure;
SELECT * FROM itcs2.arrivales;
-- TRUNCATE TABLE arrivales;
-- TRUNCATE TABLE departure;

-- SELECT * FROM arrivales 
-- INTO OUTFILE '/var/lib/mysql-files/arrivales_export.csv'
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"' 
-- LINES TERMINATED BY '\n';

SELECT * FROM departure WHERE scraped_at < "2025-04-02 03:00:00";

SET SQL_SAFE_UPDATES = 0;

DELETE FROM departure WHERE scraped_at < "2025-04-02 03:00:00";

SET SQL_SAFE_UPDATES = 1;

ALTER TABLE departure AUTO_INCREMENT = 1;
SET @new_id = 0;
UPDATE departure SET id = (@new_id := @new_id + 1);


