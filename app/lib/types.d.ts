export interface Category {
  Id: number | null;
  CategoryName: string | null;
  Description: string | null;
}

export interface Customer {
  Id: string | null;
  CompanyName: string | null;
  ContactName: string | null;
  ContactTitle: string | null;
  Address: string | null;
  City: string | null;
  Region: string | null;
  PostalCode: string | null;
  Country: string | null;
  Phone: string | null;
  Fax: string | null;
}

export interface CustomerCustomerDemo {
  Id: string | null;
  CustomerTypeId: string | null;
}

export interface CustomerDemographic {
  Id: string | null;
  CustomerDesc: string | null;
}

export interface Employee {
  Id: number | null;
  LastName: string | null;
  FirstName: string | null;
  Title: string | null;
  TitleOfCourtesy: string | null;
  BirthDate: string | null;
  HireDate: string | null;
  Address: string | null;
  City: string | null;
  Region: string | null;
  PostalCode: string | null;
  Country: string | null;
  HomePhone: string | null;
  Extension: string | null;
  Photo: Buffer | null;
  Notes: string | null;
  ReportsTo: number | null;
  PhotoPath: string | null;
}

export interface EmployeeTerritory {
  Id: string | null;
  EmployeeId: number;
  TerritoryId: string | null;
}

export interface Order {
  Id: number | null;
  CustomerId: string | null;
  EmployeeId: number;
  OrderDate: string | null;
  RequiredDate: string | null;
  ShippedDate: string | null;
  ShipVia: number | null;
  Freight: string;
  ShipName: string | null;
  ShipAddress: string | null;
  ShipCity: string | null;
  ShipRegion: string | null;
  ShipPostalCode: string | null;
  ShipCountry: string | null;
}

export interface OrderDetail {
  Id: string | null;
  OrderId: number;
  ProductId: number;
  UnitPrice: string;
  Quantity: number;
  Discount: string;
}

export interface Product {
  Id: number | null;
  ProductName: string | null;
  SupplierId: number;
  CategoryId: number;
  QuantityPerUnit: string | null;
  UnitPrice: string;
  UnitsInStock: number;
  UnitsOnOrder: number;
  ReorderLevel: number;
  Discontinued: number;
}

export interface ProductDetailsV {
  Id: number | null;
  ProductName: string | null;
  SupplierId: number | null;
  CategoryId: number | null;
  QuantityPerUnit: string | null;
  UnitPrice: string | null;
  UnitsInStock: number | null;
  UnitsOnOrder: number | null;
  ReorderLevel: number | null;
  Discontinued: number | null;
  CategoryName: string | null;
  CategoryDescription: string | null;
  SupplierName: string | null;
  SupplierRegion: string | null;
}

export interface Region {
  Id: number | null;
  RegionDescription: string | null;
}

export interface Shipper {
  Id: number | null;
  CompanyName: string | null;
  Phone: string | null;
}

export interface Supplier {
  Id: number | null;
  CompanyName: string | null;
  ContactName: string | null;
  ContactTitle: string | null;
  Address: string | null;
  City: string | null;
  Region: string | null;
  PostalCode: string | null;
  Country: string | null;
  Phone: string | null;
  Fax: string | null;
  HomePage: string | null;
}

export interface Territory {
  Id: string | null;
  TerritoryDescription: string | null;
  RegionId: number;
}

export interface DB {
  Category: Category;
  Customer: Customer;
  CustomerCustomerDemo: CustomerCustomerDemo;
  CustomerDemographic: CustomerDemographic;
  Employee: Employee;
  EmployeeTerritory: EmployeeTerritory;
  Order: Order;
  OrderDetail: OrderDetail;
  Product: Product;
  ProductDetails_V: ProductDetailsV;
  Region: Region;
  Shipper: Shipper;
  Supplier: Supplier;
  Territory: Territory;
}
