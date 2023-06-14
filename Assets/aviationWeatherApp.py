import tkinter as tk
from tkinter import scrolledtext, Toplevel
import requests
import xml.etree.ElementTree as ET

def parse_station_identifiers(xml_data):
    root = ET.fromstring(xml_data)
    station_data = root.findall(".//station_id")
    identifiers = [station.text for station in station_data]
    return identifiers

def get_station_identifiers():
    base_url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam"
    parameters = {
        "dataSource": "stations",
        "requestType": "retrieve",
        "format": "xml"
    }
    response = requests.get(base_url, params=parameters)
    
    if response.status_code == 200:
        station_data = response.text
        identifiers = parse_station_identifiers(station_data)
        result_text = "\n".join(identifiers)
        identifiers_text.delete(1.0, tk.END)
        identifiers_text.insert(tk.END, result_text)
    else:
        identifiers_text.delete(1.0, tk.END)
        identifiers_text.insert(tk.END, "Error occurred while fetching station identifiers")

def parse_aviation_weather(xml_data):
    root = ET.fromstring(xml_data)
    metar_data = root.findall(".//METAR")
    result_text = ""

    if len(metar_data) == 0:
        result_text = "No aviation weather data available for this station."
    else:
        for metar in metar_data:
            station_id = metar.find("station_id").text
            observation_time = metar.find("observation_time").text
            temperature = metar.find("temp_c").text
            wind_direction = metar.find("wind_dir_degrees").text
            wind_speed = metar.find("wind_speed_kt").text
            weather = metar.find("flight_category").text
            visibility = metar.find("visibility_statute_mi").text

            result_text += f"Station ID: {station_id}\n"
            result_text += f"Observation Time: {observation_time}\n"
            result_text += f"Temperature: {temperature}°C\n"
            result_text += f"Wind: {wind_direction}° at {wind_speed} knots\n"
            result_text += f"Weather: {weather}\n"
            result_text += f"Visibility: {visibility} miles\n\n"

    return result_text


def get_aviation_weather():
    base_url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam"
    station = entry.get()
    parameters = {
        "dataSource": "metars",
        "requestType": "retrieve",
        "format": "xml",
        "hoursBeforeNow": "1",
        "mostRecentForEachStation": "constraint",
        "stationString": station
    }
    response = requests.get(base_url, params=parameters)
    
    if response.status_code == 200:
        weather_data = response.text
        result_text = parse_aviation_weather(weather_data)
        show_weather_data(result_text)
    else:
        result_label.config(text="Error occurred while fetching weather data")

def show_weather_data(data):
    window = Toplevel()
    window.title("Aviation Weather Data")
    
    label = tk.Label(window, text=data)
    label.pack()

# Create the main window
window = tk.Tk()
window.title("Aviation Weather App")

# Set the window size
window.geometry("400x300")

# Create GUI elements
label = tk.Label(window, text="Enter station identifier:")
label.pack()

entry = tk.Entry(window)
entry.pack()

button = tk.Button(window, text="Get Aviation Weather", command=get_aviation_weather)
button.pack()

identifiers_button = tk.Button(window, text="Get Station Identifiers", command=get_station_identifiers)
identifiers_button.pack()

identifiers_text = scrolledtext.ScrolledText(window, width=50, height=10)
identifiers_text.pack()

result_label = tk.Label(window, text="")
result_label.pack()

# Run the main window loop
window.mainloop()
