import { command, subcommands, run } from 'cmd-ts';

const lint = command({
  name:'lint',
  args:{},
  handler(){
   throw new Error('Not implemented yet') 
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