with open("my_file.txt", 'w') as my_file:
    my_file.write("This is the first line\nThis is a numbers line 1233434\nPLP Academy Thank you\n")

try:
  with open("my_file.txt",'a') as my_file:
      my_file.writelines("This are extra lines\nSecond line of numbers 1223\nThis is the last line\n")
except PermissionError:
    print("Please check if the file is open")
    
try:
  with open("my_file.txt", 'r') as my_file:
      content = my_file.read()
      print(content)
except FileNotFoundError:
   print("Please check if the file exists")