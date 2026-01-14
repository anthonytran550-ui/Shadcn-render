'use client';

import { useState, useCallback } from 'react';
import {
  DataProvider,
  ActionProvider,
  VisibilityProvider,
  useUIStream,
  Renderer,
} from '@json-render/react';
import { componentRegistry } from '@/components/ui-components';

// Sample data for the dashboard
const INITIAL_DATA = {
  analytics: {
    revenue: 125000,
    growth: 0.15,
    customers: 1234,
    orders: 567,
    salesByRegion: [
      { label: 'US', value: 45000 },
      { label: 'EU', value: 35000 },
      { label: 'Asia', value: 28000 },
      { label: 'Other', value: 17000 },
    ],
    recentTransactions: [
      { id: 'TXN001', customer: 'Acme Corp', amount: 1500, status: 'completed', date: '2024-01-15' },
      { id: 'TXN002', customer: 'Globex Inc', amount: 2300, status: 'pending', date: '2024-01-14' },
      { id: 'TXN003', customer: 'Initech', amount: 890, status: 'completed', date: '2024-01-13' },
      { id: 'TXN004', customer: 'Umbrella Co', amount: 4200, status: 'completed', date: '2024-01-12' },
    ],
  },
  form: {
    dateRange: '',
    region: '',
  },
};

// Action handlers
const ACTION_HANDLERS = {
  export_report: () => {
    alert('Exporting report... (demo)');
  },
  refresh_data: () => {
    alert('Refreshing data... (demo)');
  },
  view_details: (params: Record<string, unknown>) => {
    alert(`Viewing details for: ${JSON.stringify(params)}`);
  },
  apply_filter: () => {
    alert('Applying filters... (demo)');
  },
};

function DashboardContent() {
  const [prompt, setPrompt] = useState('');

  const {
    tree,
    isStreaming,
    error,
    send,
    clear,
  } = useUIStream({
    api: '/api/generate',
    onError: (err) => console.error('Generation error:', err),
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!prompt.trim()) return;
      await send(prompt, { data: INITIAL_DATA });
    },
    [prompt, send]
  );

  const examplePrompts = [
    'Show me a revenue dashboard with key metrics and a chart of sales by region',
    'Create a transactions table with recent orders',
    'Build a widget showing customer count with a trend indicator',
    'Make a simple card with total revenue and an export button',
  ];

  const hasElements = tree && Object.keys(tree.elements).length > 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: 700,
            color: '#111827',
          }}
        >
          json-render Dashboard Demo
        </h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '16px' }}>
          AI-powered widget generation with guardrails. Only catalog components can be generated.
        </p>
      </div>

      {/* Input Form */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '20px',
          marginBottom: '24px',
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the widget you want to create..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '15px',
                outline: 'none',
              }}
              disabled={isStreaming}
            />
            <button
              type="submit"
              disabled={isStreaming || !prompt.trim()}
              style={{
                padding: '12px 24px',
                backgroundColor: isStreaming ? '#9ca3af' : '#6366f1',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 500,
                cursor: isStreaming ? 'not-allowed' : 'pointer',
              }}
            >
              {isStreaming ? 'Generating...' : 'Generate'}
            </button>
            <button
              type="button"
              onClick={clear}
              style={{
                padding: '12px 20px',
                backgroundColor: '#fff',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>

          {/* Example Prompts */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280', marginRight: '4px' }}>
              Try:
            </span>
            {examplePrompts.map((example, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPrompt(example)}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#4b5563',
                  cursor: 'pointer',
                }}
              >
                {example.slice(0, 40)}...
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fca5a5',
            borderRadius: '8px',
            marginBottom: '24px',
            color: '#991b1b',
          }}
        >
          <strong>Error:</strong> {error.message}
        </div>
      )}

      {/* Generated UI */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '24px',
          minHeight: '300px',
        }}
      >
        {!hasElements && !isStreaming ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
            <p style={{ fontSize: '16px', margin: 0 }}>
              Enter a prompt above to generate a dashboard widget
            </p>
          </div>
        ) : tree ? (
          <Renderer
            tree={tree}
            registry={componentRegistry}
            loading={isStreaming}
          />
        ) : null}
      </div>

      {/* Debug: Show generated JSON */}
      {hasElements && (
        <details style={{ marginTop: '24px' }}>
          <summary
            style={{
              cursor: 'pointer',
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '8px',
            }}
          >
            View Generated JSON
          </summary>
          <pre
            style={{
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              padding: '16px',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '12px',
            }}
          >
            {JSON.stringify(tree, null, 2)}
          </pre>
        </details>
      )}

      {/* Info Box */}
      <div
        style={{
          marginTop: '32px',
          padding: '20px',
          backgroundColor: '#eff6ff',
          borderRadius: '8px',
          border: '1px solid #bfdbfe',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#1e40af' }}>
          How json-render Works
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: '20px',
            color: '#1e40af',
            fontSize: '14px',
            lineHeight: 1.6,
          }}
        >
          <li>
            <strong>Guardrails:</strong> AI can only generate components from the catalog (Card,
            Metric, Chart, etc.)
          </li>
          <li>
            <strong>Data Binding:</strong> Components reference data paths like{' '}
            <code>/analytics/revenue</code>
          </li>
          <li>
            <strong>Named Actions:</strong> Buttons declare actions like{' '}
            <code>export_report</code> - you control what they do
          </li>
          <li>
            <strong>Your Design System:</strong> The catalog maps to your actual React components
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DataProvider initialData={INITIAL_DATA}>
      <VisibilityProvider>
        <ActionProvider handlers={ACTION_HANDLERS}>
          <DashboardContent />
        </ActionProvider>
      </VisibilityProvider>
    </DataProvider>
  );
}
