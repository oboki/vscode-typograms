import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";
import { JSDOM } from "jsdom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const { typogramsMarkdownItPlugin } = await import(path.join(root, "out/markdownItTypograms.js"));

const sample = [
  "```typograms",
  "+----+",
  "|    |---> My first diagram!",
  "+----+",
  "```"
].join("\n");

const md = new MarkdownIt();
md.use(typogramsMarkdownItPlugin);
const rendered = md.render(sample);

assert.match(rendered, /data-typograms-block="true"/);
assert.doesNotMatch(rendered, /language-typograms/);

const dom = new JSDOM(`<!doctype html><html><body>${rendered}</body></html>`, {
  runScripts: "outside-only"
});

if (!("innerText" in dom.window.HTMLElement.prototype)) {
  Object.defineProperty(dom.window.HTMLElement.prototype, "innerText", {
    configurable: true,
    get() {
      return this.textContent ?? "";
    },
    set(value) {
      this.textContent = value;
    }
  });
}

const typogramsRuntime = await fs.readFile(path.join(root, "media/typograms.js"), "utf8");
const adapter = await fs.readFile(path.join(root, "media/preview-typograms-adapter.js"), "utf8");

dom.window.eval(typogramsRuntime);
dom.window.eval(adapter);

await new Promise((resolve) => dom.window.setTimeout(resolve, 25));

const svg = dom.window.document.querySelector("svg");
assert.ok(svg, "Expected typograms SVG output to be rendered in preview DOM");

console.log("[verify:smoke] typograms markdown preview rendering passed");