import { readLines } from "https://deno.land/std@0.144.0/io/mod.ts";
import { Logger } from "https://raw.githubusercontent.com/deepakshrma/deno_util/master/logger.ts";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

import Timber from "./utils/timber.js";

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const main = async () => {
    const logger = new Logger();
    logger.info("How many elements?");
    const { value: numberOfElements } = await readLines(Deno.stdin).next();

    const timber = new Timber();
    for (let i = 0; i < Number(numberOfElements); i++) {
        const name = faker.name.firstName();
        logger.log("Inserting name %s...", name);
        timber.insert(name);
    }
    logger.warn("Populated database with %s elements...", numberOfElements);


    logger.line();
    logger.log("Search name");
    const { value: nameToSearch } = await readLines(Deno.stdin).next();
    const str = capitalize(nameToSearch);
    const result = timber.search(str);

    logger.line();
    if (Array.isArray(result)) {
        logger.info("Didn't found the name %s!\nSuggestions:", str);
        result.forEach(name => logger.warn("%s", name));
    } else {
        logger.info("Found the name %s, found %d names that start with %s", str, result.length, str);
    }
}

main();