#include <SPI.h>
#include <MFRC522.h>
 
#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);

const int ledPinRed =  2;
const int ledPinGreen =  3;

 
void setup() 
{
  Serial.begin(9600);
  pinMode(ledPinGreen, OUTPUT);
  pinMode(ledPinRed, OUTPUT);
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println("NFC scannen / vormpuzzel...");
  Serial.println();

}
void loop() 
{
  
  if ( ! mfrc522.PICC_IsNewCardPresent() ) 
  { 
    return;
  }
    

  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }

  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  delay(1000);
  content.toUpperCase();
  
  if (content.substring(1) == "25 9B 01 6D")
  {
    digitalWrite(ledPinGreen, HIGH);
    digitalWrite(ledPinRed, LOW);
  }

    if (content.substring(1) == "E7 8F 71 85")
  {
    digitalWrite(ledPinGreen, LOW);
    digitalWrite(ledPinRed, HIGH);
  }



} 
