import { command, subcommands, run, restPositionals } from 'cmd-ts';
import {execa} from 'execa'

const lint = command({
  name:'lint',
  args:{
    rest: restPositionals()
  },
  async handler({ rest }){
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

const build = command({
  name:'build',
  args:{},
  handler(){
   throw new Error('Not implemented yet') 
  }
})

const start = command({
  name:'start',
  args:{},
  handler(){
   throw new Error('Not implemented yet') 
  }
})

const dev = command({
  name:'dev',
  args:{},
  handler(){
   throw new Error('Not implemented yet') 
  }
})

const test = command({
  name:'test',
  args:{},
  handler(){
   throw new Error('Not implemented yet') 
  }
})


const zenith = subcommands({
  name: 'zenith',
  cmds: { lint, build, start, dev, test },
});


run(zenith, process.argv.slice(2));