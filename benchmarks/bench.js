import Timber from "../utils/timber.js";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';


const trie = new Timber();

Deno.bench("Insertion", { group: "Inserting" }, () => {
    for(let i = 0; i < 1000000; i++) {
        const randomName = faker.name.firstName();
        trie.insert(randomName);
    }
    trie.insert("Wolfeschlegelsteinhausenbergerdorff");
})

Deno.bench("Searching Simon", { group: "Searching", baseline: true }, () => {
    trie.search("Simon");
});

Deno.bench("Searching Wolfeschlegelsteinhausenbergerdorff", { group: "Searching"}, () => {
    trie.search("Wolfeschlegelsteinhausenbergerdorff"); // Hubert Blaine Wolfe­schlegel­stein­hausen­berger­dorff Sr.
});

Deno.bench("Searching Anna", { group: "Searching"}, () => {
    trie.search("Anna");
});

// assuming there are both Simon and Thomas in the 1mln names list lol

Deno.bench("Deleting Simon", { group: "Deleting", baseline: true }, () => {
    trie.deleteString("Simon");
});

Deno.bench("Deleting Thomas", { group: "Deleting" }, () => { 
    trie.deleteString("Thomas");
});