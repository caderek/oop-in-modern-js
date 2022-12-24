import HealingPotion from "../inventory-items/HealingPotion.js";
import InvisibilityPower from "../powers/InvisibilityPower.js";
import FlightPower from "../powers/FlightPower.js";

const defaultStats = {
  health: 5,
  visibility: 1,
  flying: false,
};

class Player {
  #name;
  #stats;
  #powers = {};
  #inventory = [];

  constructor(name, powers, inventory, stats = {}) {
    this.#name = name;
    this.#stats = { ...defaultStats, ...stats };
    this.#inventory = inventory;

    for (const power of powers) {
      this.#powers[power.name] = power;
    }
  }

  get name() {
    return this.#name;
  }

  get health() {
    return this.#stats.health;
  }

  get powers() {
    return Object.keys(this.#powers);
  }

  get stats() {
    return { ...this.#stats };
  }

  attack(opponent) {
    opponent.dealDamage();
  }

  dealDamage() {
    this.#stats.health--;
  }

  heal() {
    const item = this.#inventory.find(
      (item) => item.type === "healing" && item.amount > 0
    );

    if (item) {
      this.#stats.health += item.use();
    }
  }

  activate(powerName) {
    const power = this.#powers[powerName];

    if (power && !power.active) {
      power.activate(this.#stats);
      console.log(`${power.name} activated`);
    }
  }
}

const Witch = (name) => {
  return new Player(name, [new FlightPower()], [new HealingPotion(3)]);
};

const Thief = (name) => {
  return new Player(name, [new InvisibilityPower()], [new HealingPotion(3)]);
};

const God = (name) => {
  return new Player(
    name,
    [new InvisibilityPower(), new FlightPower()],
    [new HealingPotion(999)],
    { health: 999 }
  );
};

export { Player, Witch, Thief, God };
