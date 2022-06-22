import { TimberNode } from "./node.js"
import corrector from "./corrector.js";
import { MAX_TOLERANCE } from "./tolerance.js";

export default class Timber {
    #root;
    #arr;
    #MAX;
    constructor() {
        this.#root = null;
        this.#arr = [];
        this.#MAX = MAX_TOLERANCE;
    }

    insert(str) {
        if(this.#root === null) {
            this.#root = new TimberNode();
        }

        this.#arr.push(str);

        let currentNode = this.#root;
        for(let i = 0, len = str.length; i < len; ++i) {
            const char = str[i];
            if(!currentNode.children.has(char)) {
                currentNode.children.set(char, new TimberNode(char));
            }
            currentNode = currentNode.children.get(char);
        }
        currentNode.isEndOfTheWord=true;
    }

    search(str) {
        if (this.#root === null) return "Trie is empty";
        let currentNode = this.#root;
        for (let i = 0, len = str.length; i < len; ++i) {
            const char = str[i];
            currentNode = currentNode?.children.get(char);
            if (currentNode === null) break;
        }
        if (currentNode?.isEndOfTheWord) {
            return str;
        }
        
        const suggestions = this.#findAllWords(str);
        const corrector = str.length > 1 && suggestions.length === 0 ? this.#corrector(str) : suggestions;
        return corrector.length > 0 ? corrector : [];
    }

    deleteString(str) {
        if (this.#root == null) {
            return;
        }
        let currentNode = this.#root;
        for (let i = 0, len = str.length; i < len; ++i) {
            const char = str[i];
            currentNode = currentNode.children.get(char);
            if (currentNode === null) {
                return;
            }
        }
        if (currentNode.isEndOfTheWord) {
            currentNode.isEndOfTheWord = false;
        }
        if (currentNode.children.size === 0) {
            return;
        }
    }

    #findAllWords(str) {
        if (this.#root === null) return "Trie is empty";
        let currentNode = this.#root;
        const result = [];
        for (let i = 0, len = str.length; i < len; ++i) {
            const char = str[i];
            if (!currentNode) return result;
            currentNode = currentNode.children.get(char);
        }
        this.#helper(currentNode, result, str.substring(0, str.length));
        return result;
    }

    #helper(currentNode, result, str) {
        if (currentNode.isEndOfTheWord) {
            return result.push(str);
        }
        for (const [key, value] of currentNode.children) {
            this.#helper(value, result, str + key);
        }
    }

    #corrector(str) {
        const result = [];
        for (let i = 0, len = this.#arr.length; i < len; ++i) {
            const word = this.#arr[i];
            const distance = corrector(str, word);
            if (distance <= this.#MAX) result.push(word);
        }
        return result;
    }
}
