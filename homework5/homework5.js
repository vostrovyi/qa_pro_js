/*
Послуги можуть додаватися по ходу роботи:
services['Розбити скло'] = "200 грн";
*/

/*
Створити метод price(), який обчислює та повертає загальну вартість наданих послуг.
Створити метод minPrice(), який повертає мінімальну ціну.
Створити метод maxPrice(), який повертає максимальну ціну.
Будь ласка, надайте наступні дані для перевірки вашої роботи:
    */

var barbar = {
  стрижка: "60 грн",
  гоління: "80 грн",
  "Миття голови": "100 грн",

  teachers: {
    teacher: "Ivan",
    mentor: "Oleg",
  },
  teachersInfo: function () {
    console.log(
      "Main teacher: " +
        barbar.teachers.teacher +
        ", mentor: " +
        barbar.teachers.mentor,
    );
  },
};

barbar.teachersInfo();
