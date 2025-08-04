import { stackSorter } from './stack-sort.ts';
import { Stack } from './stack.ts';

function test(size: number, arrs: string[][]) {
  const stacks = arrs.map(arr => new Stack(size, arr));
  console.log('INITIAL:');
  printStacks(stacks);
  stackSorter(stacks);
  console.log('RESULT:');
  printStacks(stacks);
}

function printStacks(stacks: Stack[]) {
  const stackArrays = stacks.map(s => s.values);
  const start = stacks[0].maxHeight - 1;
  for (let i = start; i >= 0; i--) {
    const row: string[] = [];
    for (const stack of stackArrays) {
      row.push(stack.at(i) ?? ' ');
    }
    console.log(row.join('|'));
  }
  console.log('');
}

const testCases: [number, string[][]][] = [
  [
    4,
    [
      ['A', 'B'],
      ['B', 'B'],
      ['A', 'B'],
    ],
  ],
  [
    4,
    [['G', 'B', 'Y'], ['A', 'A', 'R'], ['B', 'B', 'G'], ['R', 'G', 'R'], ['Y', 'Y', 'A'], ['Y', 'G', 'A', 'B'], ['R']],
  ],
  [4, [['B', 'Y', 'B', 'Y'], ['Y', 'B', 'Y', 'B'], []]],
];

testCases.forEach(([size, arr]) => test(size, arr));
