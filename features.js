// Реализовать класс Futures
class Futures {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(value) {
        if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value;
            this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
        }
    }

    reject(reason) {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.reason = reason;
            this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
        }
    }
}

Futures.prototype.then = function (onFulfilled, onRejected) {
    return new Futures((resolve, reject) => {
        if (this.state === 'fulfilled') {
            try {
                const result = onFulfilled(this.value);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        } else if (this.state === 'rejected') {
            try {
                const result = onRejected(this.reason);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        } else {
            this.onFulfilledCallbacks.push(() => {
                try {
                    const result = onFulfilled(this.value);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });

            this.onRejectedCallbacks.push(() => {
                try {
                    const result = onRejected(this.reason);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        }
    });
};



// Тест #1
const foo = new Futures(function (resolve, reject) {
    resolve(123);
});

foo.then(function (val) {
    console.log("foo.resolved:", val === 123);
}, function () {
    console.log("foo.resolved: fail");
});


// Тест #2
const bar = new Futures(function (resolve, reject) {
    setTimeout(resolve.bind(null, "fail"), 300);
    setTimeout(reject.bind(null, "ok"), 200);
});

bar.then(function () {
    console.log("bar.rejected: fail");
}, function (val) {
    console.log("bar.rejected:", val === "ok");
});
