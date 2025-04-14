import requests
from bs4 import BeautifulSoup
import mysql.connector
from datetime import datetime

# 🔹 Connect to MySQL
conn = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="e20211621",
    database="ITCS2"
)
cursor = conn.cursor()

# 🔹 Target URL (both arrivals & departures are on the same page)
url = "https://pnh.cambodia-airports.aero/en/flight/information-arrivals-and-departures"

def scrape_flights(url):
    """Scrape flight data and correctly assign logos to arrivals & departures."""
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    flights_arrival = []
    flights_departure = []
    airline_logos = []  # Store all airline logos

    # 🔹 Find tables (Assuming first = arrivals, second = departures)
    tables = soup.find_all("table")  
    if len(tables) < 2:
        print("⚠️ Error: Expected two tables but found less.")
        return [], []

    # 🔹 Step 1: Scrape airline logos (from arrivals table, used for both)
    for row in tables[0].select("tbody tr"):
        columns = row.find_all("td")
        logo_url = None  # Default if no image found

        if len(columns) > 7:  
            logo_img = columns[7].find("img")
            if logo_img and "src" in logo_img.attrs:
                logo_url = logo_img["src"]
        
        airline_logos.append(logo_url)  # Store logo URLs

    # 🔹 Step 2: Scrape Arrivals Data
    for i, row in enumerate(tables[0].select("tbody tr")):
        columns = row.find_all("td")
        if len(columns) > 6:
            flights_arrival.append((
                datetime.today().strftime('%Y-%m-%d'),  # Day
                columns[1].text.strip(),  # Time
                columns[2].text.strip(),  # Flight Number
                columns[3].text.strip(),  # Origin
                columns[4].text.strip(),  # Airline
                columns[5].text.strip(),  # Remark
                columns[6].text.strip(),  # Unnamed Column
                airline_logos[i] if i < len(airline_logos) else None  # Correctly assign logo
            ))

    # 🔹 Step 3: Scrape Departures Data (Assign same logos as arrivals)
    for i, row in enumerate(tables[1].select("tbody tr")):
        columns = row.find_all("td")
        if len(columns) > 6:
            flights_departure.append((
                datetime.today().strftime('%Y-%m-%d'),  # Day
                columns[1].text.strip(),  # Time
                columns[2].text.strip(),  # Flight Number
                columns[3].text.strip(),  # Destination
                columns[4].text.strip(),  # Airline
                columns[5].text.strip(),  # Remark
                columns[6].text.strip(),  # Unnamed Column
                airline_logos[i] if i < len(airline_logos) else None  # Correctly assign logo
            ))

    return flights_arrival, flights_departure

# 🔹 Scrape Data
arrivals_data, departures_data = scrape_flights(url)

# 🔹 Insert Data into MySQL
def insert_data(table_name, columns, data):
    """Insert scraped data into the MySQL table, avoiding duplicates."""
    if not data:
        print(f"⚠️ No new data found for {table_name}.")
        return
    
    placeholders = ", ".join(["%s"] * len(columns))
    query = f"""
        INSERT INTO {table_name} ({', '.join(columns)})
        VALUES ({placeholders})
    """
    
    cursor.executemany(query, data)
    conn.commit()
    print(f"✅ Inserted {cursor.rowcount} records into {table_name}.")

# 🔹 Insert Arrivals
insert_data(
    "arrivales",
    ["day", "time", "flight_number", "origin", "airline", "remark", "unnamed", "logo_url"],
    arrivals_data
)

# 🔹 Insert Departures
insert_data(
    "departure",
    ["day", "time", "flight_number", "destination", "airline", "remark", "unnamed", "logo_url"],
    departures_data
)

# 🔹 Close Connection
cursor.close()
conn.close()
print("🚀 Scraping & Database Update Completed Successfully!")
