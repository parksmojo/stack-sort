import { stackSorter } from './stack-sort.ts';
import { Stack } from './stack.ts';

function test(stacks: Stack[]) {
  console.log('INITIAL:');
  printStacks(stacks);
  stackSorter(stacks);
  console.log('RESULT:');
  printStacks(stacks);
}

function printStacks(stacks: Stack[]) {
  const start = stacks[0].maxHeight - 1;

  for (let i = start; i >= 0; i--) {
    const row: string[] = [];
    for (const stack of stacks) {
      row.push(stack.values.at(i) ?? ' ');
    }
    console.log(row.join('|'));
  }
  console.log('');
}

const max = 5;
test([new Stack(max, ['A', 'B'] as const), new Stack(max, ['A', 'B'] as const), new Stack(max, ['A', 'B'] as const)]);
