import Timber from "../utils/timber.js";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';


const trie = new Timber();

Deno.bench("Insertion", { group: "Inserting" }, () => {
    for(let i = 0; i < 1000000; i++) {
        const randomName = faker.name.firstName();
        trie.insert(randomName);
    }
    trie.insert("Wolfeschlegelsteinhausenbergerdorff");
    trie.insert("Voldemort");
    trie.insert("Dumbledore");
})

Deno.bench("Searching", { group: "Searching", baseline: true }, () => {
    trie.search("Simon");
    trie.search("Wolfeschlegelsteinhausenbergerdorff"); // Hubert Blaine Wolfe­schlegel­stein­hausen­berger­dorff Sr.
    trie.search("Dumbledore");
});

Deno.bench("Suggesting names", { group: "Suggesting names", baseline: true},  () => {
    trie.search("Vold");
    trie.search("Wolfesch");
    trie.search("A");
})

// assuming there are both Simon and Thomas in the 1mln names list lol
Deno.bench("Deleting", { group: "Deleting", baseline: true }, () => {
    trie.deleteString("Simon");
    trie.deleteString("Thomas");
    trie.deleteString("Voldemort");
});
