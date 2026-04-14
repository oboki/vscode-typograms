import type MarkdownIt from "markdown-it";

type TypogramsPluginOptions = {
  log?: (message: string) => void;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function typogramsMarkdownItPlugin(md: MarkdownIt, options?: TypogramsPluginOptions): void {
  const log = options?.log;
  log?.("[markdown-it] typograms plugin installed.");

  const defaultFence =
    md.renderer.rules.fence?.bind(md.renderer.rules) ??
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const language = token.info.trim().split(/\s+/, 1)[0]?.toLowerCase();

    if (language !== "typograms") {
      return defaultFence(tokens, idx, options, env, self);
    }

    log?.(`[markdown-it] transformed typograms fence at token index ${idx}.`);

    const escapedSource = escapeHtml(token.content);

    return [
      '<div class="typograms-source" data-typograms-block="true">',
      `<pre>${escapedSource}</pre>`,
      "</div>"
    ].join("");
  };
}