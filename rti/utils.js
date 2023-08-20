const randomNormal = require('random-normal'); // https://github.com/mock-end/random-normal
const seedrandom = require('seedrandom'); // https://www.npmjs.com/package/seedrandom
let utils = {
    seed(value) {
        seedrandom(value, { global: true });
    },
    randomNormal(mean=0, dev=1) {
        return randomNormal({mean: mean, dev: dev});
    },
    linearIncrement: function(angle, v) {
        const v0 = v;
        const angle0 = angle / 180 * Math.PI;
        return this.polarToDecart(angle0, v0)
    },
    polarToDecart: function(angle, distance) {
        return [Math.sin(angle)*distance, Math.cos(angle)*distance]
    },
    decartToPolar: function(dx, dy) {
        return [Math.sqrt(dy*dy + dx*dx), Math.atan2(dy, dx)]
    },
    observation: function(agent1, agent2) {
        // angle = arccos(dy / distance)
        const x1 = agent1.x;
        const x2 = agent2.x;
        const dx = x2 - x1;
        const y1 = agent1.y;
        const y2 = agent2.y;
        const dy = y2 - y1;
        const distance = Math.sqrt(dy*dy + dx*dx);
        const signDx = Math.sign(dx) == 0 ? 1 : Math.sign(dx)
        let polarAngle = signDx * this.safeArccos(dy / distance);
        const angle1 = agent1.angle;
        const polarAngleGrad = polarAngle * 180 / Math.PI;
        let angle = polarAngleGrad - angle1;
        if(isNaN(angle))
            angle = 0
        if(angle > 180)
            angle -= 360
        if(angle < -180)
            angle += 360
        return {"distance": distance, "angle": this.round5(angle)};
    },
    safeArccos(value) {
        if(value > 1) value = 1;
        if(value < -1) value = -1;
        const acos = Math.acos(value);
        return acos;
    },
    round5(value) {
        return Math.round(value * 100000) / 100000;
    },
    round1(value) {
        return Math.round(value * 10) / 10;
    }
}

module.exports = utils;
