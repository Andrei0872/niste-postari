# Niste postari

## Setting up

### The root `.env` file

These variables are going to be used to configure the local Postgres instance.

```bash
# Ensure you're in the root folder.
cp .env.example .env
```

### The `api` `.env` file

Here the cookie secret should be provided.

```bash
# Ensure you're in the `api` directory.
cp .env.example .env
```

---

## Spinning up the application

1. Start the containers

    ```bash
    # Ensure you're in the root folder.
    docker compose up
    ```

2. Start the Next.js application

    ```bash
    cd next
    npm run dev
    ```

    You can also run in debug mode by selecting the Next.js configuration before starting up the debugging process.

3. Start the Nest.js application

    ```bash
    # From the root folder.
    cd api

    npm run start:dev
    ```

    You can also run in debug mode by selecting the Nest.js configuration before starting up the debugging process.

---

## Working on the application

### Dealing with DB schema changes

Quickly _reload_ the Postgres instance with the new changes:

```bash
docker compose down -v && docker compose up
```

### Seeding the database

```bash
# Ensure you're in the `api` folder.
npx knex seed:run
```
