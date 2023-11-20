#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <Firebase_ESP_Client.h>
#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include "secrets.h"

#define DEEP_SLEEP_INTERVAL 10800e6 // 3 * 60 * 60 sec = 3h

const int SensorPin = A0;
const int AirValue = 674;
const int WaterValue = 490;
int timestamp;
int hours, minutes, seconds;

String uid;
String databasePath;
String parentPath;
String moisturePath = "/moisture";
String sensorReadingPath = "/sensor";
String temperaturePath = "/temperature";
String humidityPath = "/humidity";
String pressurePath = "/pressure";
String timePath = "/timestamp";

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

FirebaseJson json;
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

Adafruit_BME280 bme;

void setupBME() {
  bool status = bme.begin(0x76);  
  if (!status) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }
}

void setupWifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("Connecting to WiFi!");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println("WiFi connected!");
}

void configureFirebase() {
  Serial.println("Initializing Firebase");

  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback;
  config.cert.data = rootCACert;
  fbdo.setCert(rootCACert);
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  Firebase.setDoubleDigits(5);
}

void sendDataToRTDB() {
  // Collect metrics from sensor
  int sensorReading = getSensorReading();
  int moisture = getMoisturePercent(sensorReading);
  
  // Getting uid from auth
  uid = auth.token.uid.c_str();
  
  // Database path
  databasePath = "/UsersData/" + uid + "/" + DEVICE_ID + "/readings/";
  timestamp = getEpochTime();
  parentPath = databasePath + "/" + String(timestamp);

  Serial.print("Temperature = ");
  Serial.print(bme.readTemperature());
  Serial.println(" *C");
  
  Serial.print("Pressure = ");
  Serial.print(bme.readPressure() / 100.0F);
  Serial.println(" hPa");

  Serial.print("Humidity = ");
  Serial.print(bme.readHumidity());
  Serial.println(" %");

  // Setting JSON data
  // Soil
  json.set(moisturePath.c_str(), String(moisture));
  json.set(sensorReadingPath.c_str(), String(sensorReading));
  // Ambient
  json.set(temperaturePath.c_str(), String(bme.readTemperature()));
  json.set(pressurePath.c_str(), String(bme.readPressure() / 100.0F));
  json.set(humidityPath.c_str(), String(bme.readHumidity()));
  
  Serial.printf("RTDB status: %s \n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());
}

void setup() {
  Serial.begin(115200);
  Serial.setTimeout(2000);
  while (!Serial) { }

  setupBME();

  setupWifi();

  configureFirebase();
}

void loop() {
  if (Firebase.ready()) {
    sendDataToRTDB();
    ESP.deepSleep(DEEP_SLEEP_INTERVAL);
  }
}

unsigned long getEpochTime() {
  timeClient.update();
  unsigned long now = timeClient.getEpochTime(); 
  return now;
}

int getSensorReading() {
  int sensorReading = analogRead(SensorPin);
  Serial.printf("Sensor: %d \n", sensorReading);
  return sensorReading;
}

int getMoisturePercent(int sensorReading) {
  int soilMoisturePercent = map(sensorReading, WaterValue, AirValue, 100, 0);
  if (soilMoisturePercent > 100) {
    soilMoisturePercent = 100;
  } else if (soilMoisturePercent < 0) {
    soilMoisturePercent = 0;
  }
  Serial.printf("Moist.: %d%% \n", soilMoisturePercent);
  return soilMoisturePercent;
}
