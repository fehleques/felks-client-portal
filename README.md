# felks-client-portal

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/fehleques/felks-client-portal)

## Static export and dynamic routes

When using Next.js with `output: 'export'`, every dynamic route segment must define [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params). Without this function, `next build` cannot determine which paths to pre-render and the export will fail.

```ts
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  return [
    { slug: 'hello-world' },
    { slug: 'another-post' },
  ];
}
```

This function supplies the parameter values used to generate the static HTML for each route.

Before pushing changes, run `npm run build` locally. The build step surfaces missing `generateStaticParams` functions and other export issues early.
