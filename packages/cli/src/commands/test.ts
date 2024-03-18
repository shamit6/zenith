import { command, restPositionals } from 'cmd-ts';
import { execa } from 'execa'

export const test = command({
    name:'test',
    args:{
        rest: restPositionals()
    },
    async handler({ rest }) {
        await Promise.allSettled([
          execa('vitest', ['run', ...rest], {
            cwd: process.cwd(),
            stdio: 'inherit',
          }),
          execa('go', ['test', ...rest], {
            cwd: process.cwd(),
            stdio: 'inherit',
          })
        ])
      }
  })
  