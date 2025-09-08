"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <main style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>
          <h1>Something went wrong</h1>
          <pre>{error?.message}</pre>
        </main>
      </body>
    </html>
  );
}
