import Matrix from './helpers/matrix'

export interface Costs {
    inserts: number
    updates: number
    deletes: number
}

export interface BestMatch {
    text: string
    name: string
    match: number
}

export type ConversationIntent = {
    text: string
    name: string
    options: string[]
}

export default class Levenshtein {
    static matrix(word: string, matching: string, costs: Costs): number[][] {
        const rows: number = word.length + 1
        const cols: number = matching.length + 1

        const matrix: number[][] = Matrix.create(cols, rows, 0)
        for (let row: number = 0; row < rows; row++) {
            matrix[row][0] = row * costs.deletes
        }
        for (let col: number = 0; col < cols; col++) {
            matrix[0][col] = col * costs.inserts
        }

        for (let col: number = 1; col < cols; col++) {
            for (let row: number = 1; row < rows; row++) {
                const cost: number =
                    word[row - 1] === matching[col - 1] ? 0 : costs.updates

                const deleteCost: number = matrix[row - 1][col] + costs.deletes
                const insertCost: number = matrix[row][col - 1] + costs.inserts
                const substitutionCost: number = matrix[row - 1][col - 1] + cost

                matrix[row][col] = Math.min(
                    deleteCost,
                    insertCost,
                    substitutionCost
                )
            }
        }

        return matrix
    }

    static computeDistance(
        word: string,
        matching: string,
        costs: Costs = { inserts: 1, updates: 1, deletes: 1 }
    ): number {
        const matrix: number[][] = Levenshtein.matrix(word, matching, costs)
        return matrix[matrix.length - 1][matrix[0].length - 1]
    }

    static computePercentage(
        word: string,
        matching: string,
        costs: Costs = { inserts: 1, updates: 1, deletes: 1 }
    ): number {
        return (
            1 -
            Levenshtein.computeDistance(word, matching, costs) /
                Math.max(word.length, matching.length)
        )
    }
    static getBestMatch(
        options: string[],
        matching: string,
        costs: Costs = { inserts: 1, updates: 1, deletes: 1 }
    ): BestMatch {
        const bestMatch: BestMatch = {
            text: '',
            name: '',
            match: 0,
        }
        options.forEach((option: string) => {
            const percentage: number = Levenshtein.computePercentage(
                option,
                matching,
                costs
            )
            if (percentage >= bestMatch.match) {
                bestMatch.text = option
                bestMatch.match = percentage
            }
        })
        return bestMatch
    }

    static getBestMatchOfArray(
        array: ConversationIntent[],
        matching: string
    ): BestMatch {
        const bestMatch: BestMatch = {
            text: '',
            name: '',
            match: 0,
        }
        array.forEach((value: ConversationIntent) => {
            value.options.forEach((option) => {
                const percentage: number = Levenshtein.computePercentage(
                    option,
                    matching.toLowerCase()
                )
                if (percentage >= bestMatch.match) {
                    bestMatch.match = percentage
                    bestMatch.name = value.name
                    bestMatch.text = value.text
                }
            })
        })
        return bestMatch
    }

    /*static getBestMatchOfArrayWhitExit(array: {text:string, value: string, options:string[]}[], matching: string): BestMatch {
        const bestMatch: BestMatch = {
            option: '',
            text: '',
            value: '',
            match: 0
        }
        array.push({text:"cancelar", value:"exit", options:[
            'deseo salir', 'cancelar', 'ya no quiero seguir', 'no quiero continuar'
        ]})
        array.forEach((values: {text:string, value: string, options:string[]}) => {
            values.options.forEach(option => {
                const percentage: number = Levenshtein.compute(option, matching)
                if(percentage >= bestMatch.match) {
                    bestMatch.option = option
                    bestMatch.match = percentage
                    bestMatch.value = values.value
                    bestMatch.text = values.text
                }
            });
        })
        Conversation.create(matching, bestMatch, array, Date.now())
        return bestMatch
    }*/
}
