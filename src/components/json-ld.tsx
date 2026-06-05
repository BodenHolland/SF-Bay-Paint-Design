// Renders a JSON-LD <script> for structured data (schema.org). Next streams
// this into the document; search engines parse it for rich results. The data
// is server-built in src/lib/structured-data.ts.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own structured data (no user HTML), serialized with
      // angle brackets escaped so it can't break out of the <script> element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
