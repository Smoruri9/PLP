def calculate_discount():
  price = int(input("Please enter price as a number: "))
  discount_percent = int(input("Please enter dicsount as a number: "))

  if discount_percent >= 20:
    cost = price - (price * discount_percent/100)
    print(cost)

  else:
    print(price)


calculate_discount()


  
