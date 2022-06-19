import { assertEquals } from "https://deno.land/std@0.144.0/testing/asserts.ts";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import Timber from "../utils/timber.js";

const trie = new Timber();

trie.insert("Thomas");
for(let i = 0; i < 1000000; i++) {
    const randomName = faker.name.firstName();
    trie.insert(randomName);
}

Deno.test("Search", () => {
    assertEquals(trie.search("Thomas"), "Thomas");
})

Deno.test("Deletion", () => {
    trie.deleteString("Thomas");
    assertEquals(trie.search("Thomas"), "Not found");
})