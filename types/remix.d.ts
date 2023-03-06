/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

import "@remix-run/server-runtime";
import { type Session } from "@remix-run/server-runtime";

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext {
    cf?: IncomingRequestCfProperties<unknown>;
    DB: D1Database;
    session: Session;
  }
}
