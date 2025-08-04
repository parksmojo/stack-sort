import { Stack } from './stack.ts';
import { stackSorter } from './stack-sort.ts';

export function testFunc(arrs: string[][]) {
  const stacks = arrs.map(arr => new Stack(4, arr));
  const printer = new StackPrinter();

  printer.addInitial(stacks);
  const result = stackSorter(stacks);
  printer.addResult(stacks);
  printer.print(result);
}

export class StackPrinter {
  private initialLines: string[] = [];
  private resultLines: string[] = [];
  private pass: boolean = false;

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
    this.pass = checkSorted(stacks);
  }

  print(moves: number) {
    for (let i = this.initialLines.length - 1; i >= 0; i--) {
      console.log(
        `|${this.initialLines[i]}|  ${i === Math.ceil(this.initialLines.length / 2) ? '=>' : '  '}  |${this.resultLines[i]}|`
      );
    }
    console.log(`${this.pass ? 'Sucess' : 'Fail'} in ${moves} moves`);
    console.log('-----');
  }
}

export const checkSorted = (stacks: Stack[]) =>
  stacks.every(stack => (stack.groups.length === 1 ? stack.height === stack.maxHeight : stack.groups.length === 0));
