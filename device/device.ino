#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

#include <uri/UriBraces.h>
#include <uri/UriRegex.h>

// Define your WIFI_SSID, WIFI_PASSWORD in secrets.h
#include "secrets.h"

/*Defining pins. Note that the are some mismatches on Wemos D1. (the retired one, not mini)*/
#define REDPIN D7
#define GREENPIN D6
#define BLUEPIN D5

IPAddress ip(192, 168, 1, 75);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

ESP8266WebServer server(93);

void onHome()
{
    server.send(200, "text/plain", "hello world!");
}

int validColor(int color)
{
    if (color < 0)
    {
        return 0;
    }
    else if (color > 255)
    {
        return 255;
    }

    return color;
}

void writeColor(int r, int g, int b, float brightness)
{
    if (brightness < 0)
    {
        brightness = 0;
    }
    else if (brightness > 1)
    {
        brightness = 1;
    }

    // toInt defaults to 0 if no valid conversion is possible
    int rValue = validColor(r * brightness);
    int gValue = validColor(g * brightness);
    int bValue = validColor(b * brightness);
    analogWrite(REDPIN, rValue);
    analogWrite(GREENPIN, gValue);
    analogWrite(BLUEPIN, bValue);

    sendResponse(rValue, gValue, bValue, brightness);
}

void sendResponse(int r, int g, int b, float brightness)
{
    std::string responseText = "RGB LED values set to: " + std::to_string(r) + ", " + std::to_string(g) + ", " + std::to_string(b) + ", brightness " + std::to_string(brightness);

    server.send(200, "text/plain", responseText.c_str());
}

void sendBadRequestResponse()
{
    server.send(400, "text/plain", "Bad request");
}

void handleLightUpdate()
{
    // Check if body received
    if (server.hasArg("plain") == false)
    {
        sendBadRequestResponse();
        return;
    }

    StaticJsonDocument<200> jsonDoc;
    deserializeJson(jsonDoc, server.arg("plain"));

    int r = jsonDoc["r"].as<int>();
    int g = jsonDoc["g"].as<int>();
    int b = jsonDoc["b"].as<int>();
    float brightness = jsonDoc["brightness"].as<float>();

    writeColor(r, g, b, brightness);
}

void setup()
{
    pinMode(BLUEPIN, OUTPUT);
    pinMode(GREENPIN, OUTPUT);
    pinMode(REDPIN, OUTPUT);

    analogWrite(REDPIN, 0);
    analogWrite(BLUEPIN, 0);
    analogWrite(GREENPIN, 255);

    Serial.begin(115200);
    Serial.println();
    Serial.print("connecting to ");
    Serial.println(WIFI_SSID);

    WiFi.config(ip, gateway, subnet);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    server.on(F("/"), onHome);
    server.on("/lights/desk", HTTP_POST, handleLightUpdate);
    server.begin();
    Serial.println("HTTP server started");
}

void loop()
{
    server.handleClient();
}
