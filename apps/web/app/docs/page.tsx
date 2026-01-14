export const metadata = {
  title: "Introduction | json-render",
};

export default function DocsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-4">Introduction</h1>
      <p className="text-muted-foreground mb-8">
        json-render is a library for building AI-powered UIs with enterprise-grade guardrails.
      </p>

      <h2 className="text-xl font-semibold mt-12 mb-4">What is json-render?</h2>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Unlike vibe-coding tools that let AI generate arbitrary code, json-render gives AI a 
        constrained vocabulary. You define what components exist, what props they take, and 
        what actions are available. AI generates JSON that matches your schema, and your 
        components render it natively.
      </p>

      <h2 className="text-xl font-semibold mt-12 mb-4">Why json-render?</h2>
      <div className="space-y-4 mb-8">
        <div>
          <h3 className="font-medium mb-1">Consistency</h3>
          <p className="text-sm text-muted-foreground">
            AI only uses your approved components. No random UI patterns.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">Safety</h3>
          <p className="text-sm text-muted-foreground">
            Actions are declared by name, you control what they do.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">Flexibility</h3>
          <p className="text-sm text-muted-foreground">
            Define a catalog, let AI generate JSON, render it your way.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-12 mb-4">How it works</h2>
      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        <li>You define the catalog — what components exist, what props they take</li>
        <li>AI generates JSON — constrained to your catalog</li>
        <li>You render it — with your own components</li>
        <li>Actions are safe — AI declares intent, you implement it</li>
      </ol>
    </article>
  );
}
