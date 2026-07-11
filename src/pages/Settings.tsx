import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/common/Card";
import { getAiConfig, saveAiConfig } from "@/services/storageService";

export default function Settings() {
  const [config, setConfig] = useState({ apiKey: "", model: "gpt-4o-mini" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(getAiConfig());
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveAiConfig(config);
    setSaved(true);
  };

  return (
    <AppLayout title="Settings" subtitle="Store your OpenAI details locally for API-backed generation.">
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="label-text">OpenAI API Key</span>
            <input
              className="input-field"
              type="password"
              value={config.apiKey}
              onChange={(event) => setConfig((current) => ({ ...current, apiKey: event.target.value }))}
              placeholder="sk-..."
            />
          </label>

          <label className="block">
            <span className="label-text">Model</span>
            <input
              className="input-field"
              value={config.model}
              onChange={(event) => setConfig((current) => ({ ...current, model: event.target.value }))}
              placeholder="gpt-4o-mini"
            />
          </label>

          <button className="btn-primary" type="submit">
            Save OpenAI settings
          </button>

          {saved ? <p className="text-sm text-emerald-600">Saved locally in your browser.</p> : null}
          <p className="text-sm text-surface-900/60">
            The planner uses the built-in rule-based engine by default. If you add an API key, it will try the OpenAI model first and gracefully fall back to the local planner if the request fails.
          </p>
        </form>
      </Card>
    </AppLayout>
  );
}
