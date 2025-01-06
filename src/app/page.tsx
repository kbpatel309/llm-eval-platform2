import PromptForm from "./components/PromptForm";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

export default function Home() {
  return (
    <main>
      <h1>LLM Evaluation Platform</h1>
      <PromptForm />
      <AnalyticsDashboard />
    </main>
  );
}
