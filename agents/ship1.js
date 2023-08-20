module.exports = {
    "init": {
        "x": 0, // м
        "y": 0, // м
        "angle": 0, // градусов относительно оси y
        "v": 10, // метров в секунду
        "color": "red",
        "frequency": 1
    },
    "update": function (store, observed, utils) {
        [dx, dy] = utils.linearIncrement(store.angle, store.v); // Пересчитали в приращение
        store.x += dx; // Применили приращение
        store.y += dy;
        // Содержание observed (наблюдаемых объекто) не учитывается
    }
}
