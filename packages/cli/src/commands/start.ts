import { command } from 'cmd-ts';

export const start = command({
    name:'start',
    args:{},
    handler(){
     throw new Error('Not implemented yet') 
    }
  })
  