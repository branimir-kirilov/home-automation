#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

#include <uri/UriBraces.h>
#include <uri/UriRegex.h>

#include <secrets.h>
// Define your WIFI_SSID, WIFI_PASSWORD in secrets.h

/*Defining pins. Note that the are some mismatches on Wemos D1. (the retired one, not mini)*/
#define REDPIN D7
#define GREENPIN D6
#define BLUEPIN D5

IPAddress ip(192, 168, 1, 75);   
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

ESP8266WebServer server(93);

void onHome() {
    server.send(200, "text/plain", "hello world!");
}

void onRgb() {
    String r = server.arg("r");
    String g = server.arg("g");
    String b = server.arg("b");
    
    int castedR = r.toInt();
    int castedG = g.toInt();
    int castedB = b.toInt();

    analogWrite(REDPIN, castedR);
    analogWrite(BLUEPIN, castedB);
    analogWrite(GREENPIN, castedG);

    server.send(200, "text/plain", "R: '" + r + "'" + "G: '" + g + "'" + "B: '" + b + "'");
}

void setup() {
    pinMode(BLUEPIN, OUTPUT);
    pinMode(GREENPIN, OUTPUT);
    pinMode(REDPIN, OUTPUT);

    analogWrite(REDPIN, 0);
    analogWrite(BLUEPIN, 0);
    analogWrite(GREENPIN, 255);
    
    Serial.begin(115200);
    Serial.println();
    Serial.print("connecting to ");
    Serial.println(ssid);
    
    WiFi.config(ip, gateway, subnet);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP()); 

    server.on(F("/"), onHome);
    server.on(F("/rgb"), onRgb);
    server.begin();
    Serial.println("HTTP server started");
}

void loop() {
    server.handleClient();
}
