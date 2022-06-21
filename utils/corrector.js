import { buildGrid } from './grid.js'

const corrector = (firstString, secondString) => {

    const firstStringLen = firstString.length;
    const secondStringLen = secondString.length;
    const grid = buildGrid(firstStringLen, secondStringLen);

    for (let i = 1; i < firstStringLen + 1; ++i) {
        for (let j = 1; j < secondStringLen + 1; ++j) {
            if (firstString[i - 1] === secondString[j - 1]) {
                grid[i][j] = grid[i - 1][j - 1];
            } else {
                grid[i][j] = 1 + Math.min(grid[i - 1][j - 1], grid[i - 1][j], grid[i][j - 1]);
            } // endif
        } // for of secondString
    } // for of firstString

    return grid[firstStringLen][secondStringLen];
}

export default corrector;