// Serialize JSON-LD safely for inlining inside a <script> tag. Escaping `<`
// (and the U+2028/U+2029 line separators, which are valid JSON but break JS
// string parsing) prevents a value from closing the element with a literal
// `</script>`. The data is static today, but the guard is cheap and keeps it
// safe if it ever draws on dynamic content.
function safeJson(data: object) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .split(String.fromCharCode(0x2028))
    .join("\\u2028")
    .split(String.fromCharCode(0x2029))
    .join("\\u2029");
}

export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }}
    />
  );
}
