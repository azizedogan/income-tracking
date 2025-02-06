import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="tr">
      <Head />
      <body className="antialiased bg-white text-black dark:bg-gray-800 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
