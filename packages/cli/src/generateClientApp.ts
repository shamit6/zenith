import { dirname, extname, join } from 'path'
import { copy, readdir, rename, remove } from 'fs-extra'

const assetsForTemplateDir = 'assetsForTemplate'

export async function generateClientApp(appDir: string) {
    const generatedAppDir = join(appDir, 'dist/.generated')

    await remove(generatedAppDir)
    await copy(join(appDir, 'app'), generatedAppDir)
    await renamePages(generatedAppDir)
    await copyAssets(join(import.meta.dirname, '../src', assetsForTemplateDir), generatedAppDir)

    return generatedAppDir
}

async function renamePages(dir: string) {
    const files = await readdir(dir, {recursive: true})
    
    await Promise.all(files.filter(file=>{
        return file.toString().endsWith('page.tsx')
    }).map(file=>{
        return rename(join(dir, file.toString()), join(dir, dirname(file.toString()),`index${extname(file.toString())}`))
    }))
}

async function copyAssets(assetsDir: string, projectDir: string) {
    await copy(join(assetsDir, 'vite.config.ts'), join(projectDir, 'vite.config.ts'))
    await copy(join(assetsDir, 'index.html'), join(projectDir, 'index.html'))

    await copy(join(assetsDir, 'react.dom.render.tsx'), join(projectDir, 'react.dom.render.tsx'))
    // await setComponentPath(join(projectDir, 'react.dom.render.tsx'), './index.tsx')
}