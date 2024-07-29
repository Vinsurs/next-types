/// <reference types="react"/>

import { Metadata, MetadataRoute, ResolvingMetadata, Viewport } from 'next'
import { NextRequest } from 'next/server'
import { NextMiddlewareResult } from 'next/dist/server/web/types';

/** Definition for nextjs dynamic route params
 * @param T - The dynamic route parameters
 * @param N - Whether the dynamic route are catch-all mode
 * @example
 * // Dynamic route: /user/[userid]/posts/[id]/page.tsx
 * export default function Page(props: DynamicRouteParams<'userid' | 'id'>) {
 *  // props.id
 *  // props.userid
 * }
 * // Catch-all route: /posts/[...id]/page.tsx
 * export default function Page(props: DynamicRouteParams<'id', true>) {
 *  // props.id
 * }
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes}
 */
export declare interface DynamicRouteParams<T extends string, N extends boolean = false> {
    params: {
        [slug in T]: N extends false ? string : string[];
    }
}

/** Definition for nextjs page props
 * @param T - The dynamic route parameters
 * @param N - Whether the dynamic route are catch-all mode
 * @param U - The search parameters
 * @example
 * // Dynamic route: /user/[userid]/posts/[id]/page.tsx
 * export default function Page(props: Props<'userid' | 'id'>) {
 *  // props.id
 *  // props.userid
 * }
 * // Catch-all route: /posts/[...id]/page.tsx
 * export default function Page(props: Props<'id', true>) {
 *  // props.id
 * }
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page}
 */
export declare interface Props<T extends string, N extends boolean = false, U extends string = any> extends DynamicRouteParams<T, N> {
    searchParams: {
        [key in U]: string | string[] | undefined;
    }
}

/** Definition for nextjs layout props 
 * @param T - The dynamic route parameters
 * @param N - Whether the dynamic route are catch-all mode
 * @example 
 * // app/layout.tsx
 * export default function RootLayout(props: LayoutProps) {}
 * @seee {@link https://nextjs.org/docs/app/api-reference/file-conventions/layout}
*/
export declare interface LayoutProps<T extends string = any, N extends boolean = false> extends DynamicRouteParams<T, N> {
    children: React.ReactNode;
    [key: string]: any;
}

/** Definition for nextjs error page props
 * @example
 * // app/dashboard/error.tsx
 * 'use client'
 * export default function Error(props: ErrorPageProps) {
 *  // ...
 * }
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/error}
 */
export declare interface ErrorPageProps {
    /**
     * - During production, the `Error` object forwarded to the client only includes a generic `message` and `digest` property.
     * This is a security precaution to avoid leaking potentially sensitive details included in the error to the client.The 
     * `message` property contains a generic message about the error and the `digest` property contains an automatically generated
     *  hash of the error that can be used to match the corresponding error in server-side logs.
     * - During development, the `Error` object forwarded to the client will be serialized and include the `message` of the original
     *  error for easier debugging.
     */
    error: Error & { digest?: string };
    /** An error component can use the `reset()` function to prompt the user to attempt to recover from the error. 
     * When executed, the function will try to re-render the Error boundary's contents. If successful, the fallback
     *  error component is replaced with the result of the re-render. 
     * */
    reset: () => void;
}


/** This interface represents the exported http handler in a `route.ts` file. 
 * @param T - The dynamic route parameters
 * @param N - Whether the dynamic route are catch-all mode
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route}
*/
export declare interface RouteHandler<T extends string = any, N extends boolean = false> {
    (request: NextRequest, context: DynamicRouteParams<T, N>): NextMiddlewareResult | Promise<NextMiddlewareResult>;
}

/** Route segment config for a layout, a page and a route handler.
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config}
 */
