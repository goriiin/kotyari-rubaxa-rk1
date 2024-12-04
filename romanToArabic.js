// Реализовать создание следующую запись ;]
// ...

const romanToInt = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
};

function romanToArabic(roman) {
    let resultingNumber = 0;
    let previousValue = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
        const currentValue = romanToInt[roman[i]];

        if (currentValue < previousValue) {
            resultingNumber -= currentValue;
        } else {
            resultingNumber += currentValue;
        }

        previousValue = currentValue;
    }

    return resultingNumber;
}

const numberProxy = new Proxy(Number.prototype, {
    get: function(target, prop, receiver) {
        return Array.from({ length: romanToArabic(prop) }, (_, i) => i);
    }
});

// Применяем прокси к объекту Number
Object.setPrototypeOf(Number.prototype, numberProxy);

// Тестируем

console.log(0..V); // [0, 1, 2, 3, 4];
console.log(0..VII); // [0, 1, 2, 3, 4, 5, 6];

