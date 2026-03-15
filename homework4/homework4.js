/*
буде генерувати певну кількість випадкових чисел в діапазоні від 100 до 1000 включно. Порахувати кількість парних та непарних серед них. Обчислити відсоткове співвідношення - чи буде воно близьке до 50%50? Приклад функції checkProbabilityTheory(count). Парметр count буде вказувати скільки разів буде генеруватися випадкове число.

- Функція виводить інформацію
- Кількість згенерованих чисел: кількість чисел
- Парних чисел: кількість парних чисел
- Не парних чисел: кількість не парних чисел
- Відсоток парних до не парних:
*/

function randomGeneratorFrom100To1000(times) {
  const num = Number(times);
  if (Number.isSafeInteger(num) && num > 0) {
    let evenCount = 0;
    let oddCount = 0;

    for (let i = 0; i < num; i++) {
      let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
      console.log("Згенероване нове число:\n" + randomNumber);
      if (randomNumber % 2 === 0) {
        evenCount++;
      } else {
        oddCount++;
      }
    }

    console.log(`Кількість згенерованих чисел: ${num}`);
    console.log(`Парних чисел: ${evenCount}`);
    console.log(`Не парних чисел: ${oddCount}`);
    console.log(`Відсоток парних до не парних: ${(evenCount / num * 100).toFixed(2)}%`);
  } else {
    console.error("Введене значення НЕ є допустимим цілим числом");
  }
}

randomGeneratorFrom100To1000("s");
