import { Witch, Thief, God } from "./characters/Player.js";

const p1 = Witch("Scarlet");
const p2 = Thief("Arthur");
const p3 = God("Seth");

console.log(`${p1.name}'s powers: ${p1.powers}`);
console.log(`${p2.name}'s powers: ${p2.powers}`);
console.log(`${p3.name}'s powers: ${p3.powers}`);

console.log("-------------------");

p1.activate("flight");
p2.activate("invisibility");

console.log("-------------------");

console.log(`${p2.name}'s health: ${p2.health} (before being attacked)`);

p1.attack(p2);
console.log(`${p2.name}'s health: ${p2.health} (after being attacked)`);

p1.attack(p2);
console.log(`${p2.name}'s health: ${p2.health} (after being attacked)`);

p2.heal();
console.log(`${p2.name}'s health: ${p2.health} (after healing)`);

console.log("-------------------");

console.log(`${p3.name}'s health: ${p3.health}`);
