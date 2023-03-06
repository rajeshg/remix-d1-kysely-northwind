import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import {
  Product,
  Supplier,
  Order,
  Customer,
  OrderDetail,
  Category,
  Employee,
} from "~/lib/types";

export interface Env {
  DB: D1Database;
}

interface KvTable {
  key: string;
  value: string;
}

export interface Database {
  kv: KvTable;
  product: Product;
  supplier: Supplier;
  order: Order;
  customer: Customer;
  orderDetail: OrderDetail;
  category: Category;
  employee: Employee;
  report: Employee;
}

// Create Kysely instance with kysely-d1
export const getD1Client = (env: Env): Kysely<Database> => {
  return new Kysely<Database>({ dialect: new D1Dialect({ database: env.DB }) });
};

export const getKyselyClient = (db: D1Database): Kysely<Database> => {
  return new Kysely<Database>({ dialect: new D1Dialect({ database: db }) });
};
