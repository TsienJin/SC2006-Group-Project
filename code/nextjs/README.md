# NaviLoo | Next.js Web App

This application is developed using the following tech stack:

1. Next.js 13
2. Redux
3. MongoDB
4. TailwindCSS

---

## Usage

### Running for the first time

You must first install the dependancies required.

```zsh
npm install
```

In order to run the app, a few API keys must be added to an `.env` file. The code snippet below shows a snippet of the keys that are required.

* In this directory, create a file called `.env`.

```zsh
touch .env
```

* Then fill up the environment variables with the respective keys.

```zsh
NEXT_PUBLIC_MAPBOX_KEY=
MONGO_DB_URI=
```

### Starting the app

To run the app locally, ensure that you are in the `nextjs` directory.

```zsh
yarn dev
npm run dev
```
