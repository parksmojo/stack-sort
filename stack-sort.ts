import { Stack } from './stack.ts';

export function stackSorter(stacks: Stack[]): void {
  const iStacks = Array.from(stacks.entries());

  let madeChange = true;
  while (madeChange) {
    madeChange = false;

    const singleColorStacks = iStacks.filter(([_, stack]) => stack.groups.length === 1 && stack.space);
    for (const [i, toStack] of singleColorStacks) {
      const color = toStack.groups.at(-1)!.value;
      const stacksWithThatColor = iStacks.filter(([j, stack]) => stack.groups.at(-1)?.value === color && j !== i);
      for (const [j, fromStack] of stacksWithThatColor) {
        const groupToBeMoved = fromStack.groups.at(-1)!;
        if (groupToBeMoved.count <= toStack.space) {
          Stack.move(fromStack, toStack);
          madeChange = true;
          break;
        }
      }
      if (madeChange) break;
    }
    if (madeChange) continue;
  }
}
