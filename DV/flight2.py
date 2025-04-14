import requests
from bs4 import BeautifulSoup
import mysql.connector
from datetime import datetime
import logging
import re

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='flight_scraper.log'
)

def connect_to_database():
    """Establish database connection with error handling"""
    try:
        conn = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            password="e20211621",
            database="itcs2"
        )
        return conn
    except mysql.connector.Error as err:
        logging.error(f"Database connection error: {err}")
        return None

def extract_logo_url(row_or_cell):
    """Extract logo URL using multiple strategies"""
    # Try to find any img tag in the element
    for img in row_or_cell.select('img'):
        if img.has_attr('src'):
            src = img['src']
            # Make relative URLs absolute
            if src and not src.startswith(('http://', 'https://')):
                src = f"https://pnh.cambodia-airports.aero{src}"
            return src
            
    # Try to find background-image in style attribute
    for element in row_or_cell.select('[style]'):
        style = element.get('style', '')
        bg_match = re.search(r'background-image\s*:\s*url\([\'"]?([^\'"]+)[\'"]?\)', style)
        if bg_match:
            bg_url = bg_match.group(1)
            if bg_url and not bg_url.startswith(('http://', 'https://')):
                bg_url = f"https://pnh.cambodia-airports.aero{bg_url}"
            return bg_url
            
    return None

def scrape_flights(url):
    """Scrape flight data with improved error handling and robust logo extraction"""
    try:
        # Add headers to mimic a browser
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Find tables
        tables = soup.find_all("table")
        logging.info(f"Found {len(tables)} tables on the page")
        
        if len(tables) < 2:
            logging.error(f"Expected at least 2 tables, but found {len(tables)}")
            return [], []
        
        # Assume first table is arrivals, second is departures
        flights_arrival = process_table(tables[0], is_arrival=True)
        flights_departure = process_table(tables[1], is_arrival=False)
        
        return flights_arrival, flights_departure
        
    except requests.RequestException as e:
        logging.error(f"Request error: {e}")
        return [], []
    except Exception as e:
        logging.error(f"Scraping error: {e}")
        logging.error(traceback.format_exc())
        return [], []

def process_table(table, is_arrival=True):
    """Process a flight table and extract data with improved logo extraction"""
    flights = []
    today = datetime.today().strftime('%Y-%m-%d')
    
    try:
        logging.info(f"Processing {'arrivals' if is_arrival else 'departures'} table")
        rows = table.select("tbody tr")
        logging.info(f"Found {len(rows)} rows in the table")
        
        for i, row in enumerate(rows):
            columns = row.find_all("td")
            if len(columns) < 6:
                continue
                
            time_text = columns[1].text.strip() if len(columns) > 1 else ""
            flight_number = columns[2].text.strip() if len(columns) > 2 else ""
            location = columns[3].text.strip() if len(columns) > 3 else ""
            airline = columns[4].text.strip() if len(columns) > 4 else ""
            remark = columns[5].text.strip() if len(columns) > 5 else ""
            unnamed = columns[6].text.strip() if len(columns) > 6 else ""
            
            # Improved logo extraction - try whole row first, then individual columns
            logo_url = extract_logo_url(row)
            if not logo_url:
                for col in columns:
                    logo_url = extract_logo_url(col)
                    if logo_url:
                        break
            
            # Validate time format
            validated_time = time_text
            if not re.match(r'^\d{1,2}:\d{2}$', time_text):
                validated_time = "00:00"
                
            flights.append((
                today, 
                validated_time, 
                flight_number, 
                location,  # origin or destination based on table type
                airline, 
                remark, 
                unnamed, 
                logo_url
            ))
            
    except Exception as e:
        logging.error(f"Error processing {'arrival' if is_arrival else 'departure'} table: {e}")
        
    return flights

def append_to_database(conn, arrivals_data, departures_data):
    """Append data to database without removing old data"""
    if not conn:
        logging.error("No database connection")
        return False
        
    cursor = conn.cursor()
    try:
        # Simply append the new data - don't delete old data
        
        # Insert Arrivals
        if arrivals_data:
            arrivals_query = """
                INSERT INTO arrivales (day, time, flight_number, origin, airline, remark, unnamed, logo_url)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.executemany(arrivals_query, arrivals_data)
            logging.info(f"Inserted {cursor.rowcount} arrival records")
            print(f"Inserted {cursor.rowcount} arrival records.")
        
        # Insert Departures
        if departures_data:
            departures_query = """
                INSERT INTO departure (day, time, flight_number, destination, airline, remark, unnamed, logo_url)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.executemany(departures_query, departures_data)
            logging.info(f"Inserted {cursor.rowcount} departure records")
            print(f"Inserted {cursor.rowcount} departure records.")
            
        conn.commit()
        return True
        
    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        conn.rollback()
        return False
    finally:
        cursor.close()

def main():
    # URL for flight information
    url = "https://pnh.cambodia-airports.aero/en/flight/information-arrivals-and-departures"
    
    # Connect to database
    conn = connect_to_database()
    if not conn:
        logging.error("Failed to connect to database. Exiting.")
        return
    
    try:
        # Scrape flight data
        logging.info("Starting flight data scraping")
        arrivals_data, departures_data = scrape_flights(url)
        
        # Save to database (append only)
        if append_to_database(conn, arrivals_data, departures_data):
            print("✅ Data appended successfully!")
        else:
            print("❌ Failed to append data to database")
            
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        print(f"❌ Error: {e}")
    finally:
        if conn:
            conn.close()
            
if __name__ == "__main__":
    main()