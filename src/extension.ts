import * as vscode from "vscode";
import type MarkdownIt from "markdown-it";
import { typogramsMarkdownItPlugin } from "./markdownItTypograms";

const output = vscode.window.createOutputChannel("typograms");

export function activate(): { extendMarkdownIt: (md: MarkdownIt) => MarkdownIt } {
  output.appendLine("[activate] typograms extension activated.");

  return {
    extendMarkdownIt(md: MarkdownIt): MarkdownIt {
      output.appendLine("[markdown-it] extendMarkdownIt invoked.");
      return md.use(typogramsMarkdownItPlugin, {
        log: (message: string) => output.appendLine(message)
      });
    }
  };
}

export function deactivate(): void {
  output.appendLine("[deactivate] typograms extension deactivated.");
  output.dispose();
}