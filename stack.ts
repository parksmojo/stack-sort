interface Group {
  value: string;
  count: number;
}

export class Stack {
  readonly groups: Group[];

  get height() {
    return this.groups.reduce((prev, now) => prev + now.count, 0);
  }

  get maxHeight() {
    return this.maxLength;
  }

  get space() {
    return this.maxHeight - this.height;
  }

  get values() {
    const vals: string[] = [];
    for (const group of this.groups) {
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

    this.groups = [];
    for (const val of initialValues) {
      let group = this.groups.at(-1);
      if (!group || group.value !== val) {
        this.groups.push({
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
    if (from.groups.at(-1)!.count > to.space) throw new Error('Not enough space on destination stack');
    if (to.height && from.groups.at(-1)?.value !== to.groups.at(-1)?.value)
      throw new Error('Cannot combine different colors');

    const moved = from.groups.pop()!;
    const group = to.groups.at(-1);
    if (!group) {
      to.groups.push(moved);
    } else {
      group.count += moved.count;
    }
  }
}
