/*
Послуги можуть додаватися по ходу роботи:
services['Розбити скло'] = "200 грн";
*/

/*
Створити метод price(), який обчислює та повертає загальну вартість наданих послуг.
Створити метод minPrice(), який повертає мінімальну ціну.
Створити метод maxPrice(), який повертає максимальну ціну.
*/

var barbar = {
  options: {
    "стрижка": "60 грн",
    "гоління": "80 грн",
    "Миття голови": "100 грн",

    price: function () {
      let totalPrice = 0;

      //console.log("Main option: " + barbar.options.teacher);
    },
    minPrice: function () {},
    maxPrice: function () {},
  },
};

barbar.price();
