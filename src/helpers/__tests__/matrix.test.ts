import Matrix from '../matrix'

describe('Matrix class', () => {
    describe('create function', () => {
        test.each([
            [1, 1, 1],
            [1, 2, 2],
            [2, 1, 3],
            [2, 2, 4],
        ])(
            'should return a matrix of %sx%s with %s as value',
            (columns: number, rows: number, value: number) => {
                const matrix: number[][] = Matrix.create(columns, rows, value)
                expect(matrix.length).toBe(rows)
                expect(matrix[0].length).toBe(columns)
                matrix.forEach((rows: number[]) => {
                    rows.forEach((item: number) => {
                        expect(item).toBe(value)
                    })
                })
            },
        )
    })
})
