import { subcommands, run } from 'cmd-ts';
import * as cmds from './commands';

const zenith = subcommands({
  name: 'zenith',
  cmds,
});


run(zenith, process.argv.slice(2));