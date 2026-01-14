import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

const vercelTheme = {
  name: "vercel",
  type: "dark" as const,
  colors: {
    "editor.background": "transparent",
    "editor.foreground": "#EDEDED",
  },
  settings: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#666666" },
    },
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: "#50E3C2" },
    },
    {
      scope: ["constant.numeric", "constant.language.boolean", "constant.language.null"],
      settings: { foreground: "#50E3C2" },
    },
    {
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: { foreground: "#FF0080" },
    },
    {
      scope: ["keyword.operator", "keyword.control"],
      settings: { foreground: "#FF0080" },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#7928CA" },
    },
    {
      scope: ["variable", "variable.other", "variable.parameter"],
      settings: { foreground: "#EDEDED" },
    },
    {
      scope: ["entity.name.tag", "support.class.component", "entity.name.type"],
      settings: { foreground: "#FF0080" },
    },
    {
      scope: ["punctuation", "meta.brace", "meta.bracket"],
      settings: { foreground: "#888888" },
    },
    {
      scope: ["support.type.property-name", "entity.name.tag.json", "meta.object-literal.key"],
      settings: { foreground: "#EDEDED" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#50E3C2" },
    },
    {
      scope: ["support.type.primitive", "entity.name.type.primitive"],
      settings: { foreground: "#50E3C2" },
    },
  ],
};

interface CodeProps {
  children: string;
  lang?: "json" | "tsx" | "typescript" | "bash" | "javascript";
}

export async function Code({ children, lang = "typescript" }: CodeProps) {
  const html = await codeToHtml(children.trim(), {
    lang,
    theme: vercelTheme,
  });

  return (
    <div className="group relative my-6 rounded-lg border border-border bg-card p-4 overflow-x-auto text-sm [&_pre]:bg-transparent! [&_pre]:p-0! [&_pre]:m-0! [&_code]:bg-transparent! font-mono">
      <div className="sticky top-0 float-right z-10 -mt-1 -mr-1">
        <CopyButton
          text={children.trim()}
          className="opacity-0 group-hover:opacity-100 text-muted-foreground bg-card"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
