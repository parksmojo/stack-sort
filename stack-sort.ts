import { Stack } from './stack.ts';

export function stackSorter<C extends string>(stacks: Stack[]): void {
  const move = (from: number, to: number) => stacks[to].push(stacks[from].pop());

  // Sort stuff
}
