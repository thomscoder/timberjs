export const buildGrid = (firstStringLen, secondStringLen) => {
    const grid = [];

    for (let i = 0; i < firstStringLen + 1; ++i ) {
        const row = [];

        for (let j = 0; j < secondStringLen + 1; ++j) {
            row.push(j);
        }
        
        row[0] = i;
        grid.push(row);
    }

    return grid;
}