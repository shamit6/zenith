import { dirname, extname, join, relative } from "path";
import { copy, readdir, rename, remove, readFile, writeFile } from "fs-extra";

const assetsForTemplateDir = "assetsForTemplate";

export async function generateClientApp(appDir: string, cliPackageDir: string) {
  const generatedAppDir = join(appDir, "dist/.generated");

  await remove(generatedAppDir);
  await copy(join(appDir, "app"), generatedAppDir);
  const pages = await renamePages(generatedAppDir);
  await copyAssets(
    join(cliPackageDir, "../src", assetsForTemplateDir),
    generatedAppDir,
    pages
  );

  return generatedAppDir;
}

async function renamePages(dir: string) {
  const files = await readdir(dir, { recursive: true });

  const pages = await Promise.all(
    files
      .filter((file) => {
        return file.toString().endsWith("page.tsx");
      })
      .map(async (file) => {
        const dest = join(
          dir,
          dirname(file.toString()),
          `index${extname(file.toString())}`
        );
        await rename(join(dir, file.toString()), dest);
        return dest;
      })
  );

  return pages;
}

async function copyAssets(
  assetsDir: string,
  projectDir: string,
  pages: string[]
) {
  await copy(
    join(assetsDir, "vite.config.ts"),
    join(projectDir, "vite.config.ts")
  );

  await Promise.all(
    pages.map(async (page) => {
      const pageDir = dirname(page);
      const relDir = relative(projectDir, pageDir);
      await copy(join(assetsDir, "index.html"), join(pageDir, "index.html"));
      await replaceInFile(
        join(pageDir, "index.html"),
        `/react.dom.render.tsx`,
        `${relDir === "" ? "" : `/${relDir}`}/react.dom.render.tsx`
      );
      await copy(
        join(assetsDir, "react.dom.render.tsx"),
        join(pageDir, "react.dom.render.tsx")
      );
    })
  );

  // await copy(join(assetsDir, 'index.html'), join(projectDir, 'index.html'))
  //     await copy(join(assetsDir, 'react.dom.render.tsx'), join(projectDir, 'react.dom.render.tsx'))
  // await setComponentPath(join(projectDir, 'react.dom.render.tsx'), './index.tsx')
}

async function replaceInFile(
  filePath: string,
  oldText: string,
  newText: string
) {
  const data = await readFile(filePath, { encoding: "utf-8" });
  const regex = new RegExp(oldText, "g");
  const updatedText = data.replace(regex, newText);

  await writeFile(filePath, updatedText);
}
