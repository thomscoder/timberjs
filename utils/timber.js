import { TimberNode } from "./node.js"

export default class Timber {
    #root;
    constructor() {
        this.#root = null;
    }

    #getIndex(char) {
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
        return index;
    }

    insert(str) {
        if(this.#root === null) {
            this.#root = new TimberNode();
        }

        let currentNode = this.#root;
        for(let i = 0, len = str.length; i < len; ++i) {
            const char = str[i];
            const index = this.#getIndex(char);
            if(!currentNode.children.has(index)) {
                currentNode.children.set(index, new TimberNode());
            }
            currentNode = currentNode.children.get(index);
        }
        currentNode.isEndOfTheWord=true;
    }

    search(str) {
        if (this.#root === null) return "Trie is empty";
        let currentNode = this.#root;
        for (let i = 0, len = str.length; i < len; ++i) {
            const char = str[i];
            const index = this.#getIndex(char);
            currentNode = currentNode?.children.get(index);
            if (currentNode === null) break;
        }
        return currentNode?.isEndOfTheWord ? str : "Not found";
    }

    deleteString(str) {
        if (this.#root == null) {
            return;
        }
        let currentNode = this.#root;
        for (let i = 0, len = str.length; i < len; ++i) {
            const char = str[i];
            const index = this.#getIndex(char);
            currentNode = currentNode.children.get(index);
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
}
