# NexNest × AtMyApp Demo

This project showcases how to build a real estate experience with [Astro](https://astro.build) and [AtMyApp](https://atmyapp.com). You will learn how to:

1. Connect to AtMyApp with an API key.
2. Define the content and collection types your pages rely on.
3. Fetch data on the server and hydrate Astro pages.
4. Use preview mode to review draft content.

## Prerequisites

- Node.js 18+
- An AtMyApp account with access to the `@atmyapp/core` package
- An API key for your AtMyApp project (create one in the AtMyApp dashboard)

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`. Open it in your browser to see the NexNest front page populated with live data from AtMyApp.

> **Tip:** To point the demo at your own project, update the API key and base URL in `src/atmyapp/client.ts` (@src/atmyapp/client.ts#1-19).

## How AtMyApp Fits In

### 1. Creating a Client

`src/atmyapp/client.ts` exports `getClient` and `getPreviewClient`. They wrap `createAtMyAppClient` and accept an optional preview key. Replace the sample `apiKey` with an environment variable before deploying to production and swap the `baseUrl` for your project endpoint (@src/atmyapp/client.ts#1-19).

```ts
export const getClient = (previewKey?: string) =>
  createAtMyAppClient({
    apiKey: process.env.ATMYAPP_API_KEY!,
    baseUrl: "https://api.atmyapp.com/v0/projects/<your-project>",
    previewKey,
    plugins: ["with-id", "static-url"],
  });
```

### 2. Defining Data Models

- `src/atmyapp/properties.ts` describes the `properties` collection and exposes helpers for common queries: listing all properties, filtering featured listings, fetching by ID, and applying price filters (@src/atmyapp/properties.ts#5-66).
- `src/atmyapp/hero.ts` defines a `hero.json` content entry that holds homepage statistics (@src/atmyapp/hero.ts#1-17).

These files show how to pair AtMyApp types (`AmaCollectionDef`, `AmaContentDef`) with TypeScript to keep your data access type-safe.

### 3. Using Data in Pages

- `src/pages/index.astro` loads the hero stats and featured properties during server-side rendering, then renders the grid of featured listings (@src/pages/index.astro#1-116).
- `src/pages/properties.astro` accepts optional `minPrice` and `maxPrice` query params, calls `getInBudgetProperties`, and renders a filterable grid (@src/pages/properties.astro#1-67).
- `src/pages/properties/[id].astro` fetches a single property by id and displays a detail page (@src/pages/properties/[id].astro#1-70).

Because Astro pages run on the server, all data fetching happens before HTML is streamed to the browser. This keeps your API key safe and delivers fully rendered markup.

### 4. Preview Mode

`getPreviewClient` inspects the incoming request for an `amaPreviewKey` query parameter. Add `?amaPreviewKey=<key>` to any URL to view unpublished content. This is useful for editorial review flows before pushing changes live (@src/atmyapp/client.ts#15-19).

## Customising the Demo

1. **Update content** in AtMyApp. Add new rows to the `properties` collection or tweak `hero.json`. Refresh the site to see changes instantly.
2. **Extend data models.** Add fields (e.g., amenities) in AtMyApp, extend the TypeScript interfaces in `src/atmyapp/properties.ts`, and expose the new fields in your components.
3. **Create new pages.** Follow the same pattern: import the client helpers, fetch data in the frontmatter, and render it inside your Astro layout.

## Deployment Checklist

- Store your API key and preview key in environment variables (`.env` for local dev, platform-specific secrets for production).
- Ensure the `baseUrl` points at your production AtMyApp project.
- Disable or guard preview mode routes if they should not be publicly accessible.

## Next Steps

- Read the [`@atmyapp/core` README](node_modules/@atmyapp/core/README.md) for the full client API.
- Explore AtMyApp plugins (image transformations, draft workflows) to enrich the NexNest experience.
- Wire up analytics or forms to turn this demo into a production-ready real estate site.
