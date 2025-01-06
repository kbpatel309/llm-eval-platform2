import { useState } from "react";

export default function PromptForm() {
    const [prompt, setPrompt] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('/api/compare-llms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        setResults(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                    className="prompt-input"
                />
            </form>
            <div className="results">
                {results.map((result, index) => (
                    <div key={index}>
                        <h3>{result.model}</h3>
                        <p>Response: {result.response}</p>
                        <p>Accuracy: {result.accuracy.toFixed(2)}%</p>
                        <p>Relevance: {result.relevance.toFixed(2)}%</p>
                        <p>Response Time: {result.responseTime}ms</p>
                    </div>
                ))}
            </div>
        </div>
    );
}