export declare interface RouteSegmentConfig {
    /** Change the dynamic behavior of a layout or page to fully static or fully dynamic.
     * @default 'auto'
     * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic}
     */
    dynamic: keyof RouteSegmentConfigDynamic;
    /** Control what happens when a dynamic segment is visited that was not generated with generateStaticParams.
     * - `true(default)`: Dynamic segments not included in generateStaticParams are generated on demand.
     * - `false`: Dynamic segments not included in generateStaticParams will return a 404.
     * @default true
     * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicParams}
     */
    dynamicParams: boolean;
    /** Set the default revalidation time for a layout or page. This option does **not** override the `revalidate` value
     *  set by individual `fetch` requests.
     * @default false
     * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate}
     */
    revalidate: false | 0 | number;
    /** **This is an advanced option that should only be used if you specifically need to override the default behavior.** 
    * @description By default, Next.js **will cache** any `fetch()` requests that are reachable **before** any dynamic functions are used and **will not cache** fetch
    *  requests that are discovered **after** dynamic functions are used. fetchCache allows you to override the default cache option of all fetch requests in
    *  a layout or page.
     * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#fetchCache}
    */
    fetchCache: keyof RouteSegmentConfigFetchCache;
    /** 
     * @default 'nodejs'
     * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#runtime} */
    runtime: keyof RouteSegmentConfigRuntime;
    /** Support for `preferredRegion`, and regions supported, is dependent on your deployment platform.
     * - If a `preferredRegion` is not specified, it will inherit the option of the nearest parent layout.
     * - The root layout defaults to `all` regions.
     */
    preferredRegion: 'auto' | 'global' | 'home' | string | string[];
    /** By default, Next.js does not limit the execution of server-side logic (rendering a page or handling an API). 
     * Deployment platforms can use `maxDuration` from the Next.js build output to add specific execution limits.
     * - If using `Server Actions`, set the `maxDuration` at the page level to change the default timeout of all Server Actions used on the page.
     * @note This settings requires Next.js `13.4.10` or higher.
     * */
    maxDuration: number;
    /**
     * Partial Prerendering is an experimental feature that allows static portions of a route to be prerendered and
     *  served from the cache with dynamic holes streamed in, all in a single HTTP request.
     * - **Warning**: Partial Prerendering is an **experimental** feature and is currently **not suitable for production environments**.
     * - Partial Prerendering does not yet apply to client-side navigations.
     * - Partial Prerendering is designed for the [Node.js runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes) only. Using the subset of the Node.js runtime is 
     * not needed when you can instantly serve the static shell.
     * 
     * Learn more about Partial Prerendering in the Next.js [Learn course](https://nextjs.org/learn/dashboard-app/partial-prerendering).
     * @description Partial Prerendering is available in `next@canary`
     * @experimental
     * @default false
     * @see {@link https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering}
     */
    experimental_ppr: boolean;
}

/** Route segment config for 'dynamic'.
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic}
 */
export interface RouteSegmentConfigDynamic {
    /** The default option to cache as much as possible without preventing any components from opting into dynamic behavior.
     * @default
     */
    'auto',
    /** Force `dynamic rendering`, which will result in routes being rendered for each user at request time. */
    'force-dynamic',
    /** Force static rendering and cache the data of a layout or page by causing an error if any components use dynamic functions or uncached data. */
    'error',
    /** Force static rendering and cache the data of a layout or page by forcing cookies(), headers() and useSearchParams() to return empty values. */
    'force-static'
}

/** Route segment config for 'fetchCache'.
 * @description By default, Next.js **will cache** any `fetch()` requests that are reachable **before** any dynamic functions are used and **will not cache** fetch
 *  requests that are discovered **after** dynamic functions are used. fetchCache allows you to override the default cache option of all fetch requests in
 *  a layout or page.
 * @note **This is an advanced option that should only be used if you specifically need to override the default behavior.**
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#fetchCache}
 */
export interface RouteSegmentConfigFetchCache {
    /** The default option to cache fetch requests before dynamic functions with the cache option they provide and not cache fetch requests after dynamic functions.
     * @default
     */
    'auto',
    /** Allow any cache option to be passed to fetch but if no option is provided then set the cache option to 'force-cache'. This means that even fetch requests after dynamic functions are considered static. */
    'default-cache',
    /** Ensure all fetch requests opt into caching by changing the default to cache: 'force-cache' if no option is provided and causing an error if any fetch requests use cache: 'no-store'. */
    'only-cache',
    /** Ensure all fetch requests opt into caching by setting the cache option of all fetch requests to 'force-cache'. */
    'force-cache',
    /** Allow any cache option to be passed to fetch but if no option is provided then set the cache option to 'no-store'. This means that even fetch requests before dynamic functions are considered dynamic. */
    'default-no-store',
    /** Ensure all fetch requests opt out of caching by changing the default to cache: 'no-store' if no option is provided and causing an error if any fetch requests use cache: 'force-cache' */
    'only-no-store',
    /** Ensure all fetch requests opt out of caching by setting the cache option of all fetch requests to 'no-store'. This forces all fetch requests to be re-fetched every request even if they provide a 'force-cache' option. */
    'force-no-store'
}

/** Route segment config for 'fetchCache'.
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#runtime}
 */
export interface RouteSegmentConfigRuntime {
    /** @default */
    'nodejs',
    'edge'
}

/** The `generateStaticParams` function can be used in combination with `dynamic route segments` to 
 * define the list of route segment parameters that will be statically generated at build time 
 * instead of on-demand at request time. 
 * @param T - The dynamic route parameters
 * @param N - Whether the dynamic route are catch-all mode
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-static-params}
 * */
