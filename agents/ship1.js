let debug = require('debug')('ship-simulator:ship1');
module.exports = {
    "init": {
        "x": 0, // м
        "y": 0, // м
        "angle": 0, // градусов относительно оси y
        "v": 10, // метров в секунду
        "length": 250, // длина в метрах
        "color": "red",
        "frequency": 1
    },
    "update": function (store, observed, utils) {
        // [dx, dy] = utils.linearIncrement(store.angle, store.v); // Пересчитали в приращение
        // store.x += dx; // Применили приращение
        // store.y += dy;
        [dAngle, dx, dy] = utils.rotate(false, store);
        store.angle += dAngle;
        store.x += dx;
        store.y += dy;
        // Содержание observed (наблюдаемых объектов) не учитывается
        debug(JSON.stringify(observed)); // Вывод observed в консоль сервера в режиме отладки
    }
}
