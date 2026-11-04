// The managed preview passes --strictPort: serve the verified static build there.
// Normal `npm run dev` launches the Next.js development server.
import { spawn } from "node:child_process";
const args = process.argv.slice(2);
const preview = args.includes("--strictPort");
const portIndex = args.indexOf("--port");
const port = portIndex >= 0 ? args[portIndex + 1] : "3000";
const command = preview
  ? ["node_modules/serve/build/main.js", "out", "--listen", port]
  : ["node_modules/next/dist/bin/next", "dev", ...args];
const child = spawn(process.execPath, command, { stdio: "inherit" });
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 0));
