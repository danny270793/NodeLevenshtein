/**
 * Class to create matrixes
 */
export default class Matrix {
    /**
     * Generates a matrix from given size {@link columns} x {@link rows} with a predefined value {@link value}
     *
     * @param colums number of array columns
     * @param rows number of array rows
     * @param value each value of the array
     * @returns an array of {@link columns} and {@link rows} rows where each item must be {@link value} as value
     */
    static create(colums: number, rows: number, value: number = 0): number[][] {
        const matrix: number[][] = []
        for (let index: number = 0; index < rows; index++) {
            const row: number[] = []
            for (let subindex: number = 0; subindex < colums; subindex++) {
                row.push(value)
            }
            matrix.push(row)
        }
        return matrix
    }
}
