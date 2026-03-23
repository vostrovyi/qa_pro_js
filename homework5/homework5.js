/*
Послуги можуть додаватися по ходу роботи:
services['Розбити скло'] = "200 грн";
=========================================================================
Створити метод price(), який обчислює та повертає загальну вартість наданих послуг.
Створити метод minPrice(), який повертає мінімальну ціну.
Створити метод maxPrice(), який повертає максимальну ціну.
*/

var barbar = {
    options: {
        "стрижка": "60 грн",
        "гоління": "80 грн",
        "Миття голови": "100 грн",
        //'Розбити скло' : "200 грн"
    },

    price: function () {
        let totalPrice = 0;
        // Array of values: ["60 грн", "80 грн", "100 грн"]
        let valuesObject = Object.values(this.options);
        let isValid = true;

        for (let priceStr of valuesObject) {
            // Перевіряємо, чи є закінчення "грн"
            if (!priceStr.endsWith("грн")) {
                isValid = false;
                break;
            }

            // Витягуємо число для перевірки
            let num = Number.parseInt(priceStr);

            // Перевіряємо, чи число є валідне
            if (!Number.isFinite(num) || !Number.isSafeInteger(num)) // (false || false) -> повертаємо false, умова не виконується, йдемо далі.
            {isValid = false;
                break;}
        }

        if (isValid) {

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
        }
        else {
            console.log("Помилка: один з елеменітів не є валідним");
            return null;
        }
    },

    minPrice: function () {
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
    },
    maxPrice: function () {
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
    }
};

barbar.price();
barbar.minPrice();
barbar.maxPrice();