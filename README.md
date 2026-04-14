# typograms

Render `typograms` fenced code blocks inside VS Code built-in Markdown Preview using Google Typograms.

Official project: [Google Typograms](https://github.com/google/typograms)

Logo source: official Typograms website header wordmark (`Typograms`) at [google.github.io/typograms](https://google.github.io/typograms/).
Packaged extension icon uses PNG (`media/typograms-logo.png`) following Marketplace recommendation.

## Naming

- Extension name: `typograms`
- Package id: `typograms`

This keeps the name short and brand-like while still being discoverable by the main keyword.

## What it does

When your markdown has:

````markdown
```typograms
+----+
|    |---> My first diagram!
+----+
```
````

the built-in Markdown Preview renders it as a Typograms SVG.

## Scope

- Supported: VS Code built-in Markdown Preview
- Not in scope (MVP): third-party markdown preview extensions

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Compile:

   ```bash
   npm run compile
   ```

3. Run Extension Development Host:

   - Press `F5` in VS Code.

4. Open a markdown file with a `typograms` code block and open preview.

## Notes

- The extension ships with a local copy of the Google Typograms runtime in `media/typograms.js`.
- If Google updates their renderer, you can refresh that file from `https://google.github.io/typograms/typograms.js`.

## License & Attribution

- This extension uses Google Typograms runtime (`media/typograms.js`) from the upstream project.
- Third-party attribution details are documented in `THIRD_PARTY_NOTICES.md`.
- Apache-2.0 license texts are included in `LICENSE` and `licenses/google-typograms-LICENSE`.
- Branding references follow the upstream Typograms project identity and links.