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
  const supplierId = Number(params.id);
  const supplierPromise = db
    .selectFrom("supplier")
    .selectAll()
    .where("Id", "=", supplierId)
    .executeTakeFirstOrThrow();
  return maybeDefer(context.session, {
    supplierPromise,
  });
}

export default function Supplier() {
  const { supplierPromise } = useLoaderData<typeof loader>();

  return (
    <Suspense
      fallback={
        <div className="card-content">
          <h2>Loading supplier...</h2>
        </div>
      }
    >
      <Await
        resolve={supplierPromise}
        children={(supplier) =>
          !supplier ? (
            <div className="card-content">
              <h2>Supplier not found</h2>
            </div>
          ) : (
            <div className="card mb-6">
              <header className="card-header">
                <p className="card-header-title">
                  <span className="icon material-icons">ballot</span>
                  <span className="ml-2">Supplier information</span>
                </p>
              </header>
              <div className="card-content">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <AddTableField
                      name="Company Name"
                      value={supplier.CompanyName}
                    />
                    <AddTableField
                      name="Contact Name"
                      value={supplier.ContactName}
                    />
                    <AddTableField
                      name="Contact Title"
                      value={supplier.ContactTitle}
                    />
                    <AddTableField name="Address" value={supplier.Address} />
                    <AddTableField name="City" value={supplier.City} />
                  </div>
                  <div>
                    <AddTableField name="Region" value={supplier.Region} />
                    <AddTableField
                      name="Postal Code"
                      value={supplier.PostalCode}
                    />
                    <AddTableField name="Country" value={supplier.Country} />
                    <AddTableField name="Phone" value={supplier.Phone} />
                    {supplier.Fax ? (
                      <AddTableField name="Fax" value={supplier.Fax} />
                    ) : (
                      false
                    )}
                    {supplier.HomePage ? (
                      <AddTableField
                        name="Home Page"
                        value={supplier.HomePage}
                      />
                    ) : (
                      false
                    )}
                  </div>
                </div>

                <hr />

                <div className="field grouped">
                  <div className="control">
                    <Link to="/suppliers" className="button red">
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
