import type { ReactNode } from "react";
import { useApi } from "../hooks/useApi";

// renders loading/error states so pages only deal with 
export function Async<T>({ path, children }: { path: string; children: (data: T) => ReactNode }) {
  const state = useApi<T>(path);

  if (state.status === "loading") {
    return <div className="container section muted">Loading…</div>;
  }
  if (state.status === "error") {
    return (
      <div className="container section">
        <p className="notice notice-err">
          Couldn't load {path}: {state.message}. Is the API running? (<code>npm run dev</code> starts both.)
        </p>
      </div>
    );
  }
  return <>{children(state.data)}</>;
}
