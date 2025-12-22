import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ensure VITE_* vars are available at build-time in all environments.
  // (Some preview environments may not inject .env the usual way.)
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const VITE_SUPABASE_URL =
    env.VITE_SUPABASE_URL || "https://jqpjqscnxoauiyrvilnk.supabase.co";
  const VITE_SUPABASE_PUBLISHABLE_KEY =
    env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcGpxc2NueG9hdWl5cnZpbG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzOTE4OTUsImV4cCI6MjA4MTk2Nzg5NX0.Q42SMDdkPQDkvxlyMblfNvcLdsm4oPYnTvP-4ubZdqs";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Provide compile-time fallbacks so the Supabase client never sees undefined.
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(VITE_SUPABASE_URL),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
        VITE_SUPABASE_PUBLISHABLE_KEY
      ),
    },
  };
});
