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
    const filteredItems: T[] = this.items.filter((v: T, i: number): boolean => i !== index);
    this.items = filteredItems;
  }

  replace(index: number, newItem: T): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = newItem;
    }
  }

}

interface IProduct {
  id: number;
  name: string;
}

const productCollection = new Collection<IProduct>([
  {
    id: 1,
    name: 'Apple'
  },
  {
    id: 2,
    name: 'Samsung'
  },
  {
    id: 3,
    name: 'Honor'
  },
  {
    id: 4,
    name: 'Xiaomi'
  },
]);

productCollection.getItem(0);
productCollection.replace(2, { id: 5, name: 'Huawey' });
productCollection.removeByIndex(1);
productCollection.clear();

const col1 = new Collection<string>(['Apple', 'Samsung', 'Honor', 'Xiaomi']);

col1.getItem(0);
col1.replace(2, 'Honor Replaced');
col1.removeByIndex(1);
col1.clear();