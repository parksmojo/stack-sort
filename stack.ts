interface Group {
  value: string;
  count: number;
}

export class Stack {
  readonly stack: Group[];

  get height() {
    return this.stack.reduce((prev, now) => prev + now.count, 0);
  }

  get maxHeight() {
    return this.maxLength;
  }

  get space() {
    return this.maxHeight - this.height;
  }

  get values() {
    const vals: string[] = [];
    for (const group of this.stack) {
      for (let i = 0; i < group.count; i++) {
        vals.push(group.value);
      }
    }
    return vals;
  }

  constructor(
    private maxLength: number,
    initialValues: string[]
  ) {
    if (initialValues.length > maxLength) throw new Error('Cannot make a stack that exceeds its own max height.');

    this.stack = [];
    for (const val of initialValues) {
      let group = this.stack.at(-1);
      if (!group || group.value !== val) {
        this.stack.push({
          value: val,
          count: 1,
        });
      } else {
        group.count++;
      }
    }
  }

  static move(from: Stack, to: Stack): void {
    if (!from.height) throw new Error('cannot move from empty stack');
    if (from.stack.at(-1)!.count > to.space) throw new Error('Not enough space on destination stack');
    if (to.height && from.stack.at(-1)?.value !== to.stack.at(-1)?.value)
      throw new Error('Cannot combine different colors');

    const moved = from.stack.pop()!;
    const group = to.stack.at(-1);
    if (!group) {
      to.stack.push(moved);
    } else {
      group.count += moved.count;
    }
  }
}
