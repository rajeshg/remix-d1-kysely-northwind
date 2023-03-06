import { Suspense } from "react";
import { type LoaderArgs } from "@remix-run/cloudflare";
import { Await, Link, useLoaderData, useRevalidator } from "@remix-run/react";

import { maybeDefer } from "~/utils";
import { getD1Client } from "~/lib/db";

export function loader({ context }: LoaderArgs) {
  const db = getD1Client(context);
  const employeesPromise = db.selectFrom("employee").selectAll().execute();

  return maybeDefer(context.session, {
    employeesPromise,
  });
}

export default function Employees() {
  const { employeesPromise } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();

  return (
    <Suspense
      fallback={
        <div className="card-content">
          <h2>Loading employees...</h2>
        </div>
      }
    >
      <Await
        resolve={employeesPromise}
        children={(employees) =>
          employees.length === 0 ? (
            <div className="card-content">
              <h2>No employees...</h2>
            </div>
          ) : (
            <div className="card has-table">
              <header className="card-header">
                <p className="card-header-title">Employees</p>
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
                      <th></th>
                      <th>Name</th>
                      <th>Title</th>
                      <th>City</th>
                      <th>Phone</th>
                      <th>Country</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => {
                      return (
                        <tr key={employee.Id}>
                          <td className="image-cell">
                            <div className="image">
                              <img
                                alt=""
                                src={`https://avatars.dicebear.com/v2/initials/${employee.FirstName?.[0]}-${employee.LastName?.[0]}.svg`}
                                className="rounded-full"
                              />
                            </div>
                          </td>
                          <td data-label="Name">
                            <Link
                              className="link"
                              to={`/employee/${employee.Id}`}
                            >{`${employee.FirstName} ${employee.LastName}`}</Link>
                          </td>
                          <td data-label="Title">{employee.Title}</td>
                          <td data-label="City">{employee.City}</td>
                          <td data-label="Phone">{employee.HomePhone}</td>
                          <td data-label="Country">{employee.Country}</td>
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
