import { command } from 'cmd-ts';
import { execa } from 'execa'

export const dev = command({
    name:'dev',
    args:{},
    async handler(){
      await startClientDevServer()
    }
  })
  

async function startClientDevServer() {
  await execa('vite', {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
}