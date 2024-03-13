// Task 1
//import 'dart:html';

int addTwo(int num1, int num2) {
  return num1 + num2;
}

//Task 2
int subtractTwo(int num3, int num4) {
  return num3 - num4;
}

//Task 3
int multiplyTwo(int num5, int num6) {
  return num5 * num6;
}

//Task 4
double divideTwo(int num7, int num8) {
  return num7 / num8;
}

//Task 5
int stringLength(String string1) {
  return string1.length;
}

//Task 6
dynamic getFirstElement(List list) {
  if (list.isNotEmpty) {
    return list[0];
  } else {
    return null;
  }
}

void main() {
  print("The output for Task 1 is ${addTwo(8, 4)}");
  print("The output for Task 2 is ${subtractTwo(8, 4)}");
  print("The output for Task 3 is ${multiplyTwo(8, 4)}");
  print("The output for Task 4 is ${divideTwo(8, 4)}");
  print("The output for Task 5 is ${stringLength("Hello")}");
  print("The output for Task 6 is ${getFirstElement([8, 4, 2])}");
}
