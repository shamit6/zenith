import { command } from 'cmd-ts';
import { execa } from 'execa'
import {join} from 'path'

export const dev = command({
    name:'dev',
    args:{},
    async handler(){
      await startClientDevServer()
    }
  })
  

async function startClientDevServer() {
  await execa(join(import.meta.dirname,'../../node_modules/.bin/vite'), [
    '-c',
    join(import.meta.dirname, '../vite.config.js')
  ], {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
}