module.exports = {
    "init": {
        "x": 10000, // м
        "y": 10000, // м
        "angle": 270, // градусов относительно оси y
        "v": 5, // метров в секунду
        "color": "black",
        "frequency": 1
    },
    "update": function (store, observed, utils) {
        [dx, dy] = utils.linearIncrement(store.angle, store.v); // Пересчитали в приращение
        store.x += dx; // Применили приращение
        store.y += dy;
        // Содержание observed (наблюдаемых объектов) не учитывается
    }
}
