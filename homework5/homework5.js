/*
Послуги можуть додаватися по ходу роботи:
services['Розбити скло'] = "200 грн";
=========================================================================
Створити метод price(), який обчислює та повертає загальну вартість наданих послуг.
Створити метод minPrice(), який повертає мінімальну ціну.
Створити метод maxPrice(), який повертає максимальну ціну.
*/

var barbarshop = {
  options: {
    "стрижка": "60 грн",
    "гоління": "80 грн",
    "Миття голови": "100 грн",
    //'Розбити скло' : "200 грн"
  },

  // Окремий метод для перевірки даних
  validateValues: function () {
    let values = Object.values(this.options); // Array of values: ["60 грн", "80 грн", "100 грн"]
    for (let str of values) {
      let num = Number.parseInt(str);

      // Перевіряємо, чи є закінчення "грн"
      if (!str.endsWith("грн")) {
        return false;
      } else if (!Number.isFinite(num) || !Number.isSafeInteger(num)) {
        return false;
      }
    }
    return true;
  },

  price: function () {
    let totalPrice = 0;
    let valuesObject = Object.values(this.options); // Array of values: ["60 грн", "80 грн", "100 грн"]

    if (this.validateValues()) {
      for (let i = 0; i < valuesObject.length; i++) {
        // Беремо число, ігноруючи " грн"
        let currentPrice = Number.parseInt(valuesObject[i]);

        /* 
        =========================================================================
        АБО... через split()
        // Беремо рядок -> "60 грн"
        let str = valuesObject[i]; 
            
        // Розбиваємо по пробілу: ["60", "грн"]
        let parts = str.split(' '); 
            
        // Беремо перший елемент "60" -> перетворюємо на число
        let currentPrice = Number(parts[0]);
        =========================================================================
        */

        //console.log(currentPrice);
        totalPrice += currentPrice; //Додаємо самого себе
      }

      console.log("Загальна вартість наданих послуг =", totalPrice + " грн");
      return totalPrice;
    } else {
      console.log("Помилка: один з елеменітів не є валідним");
      return null;
    }
  },

  minPrice: function () {
    if (this.validateValues()) {
      let prices = Object.values(this.options);
      //console.log(prices)
      let min = Infinity; // Починаємо з нескінченності

      for (let priceStr of prices) {
        let current = parseInt(priceStr);
        if (current < min) {
          min = current; // Оновлюємо мінімум, якщ знайшли менше число
        }
      }
      console.log("Мінімальна ціна =", min + " грн");
      return min;
    } else {
      console.log("Помилка: один з елеменітів не є валідним");
      return null;
    }
  },
  maxPrice: function () {
    if (this.validateValues()) {
      let prices = Object.values(this.options);
      //console.log(prices)
      let max = -Infinity;

      for (let priceStr of prices) {
        let current = parseInt(priceStr);
        if (current > max) {
          max = current; // Оновлюємо максимум, якщо знайшли більше число
        }
      }
      console.log("Максимальна ціна =", max + " грн");
      return max;
    } else {
      console.log("Помилка: один з елеменітів не є валідним");
      return null;
    }
  },
};

barbarshop.price();
barbarshop.minPrice();
barbarshop.maxPrice();
