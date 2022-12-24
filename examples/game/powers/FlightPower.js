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

export default FlightPower;
