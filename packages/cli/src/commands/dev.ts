import { command } from 'cmd-ts';
import { execa } from 'execa'
import {join} from 'path'
import { generateClientApp } from '../generateClientApp.js';

export const dev = command({
    name:'dev',
    args:{},
    async handler(){
      const appDir = process.cwd()
      const generatedAppDir = await generateClientApp(appDir)
      await startClientDevServer(generatedAppDir)
    }
  })
  

async function startClientDevServer(cwd: string) {
  await execa(join(import.meta.dirname,'../../node_modules/.bin/vite'), {
    cwd,
    stdio: 'inherit',
  })
}