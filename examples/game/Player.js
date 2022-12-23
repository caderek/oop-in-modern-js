class InvisibilityPower {
  #active = false;
  #name = "invisibility";

  get name() {
    return this.#name;
  }

  get active() {
    return this.#active;
  }

  activate(stats) {
    this.#active = true;
    stats.visibility = 0;

    setTimeout(() => {
      this.#active = false;
      stats.visibility = 1;
    }, 5000);
  }
}

class FlightPower {
  #active = false;
  #name = "flight";
  #duration = 5000; // ms

  get name() {
    return this.#name;
  }

  get active() {
    return this.#active;
  }

  activate(stats) {
    this.#active = true;
    stats.flying = true;

    setTimeout(() => {
      this.#active = false;
      stats.flying = false;
    }, this.#duration);
  }
}

class HealingPotion {
  #amount;
  #type = "healing";

  constructor(capacity) {
    this.#amount = capacity;
  }

  get amount() {
    return this.#amount;
  }

  get type() {
    return this.#type;
  }

  use() {
    if (this.#amount > 0) {
      this.#amount--;
      return 1;
    }

    return 0;
  }
}

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