export interface GenerateStaticParams<T extends string, N extends boolean = false> {
    (options: DynamicRouteParams<T, false>): Promise<Array<DynamicRouteParams<T, N>['params']>> | Array<DynamicRouteParams<T, N>['params']>;
}

/** The interface represents 'generateImageMetadata' in a image generate file convention, eg 'icon.tsx'. 
 * @param T - The dynamic route parameters
 * @param N - Whether the dynamic route are catch-all mode
 * @description You can use `generateImageMetadata` to generate different versions of one image or return 
 * multiple images for one route segment. This is useful for when you want to avoid hard-coding metadata values, such as for icons.
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata}
*/
export interface GenerateImageMetadata<T extends string, N extends boolean = false> {
    (options: DynamicRouteParams<T, N>): Array<ImageMetadata> | Promise<Array<ImageMetadata>>;
}

/** The interface represents default exported function from a icon or image generate file convention, eg 'icon.tsx'. 
 * @param T - The dynamic route parameters
 * @param N - Whether the dynamic route are catch-all mode
 * @description `ImageResponse` satisfies this function return type.
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx}
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx}
*/
export interface GenerateIconOrImage<T extends string, N extends boolean = false> {
    (options: GenerateImageOptions<T, N>): GenerateIconOrImageResult | Promise<GenerateIconOrImageResult>;
}

export type GenerateIconOrImageResult = Blob | ArrayBuffer | ArrayBufferView | DataView | ReadableStream | Response;

/** `generateIconOrImage` function options.
 * @param T - The dynamic route parameters
 * @param N - Whether the dynamic route are catch-all mode
 */
export interface GenerateImageOptions<T extends string, N extends boolean = false> extends DynamicRouteParams<T, N> {
    /** The id parameter represents image metadata object's id value returned by 'GenerateImageMetadata' 
     * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata#returns}
    */
    id: ImageMetadata['id'];
}

/** image metadata for 'generateImageMetadata'
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata#returns}
 */
export interface ImageMetadata {
    /** it will be passed to the props of the image generating function. */
    id: string;
    alt?: string;
    size?: {
        width: number;
        height: number;
    };
    /** [image MIME type](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types#image_types) */
    contentType?: string;
}

/** Generate a manifest.(json|webmanifest) file that matches the 
 * [Web Manifest Specification](https://developer.mozilla.org/docs/Web/Manifest) in the root of 
 * app directory to provide information about your web application for the browser.
 * @description For information on all the current options, see the [MDN docs](https://developer.mozilla.org/docs/Web/Manifest).
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest#generate-a-manifest-file}
 *  */
export interface GenerateManifest {
    (): MetadataRoute.Manifest | Promise<MetadataRoute.Manifest>;
}

/** Generate a `robots.txt` file that matches the 
 * [Robots Exclusion Standard](https://en.wikipedia.org/wiki/Robots.txt#Standard) in the root of 
 * app directory tell search engine crawlers which URLs they can access on your site.
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file}
 *  */
export interface GenerateRobots {
    (): MetadataRoute.Robots | Promise<MetadataRoute.Robots>;
}

/** `sitemap.(xml|js|ts)` is a special file that matches the [Sitemaps XML format](https://www.sitemaps.org/protocol.html) 
 * to help search engine crawlers index your site more efficiently.
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps}
 *  */
export interface GenerateSitemap {
    (options: GenerateSitemapOptions): MetadataRoute.Sitemap | Promise<MetadataRoute.Sitemap>;
}

export interface GenerateSitemapOptions extends GenerateSitemapsResult {}

/** You can use the `generateSitemaps` function to generate multiple sitemaps for your application.
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps}
 *  */
export interface GenerateSitemaps {
    (): Array<GenerateSitemapsResult> | Promise<Array<GenerateSitemapsResult>>;
}

export interface GenerateSitemapsResult {
    /** The id value represents the value returned by 'generateSitemaps' function 
     * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps#example}
    */
    id: number;
}

/** Definition for nextjs [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function) function.
 * @param T - The dynamic route parameters
 * @param N - Whether the dynamic route are catch-all mode
 */
export interface GenerateMetadata<T extends string, N extends boolean = false> {
    /**
     * @param props - An object containing the parameters of the current route
     * @param parent - A promise of the resolved metadata from parent route segments
     */
    (props: Props<T, N>, parent: ResolvingMetadata): Metadata | Promise<Metadata>;
}

/** Definition for nextjs [generateViewport](https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function-1) function.
 * @param T - The dynamic route parameters
 * @param N - Whether the dynamic route are catch-all mode
 */
export interface GenerateViewport<T extends string, N extends boolean = false> {
    /**
     * @param props - An object containing the parameters of the current route
     */
    (props: Props<T, N>): Viewport | Promise<Viewport>;
}