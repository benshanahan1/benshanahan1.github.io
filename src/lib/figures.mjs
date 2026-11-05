// Markdown images become drawing figures: a paragraph holding only
// ![alt](src "caption") turns into <figure class="fig"> with a numbered caption.
// Raw <figure class="fig"> blocks (videos, theme-swapped screenshots) count toward the numbering too.

import fs from "node:fs";

// Pixel size of a PNG or JPEG in public/, so figures reserve their space before loading.
function imageSize(src) {
  try {
    const b = fs.readFileSync(new URL(`../../public${src}`, import.meta.url));
    if (b[0] === 0x89) return [b.readUInt32BE(16), b.readUInt32BE(20)];
    for (let i = 2; i < b.length; ) {
      const marker = b[i + 1], len = b.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xc3) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + len;
    }
  } catch { /* missing file: leave the size off */ }
  return null;
}

const isWs = (n) => n.type === "text" && !n.value.trim();
const text = (value) => ({ type: "text", value });
const span = (props, children) => ({ type: "element", tagName: "span", properties: props, children });

export default function figures() {
  return (tree) => {
    let n = 0;
    const caption = (title) => ({
      type: "element", tagName: "figcaption", properties: {},
      children: [span({ className: ["mono"] }, [text(`Fig. ${++n}`)]), span({}, [text(title)])],
    });
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((c) => {
        if (c.type === "element" && c.tagName === "p") {
          const kids = c.children.filter((k) => !isWs(k));
          if (kids.length === 1 && kids[0].tagName === "img" && kids[0].properties.title) {
            const img = kids[0];
            const title = img.properties.title;
            delete img.properties.title;
            // the first figure is usually the largest thing on screen, so fetch it right away
            if (n === 0) img.properties.fetchPriority = "high"; else img.properties.loading = "lazy";
            img.properties.decoding = "async";
            const size = imageSize(img.properties.src);
            if (size) [img.properties.width, img.properties.height] = size;
            return { type: "element", tagName: "figure", properties: { className: ["fig"] }, children: [img, caption(title)] };
          }
        }
        // raw HTML figures arrive as an unparsed string: <figure class="fig" data-caption="...">
        if (c.type === "raw" && /<figure class="fig" data-caption="/.test(c.value)) {
          c.value = c.value.replace(/<figure class="fig" data-caption="([^"]*)">([\s\S]*?)<\/figure>/g, (_, cap, inner) =>
            `<figure class="fig">${inner}<figcaption><span class="mono">Fig. ${++n}</span><span>${cap}</span></figcaption></figure>`);
          return c;
        }
        // or, if a raw-HTML parser ran first, as elements
        if (c.type === "element" && c.tagName === "figure" && c.properties.dataCaption) {
          const title = c.properties.dataCaption;
          delete c.properties.dataCaption;
          c.children = [...c.children.filter((k) => !isWs(k)), caption(title)];
          return c;
        }
        walk(c);
        return c;
      });
    };
    walk(tree);
  };
}
