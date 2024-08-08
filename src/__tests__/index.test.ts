import Levenshtein, { BestMatch, ConversationIntent, Costs } from '../index'

describe('Levenshtein class', () => {
    describe('getBestMatch function', () => {
        test('muest find the most similar option', () => {
            const options: string[] = ['danni', 'danniel', 'dani']
            const matching: string = 'danny'
            const expected: string = 'danni'
            const bestMatch: BestMatch = Levenshtein.getBestMatch(
                options,
                matching,
            )
            expect(bestMatch.text).toBe(expected)
        })
    })

    describe('getBestMatchOfArray function', () => {
        test('muest find the most similar option', () => {
            // TODO DATO CURIOSO: VEO QUE SI AGREGO UN ESPACIO EXTRA ENTRE MARIA Y JOSE, EL ALGORITMO NO ME RECONOCE COMO UN NOMBRE CORRECTO
            const conversation: ConversationIntent = {
                name: 'option1',
                text: 'option1',
                options: [
                    'Marya Jose ',
                    'Maria  Jose',
                    'Marie Jose',
                    'Maria Josei',
                ],
            }

            const conversation2: ConversationIntent = {
                name: 'option2',
                text: 'option2',
                options: [
                    'Josepth Mary',
                    'Maria Jos',
                    'Maria Josi',
                    'Maria joce',
                ],
            }

            const expected: string = 'option2'
            const array: ConversationIntent[] = [conversation, conversation2]
            const matching: string = 'Maria Jose'
            const bestMatchOfArray: BestMatch = Levenshtein.getBestMatchOfArray(
                array,
                matching,
            )
            expect(bestMatchOfArray.name).toBe(expected)
        })
    })

    describe('computePercentage function', () => {
        test.each([
            ['danny', 'danni', { inserts: 0, updates: 1, deletes: 0 }],
            ['danny', 'dann', { inserts: 0, updates: 0, deletes: 1 }],
            ['danny', 'dannyi', { inserts: 1, updates: 0, deletes: 0 }],
        ])(
            '"%s" and "%s" have an overlap of more than 80%',
            (
                word: string,
                matching: string,
                costs: Costs = { inserts: 1, updates: 1, deletes: 1 },
            ) => {
                const computePercentage: number = Levenshtein.computePercentage(
                    word,
                    matching,
                    costs,
                )

                expect(computePercentage).toBeGreaterThanOrEqual(0.8)
            },
        )
    })

    describe('computeDistance function', () => {
        test.each([
            ['danny', 'danni', 1],
            ['danny', 'danii', 2],
            ['danny', 'daiii', 3],
        ])(
            '"%s" and "%s" are %i character updated',
            (original: string, changed: string, characters: number) => {
                for (let index: number = 1; index < 10; index++) {
                    const distanceComputed: number =
                        Levenshtein.computeDistance(original, changed, {
                            inserts: 1,
                            updates: index / 10,
                            deletes: 1,
                        })
                    expect(distanceComputed.toFixed(4)).toBe(
                        ((characters * index) / 10).toFixed(4),
                    )
                }
            },
        )

        test.each([
            ['danny', 'dann', 1],
            ['danny', 'dan', 2],
            ['danny', 'da', 3],
        ])(
            '"%s" and "%s" are %i character deleted',
            (original: string, changed: string, characters: number) => {
                for (let index: number = 1; index < 10; index++) {
                    const distanceComputed: number =
                        Levenshtein.computeDistance(original, changed, {
                            inserts: 1,
                            updates: 1,
                            deletes: index / 10,
                        })
                    expect(distanceComputed.toFixed(4)).toBe(
                        ((characters * index) / 10).toFixed(4),
                    )
                }
            },
        )

        test.each([
            ['danny', 'dannyi', 1],
            ['danny', 'dannyii', 2],
            ['danny', 'dannyiii', 3],
        ])(
            '"%s" and "%s" are %i character added',
            (original: string, changed: string, characters: number) => {
                for (let index: number = 1; index < 10; index++) {
                    const distanceComputed: number =
                        Levenshtein.computeDistance(original, changed, {
                            inserts: index / 10,
                            updates: 1,
                            deletes: 1,
                        })
                    expect(distanceComputed.toFixed(4)).toBe(
                        ((characters * index) / 10).toFixed(4),
                    )
                }
            },
        )
    })
})
