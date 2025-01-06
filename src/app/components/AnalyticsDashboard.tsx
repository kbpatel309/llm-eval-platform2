import { useEffect, useState } from 'react';

type PromptResult = {
  id: number;
  prompt: string;
  model: string;
  response: string;
  accuracy: number;
  relevance: number;
  responseTime: number;
  createdAt: string;
};

export default function AnalyticsDashboard() {
  const [data, setData] = useState<PromptResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      {data.map((result) => (
        <div key={result.id}>
          <p>Prompt: {result.prompt}</p>
          <p>Model: {result.model}</p>
          <p>Accuracy: {result.accuracy.toFixed(2)}%</p>
          <p>Relevance: {result.relevance.toFixed(2)}%</p>
          <p>Response Time: {result.responseTime}ms</p>
          <p>Date: {new Date(result.createdAt).toLocaleString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
