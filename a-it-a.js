// Возможно ли реализовать такое?
var a = {
    value: 0,
    valueOf: function() {
        return this.value++;
    }
};


// Проверка
console.log(a == a); // true
console.log(a < a); // true
