import { type LoaderArgs } from "@remix-run/cloudflare";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import invariant from "tiny-invariant";

import { AddTableField } from "~/components/tools";
import { getD1Client } from "~/lib/db";
import { maybeDefer } from "~/utils";

export function loader({ context, params }: LoaderArgs) {
  invariant(params.id, "Missing customer id");
  const db = getD1Client(context);
  const customerPromise = db
    .selectFrom("customer")
    .selectAll()
    .where("Id", "=", params.id)
    .executeTakeFirstOrThrow();

  return maybeDefer(context.session, {
    customerPromise,
  });
}

export default function Customer() {
  const { customerPromise } = useLoaderData<typeof loader>();

  return (
    <Suspense
      fallback={
        <div className="card-content">
          <h2>Loading customer...</h2>
        </div>
      }
    >
      <Await
        resolve={customerPromise}
        children={(customer) =>
          !customer ? (
            <div className="card-content">
              <h2>Customer not found</h2>
            </div>
          ) : (
            <div className="card mb-6">
              <header className="card-header">
                <p className="card-header-title">
                  <span className="icon material-icons">ballot</span>
                  <span className="ml-2">Customer information</span>
                </p>
              </header>
              <div className="card-content">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <AddTableField
                      name="Company Name"
                      value={customer.CompanyName}
                    />
                    <AddTableField
                      name="Contact Name"
                      value={customer.ContactName}
                    />
                    <AddTableField
                      name="Contact Title"
                      value={customer.ContactTitle}
                    />
                    <AddTableField name="Address" value={customer.Address} />
                    <AddTableField name="City" value={customer.City} />
                  </div>
                  <div>
                    <AddTableField
                      name="Postal Code"
                      value={customer.PostalCode}
                    />
                    <AddTableField name="Region" value={customer.Region} />
                    <AddTableField name="Country" value={customer.Country} />
                    <AddTableField name="Phone" value={customer.Phone} />
                    <AddTableField name="Fax" value={customer.Fax} />
                  </div>
                </div>

                <hr />

                <div className="field grouped">
                  <div className="control">
                    <Link to="/customers" className="button red">
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
