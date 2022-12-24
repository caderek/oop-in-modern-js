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

export default HealingPotion;
