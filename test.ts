import { stackSorter } from './stack-sort.ts';
import { Stack } from './stack.ts';

function test(size: number, arrs: string[][]) {
  const stacks = arrs.map(arr => new Stack(size, arr));
  const printer = new StackPrinter();

  printer.addInitial(stacks);
  stackSorter(stacks);
  printer.addResult(stacks);
  printer.print();
}

class StackPrinter {
  private initialLines: string[] = [];
  private resultLines: string[] = [];

  addInitial(stacks: Stack[]) {
    const stackArrays = stacks.map(s => s.values);
    for (let i = 0; i < stacks[0].maxHeight; i++) {
      const row: string[] = [];
      for (const stack of stackArrays) {
        row.push(stack.at(i) ?? ' ');
      }
      this.initialLines.push(row.join('|'));
    }
  }

  addResult(stacks: Stack[]) {
    const stackArrays = stacks.map(s => s.values);
    for (let i = 0; i < stacks[0].maxHeight; i++) {
      const row: string[] = [];
      for (const stack of stackArrays) {
        row.push(stack.at(i) ?? ' ');
      }
      this.resultLines.push(row.join('|'));
    }
  }

  print() {
    for (let i = this.initialLines.length - 1; i >= 0; i--) {
      console.log(
        `${this.initialLines[i]}  ${i === Math.ceil(this.initialLines.length / 2) ? '=>' : '  '}  ${this.resultLines[i]}`
      );
    }
    console.log('-----');
  }
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
