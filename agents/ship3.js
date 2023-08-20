module.exports = {
    "init": {
        "x": -4000, // м
        "y": -3000, // м
        "angle": 0, // градусов относительно оси y
        "v": 10, // метров в секунду
        "color": "blue",
        "frequency": 1
    },
    "update": function (store, observed, utils) {
        if(store.time >= 50 && store.time < 80 || store.time >= 110 && store.time < 160)
            store.angle += 1; // Поворачиваем в заданные интервалы времени
        [dx, dy] = utils.linearIncrement(store.angle, store.v); // Пересчитали в приращение
        store.x += dx; // Применили приращение
        store.y += dy;
        // Содержание observed (наблюдаемых объекто) не учитывается
    }
}
