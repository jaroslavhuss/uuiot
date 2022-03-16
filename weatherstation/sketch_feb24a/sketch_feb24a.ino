#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);
// Vars for Humidity and temperatrue
float hum;
float temp;

// Get rid of fakin delay
unsigned long previousMillis = 0;
const long interval = 60000; // A fakin minute

void setup()
{
  Serial.begin(9600);
  dht.begin();
}

void loop()
{
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval)
  {
    previousMillis = currentMillis;
    hum = dht.readHumidity();
    temp = dht.readTemperature();

    Serial.print("Vlhkost: ");
    Serial.print(hum);
    Serial.print(" %, Teplota: ");
    Serial.print(temp);
    Serial.println(" Celsius");
  }
}