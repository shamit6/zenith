import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve, join } from "path";
import { readdir, exists } from "fs-extra";

export default defineConfig(async () => {
  return {
    plugins: [react()],
    server: {
      port: 2000,
    },
    build: {
      rollupOptions: {
        input: await getAllEntries(),
      },
    },
  };
});

async function getAllEntries() {
  const entries = await getEntries(__dirname);
  return entries.reduce(
    (acc, entry) => {
      acc[entry === "." ? "index" : entry] = resolve(
        __dirname,
        entry,
        "index.html"
      );
      return acc;
    },
    {} as Record<string, string>
  );
}

async function getEntries(rootDir: string, dir = "."): Promise<string[]> {
  const entries = [];
  if (await exists(join(rootDir, dir, "index.html"))) {
    entries.push(dir);
  }
  const subDirs = await readdir(join(rootDir, dir), { withFileTypes: true });
  for (const subDir of subDirs) {
    if (subDir.isDirectory()) {
      const subEntries = await getEntries(rootDir, join(dir, subDir.name));
      entries.push(...subEntries);
    }
  }

  return entries;
}
