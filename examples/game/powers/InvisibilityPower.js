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

export default InvisibilityPower;
