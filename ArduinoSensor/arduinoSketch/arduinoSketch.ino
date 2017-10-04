// sensor 1
const int trigPin = 5;
const int echoPin = 6;

// sensor 2
const int trigPin2 = 10;
const int echoPin2 = 11;

// defines variables
long duration;
int distance;

void setup() {
//sensrot 1 setup
pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
pinMode(echoPin, INPUT); // Sets the echoPin as an Input

pinMode(trigPin2, OUTPUT);
pinMode(echoPin2, INPUT);

//sensor
Serial.begin(9600); // Starts the serial communication
}
void loop() {

// SENSOR 1 
delay(2000);
// Clears the trigPin
digitalWrite(trigPin, LOW);
delayMicroseconds(2);
// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds
duration = pulseIn(echoPin, HIGH);
// Calculating the distance
distance= (duration*0.034*0.393701)/2;
// Prints the distance on the Serial Monitor
Serial.print("Sensor 1 Distance: ");
Serial.println(distance);

// SENSOR 2
delay(2000);
// Clears the trigPin
digitalWrite(trigPin2, LOW);
delayMicroseconds(2);
// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin2, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin2, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds
duration = pulseIn(echoPin2, HIGH);
// Calculating the distance
distance= (duration*0.034*0.393701)/2;
// Prints the distance on the Serial Monitor
Serial.print("Sensor 2 Distance: ");
Serial.println(distance);
}
