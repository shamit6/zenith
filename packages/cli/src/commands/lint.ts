import { command, restPositionals } from 'cmd-ts';
import {execa} from 'execa'

export const lint = command({
    name:'lint',
    args:{
      rest: restPositionals()
    },
    async handler({ rest }) {
      await Promise.allSettled([
        execa('eslint', ['.', ...rest], {
          cwd: process.cwd(),
          stdio: 'inherit',
        }),
        execa('golangci-lint', ['run', ...rest], {
          cwd: process.cwd(),
          stdio: 'inherit',
        })
      ])
    }
  })