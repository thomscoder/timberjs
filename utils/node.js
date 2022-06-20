export class TimberNode {
    constructor(data) {
        this.children = new Map();
        this.isEndOfTheWord = false;
        this.data = data;
    }
}