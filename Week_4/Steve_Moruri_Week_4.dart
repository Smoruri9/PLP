import 'dart:io';

// Define an interface
abstract class Animal {
  String sound();
}

// Define a base class implementing the Animal interface
class Mammal implements Animal {
  @override
  String sound() {
    return "Mammal Sound";
  }
}

// Define a derived class overriding the sound method
class Dog extends Mammal {
  @override
  String sound() {
    return "Bark";
  }
}

// Define a class that initializes data from a file
class AnimalData {
  List<String> data = [];

  AnimalData(String filename) {
    // Read data from file and initialize
    File(filename).readAsLinesSync().forEach((line) {
      data.add(line);
    });
  }
}

// Define a method demonstrating the use of a loop
void printAnimalData(List<String> data) {
  for (String item in data) {
    print(item);
  }
}

void main() {
  // Create an instance of AnimalData initialized with data from a file
  var animalData = AnimalData("animal_data.txt");

  // Demonstrate inheritance
  var dog = Dog();
  print("Dog Sound: ${dog.sound()}"); // Outputs: Bark

  // Demonstrate the use of a loop
  print("Animal Data:");
  printAnimalData(animalData.data);
}
