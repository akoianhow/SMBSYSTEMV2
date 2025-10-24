type Product = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isConsigned: boolean;
  cost: number;
  srp: number;
  itemsInStock: number;
  categoryId: number;
  category?: Category;
  supplierId: number;
  supplier?: Supplier;
};


export type ProductDTO= {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isConsigned: boolean;
  cost: number;
  srp: number;
  itemsInStock: number;
  categoryId: number;
  categoryName: string;
  supplierId: number;
  supplierName: string;
}

type Category = {
  id: number;
  name: string
  description: string
}

type Supplier = {
  id: number;
  name: string
  description: string
}