#include <Servo.h>
#include <RFduinoBLE.h>

Servo s1;


void setup() {
  s1.attach(2);

  RFduinoBLE.advertisementInterval = 675;
  RFduinoBLE.advertisementData = "-servo";
  RFduinoBLE.begin();
}

void loop() {
  // RFduino_ULPDelay(INFINITE);
}

void RFduinoBLE_onReceive(char *data, int len){
  int servo = data[0];
  int degree = data[1];
    
  if (bitRead(servo, 1))
    s1.write(degree);

}
