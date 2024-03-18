import { dirname, extname, join } from 'path'
import { copy, readdir, rename, remove } from 'fs-extra'

export async function generateClientApp(appDir: string) {
    const generatedAppDir = join(appDir, 'dist/.generated')

    await remove(generatedAppDir)
    await copy(join(appDir, 'app'), generatedAppDir)
    await renamePages(generatedAppDir)
    await copy(join(import.meta.dirname, 'vite.config.ts'), join(generatedAppDir, 'vite.config.ts'))

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