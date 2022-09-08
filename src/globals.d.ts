// Required declaration so TypeScript can import CSS with ?inline param for Vite to inline CSS at build time.
declare module '*.css?inline' {
  const content: string;
  export default content;
}
