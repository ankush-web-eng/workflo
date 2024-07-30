This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, make sure it is installed locally properly:

```bash
git clone [name](https://github.com/ankush-web-eng/workflo.git)
# then
npm run install
```

Your Project has been setup locally, now add required environment variables.
After adding, generate the prisma schema:

```bash
npx prisma generate
```

Now, you can run it locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can check [Dockerfile](https://github.com/ankush-web-eng/workflo/blob/master/Dockerfile) as well for refrence.

## Docs

This project is built with [T3] Stack which inlcude [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/) and [TailwindCSS](https://tailwindcss.com/).

Authentication is managed by [Next-Auth](https://next-auth.js.org/)'s [CredentialsProvider](https://next-auth.js.org/providers/credentials).

Drag and Drop feature is amde possible with [react-dnd](https://react-dnd.github.io/react-dnd/about) library.

You can use the [Docker-image](https://hub.docker.com/repository/docker/deshwalankush23/workflo/general) as well to run it locally on your machine directly.

To run Docker image directly, just run:

```bash
docker pull deshwalankush23/workflo
# add your environment variables, then
docker run -d -p 3000:3000 -e DATABASE_URL=mongodb://mongodb:27017/workflo deshwalankush23/workflo
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
