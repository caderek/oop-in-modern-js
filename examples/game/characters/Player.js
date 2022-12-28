import HealingPotion from "../inventory-items/HealingPotion.js";
import InvisibilityPower from "../powers/InvisibilityPower.js";
import FlightPower from "../powers/FlightPower.js";

const defaultStats = {
  health: 5,
  visibility: 1,
  flying: false,
};

/**
 * The main idea here is to use composition and dependency injection,
 * to make the Player class flexible, and maintain the separation od concerns.
 *
 * What it means, is that instead of incorporating the powers
 * into player character itself, we make them their own things that the player HAS,
 * and can USE. That way we can add new powers (i.e. player can learn / buy new abilities).
 * All it takes is adding a new method like `addPower`. I made `#powers` an objet,
 * fo fast access by key name.
 *
 * Similarly, we make inventory items their own thing.
 * Healing potion is NOT a property of the player, player can HAVE a healing potion
 * in his inventory, so we have a "has a" relationship, a.k.a. composition.
 * I made `#inventory` an array, because unlike the powers, player can have
 * multiple items of the same type (for example multiple healing potions).
 *
 * I made `#stats` an object, instead separate properties for health, visibility, speed etc.,
 * so it's easier to pass it around (for example so the abilities can modify them),
 * and serialize it (for example to save the state of the game).
 *
 * Last, but not least,we pass all dependencies, as well as initial stats via constructor.
 * That way we can:
 * - create different types of players easily, without object merging / inheritance,
 * - recreate objects easily (say we saved a game after the player took damage,
 *   so its initial stats will be different than a fresh player),
 * - further develop each ability and items independently.
 */
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

  /*
  This part is not necessary, we can use the Player class as-is,
  but it's nice to have this type of static methods as a shorthand
  to create common types of players easily.
  */
  static createWitch(name) {
    return new Player(name, [new FlightPower()], [new HealingPotion(3)]);
  }

  static createThief(name) {
    return new Player(name, [new InvisibilityPower()], [new HealingPotion(3)]);
  }

  static createGod(name) {
    return new Player(
      name,
      [new InvisibilityPower(), new FlightPower()],
      [new HealingPotion(999)],
      { health: 999 }
    );
  }
}

export default Player;
