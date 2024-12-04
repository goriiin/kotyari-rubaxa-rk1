Object.defineProperty(Array.prototype, 'size', {
    get: function() {
        return this.reduce((size) => {
            return size + 1
        }, 0);
    },

    set: function (value) {
        if (typeof value !== 'number' || value < 0) {
            throw new Error('Argument is not a number or less than 0')
        }
        const diff = value - this.size
        if (diff > 0) {
            for (let i = this.size; i < value; i++) {
                this.push(undefined)
            }
            return
        }
        this.splice(value)

    }
});

// #1
console.log([0, 1].size); // 2

// #2
let arr = [0, 1, 2];
arr.size = 0;
console.log(arr); // []
