const utils = require('./utils');
const fs = require('fs');
const folder = "./agents/";
const rti = {
    agents: [],
    time: 0,
    config: {},
    init: function () {
        this.time = 0;
        this.agents = [];
        let files = fs.readdirSync(folder)
        console.log(JSON.stringify(files))
        for(let file of files)
            if (file.endsWith(".js")) {
                let agent = fs.readFileSync(folder + file, {encoding:"utf-8"});
                agent = eval(agent);
                agent.init.name = file.substr(0, file.length - 3);
                agent.init.time = this.time;
                agent.store = JSON.parse(JSON.stringify(agent.init));
                this.agents.push(agent);
            }
        for (let i = 0; i < this.agents.length; i++) {
            let agent = this.agents[i];
            agent.init.invFreq = Math.floor(1 / agent.init.frequency);
        }
        let config = fs.readFileSync(folder + "config.json", {encoding:"utf-8"});
        this.config = JSON.parse(config);
        utils.seed(this.config.seed);
    },
    next: function () {
        this.time++;
        for (let i = 0; i < this.agents.length; i++) {
            this.calcObservations(this.agents[i], this.agents);
        }
        for (let i = 0; i < this.agents.length; i++) {
            let agent = this.agents[i];
            agent.store.time = this.time;
            agent.store.angle *= 1
            agent.store.v *= 1
            agent.update(agent.store, agent.observed, utils);
            agent.store.x = utils.round1(agent.store.x);
            agent.store.y = utils.round1(agent.store.y);
            agent.store.angle = utils.round5(agent.store.angle);
            agent.store.v = utils.round5(agent.store.v);
        }
    },
    calcObservations: function (agent, list) {
        agent.observed = [];
        agent.real = [];
        if (agent.store.time % agent.init.invFreq == 0) {
            for (let i = 0; i < list.length; i++) {
                if (agent.store.name != list[i].store.name) {
                    let real = utils.observation(agent.store, list[i].store);
                    real.name = list[i].store.name;
                    agent.real.push(real);
                    let obs = JSON.parse(JSON.stringify(real));
                    const dr = utils.randomNormal(this.config.distance.mean, this.config.distance.std) * 1;
                    const ar = utils.randomNormal(this.config.peleng.mean, this.config.peleng.std) * 1;
                    obs.distance = utils.round1(obs.distance + dr);
                    obs.angle = utils.round5(obs.angle + ar);
                    agent.observed.push(obs);
                }
            }
        }
    }
}

module.exports = rti;
