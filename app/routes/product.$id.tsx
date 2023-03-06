import { type LoaderArgs } from "@remix-run/cloudflare";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import invariant from "tiny-invariant";

import { AddTableField } from "~/components/tools";
import { getD1Client } from "~/lib/db";
import { maybeDefer } from "~/utils";

export function loader({ context, params }: LoaderArgs) {
  invariant(params.id, "id is required");
  const db = getD1Client(context);
  const productId = Number(params.id);
  const productPromise = db
    .selectFrom("product")
    .innerJoin("supplier", "supplier.Id", "product.SupplierId")
    .selectAll()
    .where("product.Id", "=", productId)
    .executeTakeFirstOrThrow();
  return maybeDefer(context.session, {
    productPromise,
  });
}

export default function Product() {
  const { productPromise } = useLoaderData<typeof loader>();

  return (
    <Suspense
      fallback={
        <div className="card-content">
          <h2>Loading product...</h2>
        </div>
      }
    >
      <Await
        resolve={productPromise}
        children={(product) =>
          !product ? (
            <div className="card-content">
              <h2>Product not found</h2>
            </div>
          ) : (
            <div className="card mb-6">
              <header className="card-header">
                <p className="card-header-title">
                  <span className="icon material-icons">ballot</span>
                  <span className="ml-2">Product information</span>
                </p>
              </header>

              <div className="card-content">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <AddTableField
                      name="Product Name"
                      value={product.ProductName}
                    />
                    <AddTableField
                      name="Supplier"
                      link={`/supplier/${product.SupplierId}`}
                      value={product.SupplierName}
                    />
                    <AddTableField
                      name="Quantity Per Unit"
                      value={product.QuantityPerUnit}
                    />
                    <AddTableField
                      name="Unit Price"
                      value={`$${product.UnitPrice}`}
                    />
                  </div>
                  <div>
                    <AddTableField
                      name="Units In Stock"
                      value={product.UnitsInStock}
                    />
                    <AddTableField
                      name="Units In Order"
                      value={product.UnitsOnOrder}
                    />
                    <AddTableField
                      name="Reorder Level"
                      value={product.ReorderLevel}
                    />
                    <AddTableField
                      name="Discontinued"
                      value={product.Discontinued}
                    />
                  </div>
                </div>

                <hr />

                <div className="field grouped">
                  <div className="control">
                    <Link to="/products" className="button red">
                      Go back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      />
    </Suspense>
  );
}
