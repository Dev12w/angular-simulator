export class Collection<T> {

  private items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  getItems(): T[] {
    return this.items;
  }

  getItem(index: number): T | undefined {
    return this.items.at(index);
  }

  clear(): void {
    this.items = [];
  }

  removeByIndex(index: number): void {
    this.items = this.items.filter((value: T, i: number) => i !== index);
  }

  replace(index: number, newItem: T): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = newItem;
    }
  }

}
