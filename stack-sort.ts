import { Stack } from './stack.ts';
import { checkSorted } from './test-utils.ts';

export function stackSorter(stacks: Stack[]): number {
  const iStacks = Array.from(stacks.entries());
  let moves = 0;
  let madeChange = true;
  while (madeChange) {
    madeChange = false;
    if (checkSorted(stacks)) break;
    printState(stacks);

    const singleColorStacks = iStacks.filter(([_, stack]) => stack.groups.length === 1 && stack.space);
    for (const [i, toStack] of singleColorStacks) {
      const color = toStack.groups.at(-1)!.value;
      const stacksWithThatColor = iStacks.filter(([j, stack]) => stack.groups.at(-1)?.value === color && j !== i);
      for (const [j, fromStack] of stacksWithThatColor) {
        const groupToBeMoved = fromStack.groups.at(-1)!;
        if (groupToBeMoved.count <= toStack.space) {
          Stack.move(fromStack, toStack);
          moves++;
          madeChange = true;
          break;
        }
      }
      if (madeChange) break;
    }
    if (madeChange) continue;

    const stacksWithSpace = iStacks.filter(([_, stack]) => stack.groups.length > 1 && stack.space);
    for (const [i, toStack] of stacksWithSpace) {
      const color = toStack.groups.at(-1)!.value;
      const stacksWithThatColor = iStacks.filter(([j, stack]) => stack.groups.at(-1)?.value === color && j !== i);
      const topColors = new Set(stacks.filter(stack => stack.height).map(stack => stack.groups.at(-1)!.value));
      const stacksWithHelpfulSecondColor = stacksWithThatColor.filter(
        ([j, stack]) => j !== i && stack.groups.at(-2) && topColors.has(stack.groups.at(-2)!.value)
      );
      console.log(stacksWithHelpfulSecondColor.length, stacksWithHelpfulSecondColor.map(([i, s]) => i))
      for (const [j, fromStack] of stacksWithHelpfulSecondColor){
        const groupToBeMoved = fromStack.groups.at(-1)!;
        if (groupToBeMoved.count <= toStack.space) {
          Stack.move(fromStack, toStack);
          moves++;
          madeChange = true;
          break;
        }
      }
      if(madeChange) break;
      for (const [j, fromStack] of stacksWithThatColor) {
        const groupToBeMoved = fromStack.groups.at(-1)!;
        if (groupToBeMoved.count <= toStack.space) {
          Stack.move(fromStack, toStack);
          moves++;
          madeChange = true;
          break;
        }
      }
      if (madeChange) break;
    }
    if (madeChange) continue;

    const emptyStack = stacks.find(stack => !stack.groups.length);
    if (emptyStack) {
      const colorCounts = new Map<string, number>();
      let most: [string, number] = ['', 0];
      stacks.forEach(stack => {
        if (stack.groups.length > 1) {
          const group = stack.groups.at(-1)!;
          colorCounts.set(group.value, (colorCounts.get(group.value) ?? 0) + group.count);
          if ((colorCounts.get(group.value) ?? 0) > most[1]) {
            most = [group.value, colorCounts.get(group.value)!];
          }
        }
      });
      const topColors = new Set(colorCounts.keys());
      const fromStack = stacks.find(stack =>
        most[1] > 1
          ? stack.groups.at(-1)?.value === most[0]
          : stack.groups.at(-2) && topColors.has(stack.groups.at(-2)!.value)
      );
      if (fromStack) {
        Stack.move(fromStack, emptyStack);
        moves++;
        madeChange = true;
        continue;
      }
    }
  }
  return moves;
}

function printState(stacks: Stack[]) {
  const stackArrays = stacks.map(s => s.values);
  for (let i = stacks[0].maxHeight - 1; i >= 0; i--) {
    const row: string[] = [];
    for (const stack of stackArrays) {
      row.push(stack.at(i) ?? ' ');
    }
    console.log('|' + row.join('|') + '|');
  }
  console.log('---');
}
