void main() {
  //1. Number
  //Number data types are used to store numeric values in dart.
  //both int and double are subtypes of num where int stores whole numbers
  //while double stores decimal numbers
  num num1 = 50;
  int int1 = 5;
  double double1 = 50.5;

  print("num1 is $num1");
  print("int1 is $int1");
  print("double is $double1");

  //2.Strings
  //Strings store text data in the program. One can use either single or double quotes.

  String name = "Steve";
  String name1 = 'PLP';

  print("$name is a string data type same as $name1");

  //3.Booleans
  //These data types hold either true or false
  bool status = true;
  print("Single status: $status");

  //4.Lists
  //This is the ordered collection of objects.

  List<String> cities = ['Nairobi', 'Kampala', 'Lagos'];
  print("This value type is list $cities");

  //5.Maps
  //This is a collection that represents a set of values as key-value pairs.
  Map<String, int> ages = {
    'Alice': 30,
    'Bob': 25,
    'Charlie': 35,
  };

  print("Ages of students: $ages");

  //6.Runes
  //This is an integer used to represent any unicode code point.

  String runesString = "These are Runes in Dart: \u{1F600} \u{1F64B} \u{1F680}";

  print(runesString);
}
