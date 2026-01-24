export class Collection<T> {

  constructor(private items: T[]) { }

  getItems(): T[] {
    return this.items;
  }

  getItem(index: number): T | undefined {
    return this.items.at(index);
  }

  clear(): void {
    this.items = [];
  }

  remove(index: number): void {
    const filtered = this.items.filter((v, i) => i != index);
    this.items = filtered;
  }

  replace(index: number, newItem: T): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = newItem;
    }
  }

}

interface Product {
  id: number;
  name: string;
}

const productCollection = new Collection<Product>([
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
productCollection.remove(1);
productCollection.clear();

const col1 = new Collection(['Apple', 'Samsung', 'Honor', 'Xiaomi']);

col1.getItem(0);
col1.replace(2, 'Honor Replaced');
col1.remove(1);
col1.clear();