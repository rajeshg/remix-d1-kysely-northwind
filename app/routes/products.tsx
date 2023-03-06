import { Suspense } from "react";
import { type LoaderArgs } from "@remix-run/cloudflare";
import { Await, Link, useLoaderData, useRevalidator } from "@remix-run/react";
import { getD1Client } from "~/lib/db";
import { maybeDefer } from "~/utils";

export function loader({ context }: LoaderArgs) {
  const db = getD1Client(context);
  const productsPromise = db
    .selectFrom("product")
    .selectAll()
    .limit(5)
    .offset(0)
    .execute();
  return maybeDefer(context.session, {
    productsPromise,
  });
}

export default function Products() {
  const { productsPromise } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();

  return (
    <Suspense
      fallback={
        <div className="card-content">
          <h2>Loading products...</h2>
        </div>
      }
    >
      <Await
        resolve={productsPromise}
        children={(products) =>
          products.length === 0 ? (
            <div className="card-content">
              <h2>No products...</h2>
            </div>
          ) : (
            <div className="card has-table">
              <header className="card-header">
                <p className="card-header-title">Products</p>
                <button
                  className="card-header-icon"
                  onClick={() => {
                    revalidator.revalidate();
                  }}
                >
                  <span className="material-icons">redo</span>
                </button>
              </header>
              <div className="card-content">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Qt per unit</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Orders</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      return (
                        <tr key={product.Id}>
                          <td data-label="Product">
                            <Link
                              className="link"
                              to={`/product/${product.Id}`}
                            >
                              {product.ProductName}
                            </Link>
                          </td>
                          <td data-label="Qpu">{product.QuantityPerUnit}</td>
                          <td data-label="Price">${product.UnitPrice}</td>
                          <td data-label="Stock">{product.UnitsInStock}</td>
                          <td data-label="Orders">{product.UnitsOnOrder}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* <Paginate pages={pages} page={page} setPage={setPage} /> */}
              </div>
            </div>
          )
        }
      />
    </Suspense>
  );
}
