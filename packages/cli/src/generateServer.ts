import { ensureDir, remove, copyFile } from "fs-extra";
import { join } from "node:path";

export async function generateServer(appDir: string, cliPackageDir: string) {
  const generatedServerDir = join(appDir, "dist/.generated/server");

  await remove(generatedServerDir);
  await ensureDir(generatedServerDir);

  const assetsDir = join(cliPackageDir, "../src/assetsForTemplate");

  await copyFile(
    join(assetsDir, "server.go"),
    join(generatedServerDir, "server.go")
  );

  return generatedServerDir;
}
