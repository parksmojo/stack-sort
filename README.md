# 🥞 Stack Sorting Challenge

Welcome to the Stack Sorting Challenge! Inspired by the popular mobile game "Nut Sort", this problem will test your algorithmic thinking and mastery of stack manipulation.

## 🧠 Problem Description

You are given a set of stacks, each containing items of various colors. Your task is to sort the stacks so that each stack contains **only one color** (or is empty). 

You may only move items between stacks under the following constraints:

- You can move **all contiguous top items of the same color** from one stack to another.
- The destination stack must either:
  - Be empty, or
  - Have the same color on top as the items being moved.
- The destination stack must have enough room to accommodate the moved items.

Your goal is to determine the **minimum number of moves** required to sort all stacks according to these rules.

## 🔧 Function Signature

```ts
function stackSorter(stacks: Stack[]): number
```

### Parameters

- `stacks`: An array of `Stack` objects representing the current unsorted state.

### Returns

- The total number of valid moves made to sort the stacks.

## 📦 Stack Class

A `Stack` class is provided and implements the stack behavior required for this problem, including methods for peeking at the top item(s), checking capacity, and performing valid moves.

Refer to the `stack.ts` file for full details.

## 🏁 Goal

Implement `stackSorter` to solve any valid configuration using the fewest number of moves.



Good luck, and happy sorting! 🚀
