import { command } from "cmd-ts";
import { execa } from "execa";
import { join } from "path";
import { generateClientApp } from "../generateClientApp.js";
import { generateServer } from "../generateServer.js";

export const dev = command({
  name: "dev",
  args: {},
  async handler() {
    const appDir = process.cwd();
    const cliPackageDir = join(import.meta.dirname ?? __dirname, "..");

    const generatedAppDir = await generateClientApp(appDir, cliPackageDir);
    await generateServer(appDir, cliPackageDir);

    await Promise.all([
      startServerDevServer(generatedAppDir),
      startClientDevServer(generatedAppDir, cliPackageDir),
    ]);
  },
});

async function startClientDevServer(cwd: string, cliPackageDir: string) {
  await execa(join(cliPackageDir, "../node_modules/.bin/vite"), {
    cwd,
    stdio: "inherit",
  });
}

async function startServerDevServer(cwd: string) {
  await execa("go", ["run", "server/server.go"], {
    cwd,
    stdio: "inherit",
  });
}
