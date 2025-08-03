export class Stack<C extends string> {
  constructor(
    private maxLength: number,
    private stack: C[]
  ) {
    if (stack.length > maxLength) throw new Error('Cannot make a stack that exceeds its own max height.');
  }

  get values() {
    return this.stack;
  }

  get height() {
    return this.stack.length;
  }

  get maxHeight() {
    return this.maxLength;
  }

  push(vals: C[]) {
    if (!vals.length) throw new Error('Cannot push empty array');

    const val = vals[0];
    if (!vals.every(v => v === val)) throw new Error('Cannot push array of different values');

    return this.stack.push(...vals);
  }

  pop() {
    const first = this.stack.pop();
    if (!first) throw new Error('Cannot pop from empty stack');

    const res = [first];
    while (this.stack.at(-1) === first) {
      res.push(this.stack.pop()!);
    }
    return res;
  }

  view() {
    let val: C | undefined;
    const vals: C[] = []
    for(let i = this.stack.length - 1; i >= 0; i--) {
      val ??= this.stack[i];
      if(val !== this.stack[i]){
        break;
      }
      vals.push(val);
    }
    return vals
  }
}
