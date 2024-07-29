# next-types

common types definition for next.js 14+ to improve type safety and develop experience.

# installation

```bash
npm install next-types -D
```

# usage
- Regular route:
```ts
// app/dashboard/page.tsx
import { Props, RouteSegmentConfig } from 'next-types';

// set route segment config
export const dynamic: RouteSegmentConfig['dynamic'] = 'auto'

export default function Page(props: Props) {
    // props.searchParams
}
```
- Dynamic route:
```ts
// app/user/[userid]/posts/[id]/page.tsx
import { Props, GenerateStaticParams, GenerateViewport } from 'next-types';

export const generateStaticParams: GenerateStaticParams = async () => {
    // return params for static generation
}

// customize viewport information for you route
export const generateViewport: GenerateViewport<'userid'|'id'> = async ({ params }) => {
    // return viewport information
}
export default function Page(props: Props<'userid' | 'id'>) {
    // props.userid
    // props.id
}
```
- Catch-all route:
```ts
// app/posts/[...id]/page.tsx
import { Props } from 'next-types';

export default function Page(props: Props<'id', true>) {
    // props.id
}
```
- error.tsx:
```ts
// app/posts/[id]/error.tsx
import { ErrorPageProps } from 'next-types';

export default function Page(props: ErrorPageProps) {
    // props.reset
}
```
- route handlers:
```ts
// app/api/post/route.ts
import { RouteHandler } from 'next-types';

export const GET: RouteHandler = async (request, context) {
    // handle your api point with request and optional context
}
```
- generate metadata for you metadata file:
```ts
// app/post/(icon.ts|opengraph-image.ts|opengraph-image.ts)
import { GenerateIconOrImage, GenerateImageMetadata, ImageMetadata } from 'next-types';

// either generate metadata for your icon or image with function
export const generateImageMetadata: GenerateImageMetadata = () => {
    // return metadata for you metadata file
}
// or with metadata config
export const size: ImageMetadata['size'] = {
    width: 200,
    height: 200
}
const icon: GenerateIconOrImage = () => {
    // return icon
}
export default icon
```
```ts
// app/robots.ts
import { GenerateRobots } from 'next-types';

const robots: GenerateRobots = () => {
    // return robots
}
export default robots
```
```ts
// app/sitemap.ts
import { GenerateSitemap, GenerateSitemaps } from 'next-types';

// if you want, you can [Generating multiple sitemaps](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps)
// export const generateSitemaps: GenerateSitemaps = async () => {
//   // Fetch the total number of products and calculate the number of sitemaps needed
//   return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
// }
const sitemap: GenerateSitemap = (options) => {
    // return sitemap
}
export default sitemap
```
```ts
// app/manifest.ts
import { GenerateManifest } from 'next-types';

const manifest: GenerateManifest = () => {
    // return manifest
}
export default manifest
```

# License
MIT