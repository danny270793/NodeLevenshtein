# Levenshtein

[![Github pipeline status](https://github.com/danny270793/NodeLevenshtein/actions/workflows/releaser.yaml/badge.svg)](https://github.com/danny270793/NodeLevenshtein/actions/workflows/releaser.yaml)
![NPM Type Definitions](https://img.shields.io/npm/types/@danny270793/levenshtein)

[![install size](https://packagephobia.com/badge?p=@danny270793/levenshtein)](https://packagephobia.com/result?p=@danny270793/levenshtein)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/@danny270793/levenshtein)
![GitHub repo size](https://img.shields.io/github/repo-size/danny270793/NodeLevenshtein)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/danny270793/NodeLevenshtein)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@danny270793/levenshtein)

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/danny270793/NodeLevenshtein)
![NPM Downloads](https://img.shields.io/npm/dy/@danny270793/levenshtein)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/danny270793/NodeLevenshtein/total)

Library to compute levenshtein distance between strings and find more similar phrase in a list

## Instalation

Install package from public registry

```bash
npm install @danny270793/levenshtein
```

## Examples

Compute the levenshtein distance between two strings

```ts
import Levenshtein from '@danny270793/levenshtein'

const referenceWord: string = 'danny'
const valueToCompare: string = 'danni'
const computePercentage: number = Levenshtein.computePercentage(
    referenceWord,
    valueToCompare,
)
console.log(computePercentage)
```

You can customize thw weight of each type of change in a word specifying `costs`

```ts
import Levenshtein, { Costs } from '@danny270793/levenshtein'

const referenceWord: string = 'danny'
const valueToCompare: string = 'danni'
const costs: string = { inserts: 0, updates: 1, deletes: 0 }],
const computePercentage: number = Levenshtein.computePercentage(
    referenceWord,
    valueToCompare,
    costs
)
console.log(computePercentage)
```

You can provide a list of values `options` to detect which is more similar to and specific word `matching`

```ts
import Levenshtein, { Costs, BestMatch } from '@danny270793/levenshtein'

const options: string[] = ['danni', 'danniel', 'dani']
const matching: string = 'danny'
const bestMatch: BestMatch = Levenshtein.getBestMatch(options, matching)
console.log(`more similar string ${bestMatch.text}`)
console.log(`levenshtein distance of the more similar ${bestMatch.match}`)
```

## Follow me

[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/channel/UC5MAQWU2s2VESTXaUo-ysgg)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://www.github.com/danny270793/)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danny270793)

## LICENSE

[![GitHub License](https://img.shields.io/github/license/danny270793/TSFramework)](license.md)

## Version

![GitHub Tag](https://img.shields.io/github/v/tag/danny270793/NodeLevenshtein)
![GitHub Release](https://img.shields.io/github/v/release/danny270793/NodeLevenshtein)
![GitHub package.json version](https://img.shields.io/github/package-json/v/danny270793/NodeLevenshtein)
![NPM Version](https://img.shields.io/npm/v/%40danny270793%2Flevenshtein)

Last update 07/08/2024
