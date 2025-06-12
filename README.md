```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
## ENDPOINTS
GET https://estadistica-fusbol.mario-cares-c.workers.dev/jugadores?pretty
GET https://estadistica-fusbol.mario-cares-c.workers.dev/jugadores/1?pretty
POST https://estadistica-fusbol.mario-cares-c.workers.dev/jugadores
PUT https://estadistica-fusbol.mario-cares-c.workers.dev/jugadores/1
DELETE https://estadistica-fusbol.mario-cares-c.workers.dev/jugadores/1
