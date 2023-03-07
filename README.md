# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Creating the database
```
npx wrangler d1 create d1-northwind
npx wrangler d1 create d1-northwind-staging
```
Get the output database id and add it to wrangler.toml

## Importing the database
```
npx wrangler d1 execute d1-northwind --file db/schema.sql
npx wrangler d1 execute d1-northwind --file db/data.sql
```

## For local development only
```
npx wrangler dev --local --persist --env local --assets local-assets --ip 0.0.0.0
```

Wrangler will persist a local SQLite compatible sql file which you can access to with other clients:

```
sqlite3 .wrangler/state/d1/DB.sqlite3
.tables
```



## Deployment

Wire it up via the CF Dashboard. More info to come.

- Create a github repo

```
git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
git push -u origin main
```

- Connect your github repo to your Cloudflare pages. If it's already connected, you should be able to select your repo on Cloudflare pages

- Configure your environment variables in Settings > Environment Variables
  - CF_PAGES: production
  - SESSION_SECRET: <your session secret. Example: V8jlthdwEhSe1m749gEhZsqJN5I95LdM>
- Configure your D1 binding in Settings > Functions
  - Name of variable/binding: DB, Select your production db in the dropdown (Example: d1-northwind)
