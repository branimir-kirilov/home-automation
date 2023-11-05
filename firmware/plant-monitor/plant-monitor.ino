#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <Firebase_ESP_Client.h>
#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
#include "secrets.h"
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define MAX_LINES 3
#define PIN_RESET 255
#define DC_JUMPER 0

const int SensorPin = A0;
const int AirValue = 674;
const int WaterValue = 490;

String logLines[MAX_LINES];
int currentLine = 0;

unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay = 30 * 60 * 1000;
unsigned long count = 0;
int timestamp;

String uid;
String databasePath;
String parentPath;
String moisturePath = "/moisture";
String sensorReadingPath = "/sensor";
String timePath = "/timestamp";

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

FirebaseJson json;
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void initializeOledAndShowStartupScreen() {
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for (;;);
  }
  delay(2000);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 10);
  display.println("Display initialized!");
  display.display();
  delay(2000);
  display.clearDisplay();
}

void setup() {
  Serial.begin(115200);
  initializeOledAndShowStartupScreen();
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  logMessage("Connecting to WiFi!");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  logMessage("WiFi connected!");
  logMessage("Starting Firebase connection");
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

int hours, minutes, seconds;

void logMessage(const char* format, ...) {
  va_list args;
  va_start(args, format);
  timeClient.update();
  hours = timeClient.getHours();
  minutes = timeClient.getMinutes();
  seconds = timeClient.getSeconds();
  char buffer[128];
  vsnprintf(buffer, sizeof(buffer), format, args);
  String logMessage = "[" + String(hours) + ":" + String(minutes) + "] " + String(buffer);
  currentLine = (currentLine + 1) % MAX_LINES;
  logLines[currentLine] = logMessage;
  display.clearDisplay();
  for (int i = 0; i < MAX_LINES; i++) {
    int lineIndex = (currentLine - i + MAX_LINES) % MAX_LINES;
    display.setCursor(0, i * 16);
    display.println(logLines[lineIndex]);
  }
  display.display();
  va_end(args);
  Serial.println(logMessage);
}

void loop() {
  if (Firebase.ready() && (millis() - sendDataPrevMillis > timerDelay || sendDataPrevMillis == 0)) {
    int sensorReading = getSensorReading();
    int moisture = getMoisturePercent(sensorReading);
    logMessage("Getting User UID");
    uid = auth.token.uid.c_str();
    logMessage("User UID: %d\n", uid);
    databasePath = "/UsersData/" + uid + "/readings";
    sendDataPrevMillis = millis();
    timestamp = getTime();
    parentPath = databasePath + "/" + String(timestamp);
    json.set(moisturePath.c_str(), String(moisture));
    json.set(sensorReadingPath.c_str(), String(sensorReading));
    json.set(timePath, String(timestamp));
    logMessage("Moisture %d\n", moisture);
    logMessage("Sensor Reading %d\n", sensorReading);
    logMessage("Set json... %s\n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());
  }
}

unsigned long getTime() {
  timeClient.update();
  unsigned long now = timeClient.getEpochTime();
  return now;
}

int getSensorReading() {
  int sensorReading = analogRead(SensorPin);
  Serial.print("SensorReading: ");
  Serial.println(sensorReading);
  return sensorReading;
}

int getMoisturePercent(int sensorReading) {
  int soilMoisturePercent = map(sensorReading, WaterValue, AirValue, 100, 0);
  if (soilMoisturePercent > 100) {
    soilMoisturePercent = 100;
  } else if (soilMoisturePercent < 0) {
    soilMoisturePercent = 0;
  }
  Serial.print("Moisture: ");
  Serial.println(soilMoisturePercent);
  return soilMoisturePercent;
}
