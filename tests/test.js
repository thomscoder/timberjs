import { assertEquals, assertNotEquals, assertArrayIncludes } from "https://deno.land/std@0.144.0/testing/asserts.ts";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import Timber from "../utils/timber.js";
import corrector from "../utils/corrector.js";

const trie = new Timber();

trie.insert("Thomas");
trie.insert("Voldemort");
trie.insert("Wolfeschlegelsteinhausenbergerdorff");
for(let i = 0; i < 1000000; i++) {
    const randomName = faker.name.firstName();
    trie.insert(randomName);
}

Deno.test("Search", () => {
    assertEquals(trie.search("Thomas"), "Thomas");
    assertEquals(trie.search("asdncla"), []);
})

Deno.test("Suggest", () => {
    assertArrayIncludes(trie.search("Wolfesch"), ["Wolfeschlegelsteinhausenbergerdorff"]);
    
    assertArrayIncludes(trie.search("Vold"), ["Voldemort"]);
})

Deno.test("Deletion", () => {
    trie.deleteString("Thomas");
    assertNotEquals(trie.search("Thomas"), "Thomas");
})

Deno.test("Corrector", () => {
    assertEquals(corrector("horse", "rose"), 2);
    assertEquals(corrector("jrok", "trek"), 2);
})