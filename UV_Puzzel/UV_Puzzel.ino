
const int buttonPin = 2;
const int ledPinRed =  12;
const int ledPinGreen =  13;

// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status

void setup() {

  Serial.begin(9600);
  // initialize the LED pin as an output:
  pinMode(ledPinGreen, OUTPUT);
  pinMode(ledPinRed, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on:
    digitalWrite(ledPinRed, HIGH);
    digitalWrite(ledPinGreen, LOW);
    Serial.println("LOW");
  } else {
    // turn LED off:
    digitalWrite(ledPinGreen, HIGH);
    digitalWrite(ledPinRed, LOW);
    Serial.println("HIGH");
  }
}
