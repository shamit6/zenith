import { command } from 'cmd-ts';

export const dev = command({
    name:'dev',
    args:{},
    handler(){
     throw new Error('Not implemented yet') 
    }
  })
  