/*
Опис ДЗ: Напишіть регулярний вираз, який знайде послідовність з шести або більше символів, які не містять літери «А» (великої або малої)
Приклад виконання:
Повинен знаходити: Wonderful, Joyful
Не повинен знаходити: Happiness, Time, Task, Apple
*/

let str = "Wonderful, Joyful, Happiness, Time, Task, Apple";
console.log(str);

let re = /(^|[\s])[^aA\s,]{6,}/g
console.log(str.match(re));
console.log(re.test(str));
