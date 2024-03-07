import 'dart:io';

void main() {
  // Prompt the user for input
  stdout.write("Enter a number: ");

  // Read user input
  String userInput = stdin.readLineSync() ?? "";

  // Parse the input as a double
  double number = double.tryParse(userInput) ?? 0.0;

  // Check the criteria and print the appropriate message
  if (number > 10) {
    print("Your number is greater than 10");
  } else if (number < 10) {
    print("Your number is less than 10");
  } else {
    print("Your number is equal to 10");
  }
}
