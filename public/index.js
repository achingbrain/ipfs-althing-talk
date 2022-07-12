import {
  createTerminal
} from 'terminatorator'
import md from './md.js'
// import ipfs from './ipfs.js'

import slide0 from './slides/0.md?raw'
import slide1 from './slides/1.md?raw'
import slide2 from './slides/2.md?raw'
import slide3 from './slides/3.md?raw'
import slide4 from './slides/4.md?raw'
import slide5 from './slides/5.md?raw'
import slide6 from './slides/6.md?raw'
import slide7 from './slides/7.md?raw'

createTerminal(document.getElementById('terminal'), {
  welcome: `<pre>
   _           _        __
  (_)___      (_)_ __  / _|___
  | / __|_____| | '_ \\| |_/ __|
  | \\__ \\_____| | |_) |  _\\__ \\
 _/ |___/     |_| .__/|_| |___/
|__/            |_|
   ____     _____  ___  ___  __   _     _
  / __ \\    \\_   \\/ _ \\/ __\\/ _\\ | |__ (_)_ __   __ _
 / / _\` |    / /\\/ /_)/ _\\  \\ \\  | '_ \\| | '_ \\ / _\` |
| | (_| | /\\/ /_/ ___/ /    _\\ \\ | |_) | | | | | (_| |
 \\ \\__,_| \\____/\\/   \\/     \\__/ | .__/|_|_| |_|\\__, |
  \\____/                         |_|            |___/
</pre>
<br/>`, // will be printed on start
  theme: 'interlaced', // || 'modern' || 'white' - can be changed at runtime
    // using the `theme` command
  commands: {
    '/usr/local/bin/md': md,
    // '/usr/local/bin/ipfs': ipfs
  }, // see `Adding custom commands` below
  files: {
    '~/Documents/talks/js-ipfs-althing/0.md': {
      content: slide0
    },
    '~/Documents/talks/js-ipfs-althing/1.md': {
      content: slide1
    },
    '~/Documents/talks/js-ipfs-althing/2.md': {
      content: slide2
    },
    '~/Documents/talks/js-ipfs-althing/3.md': {
      content: slide3
    },
    '~/Documents/talks/js-ipfs-althing/4.md': {
      content: slide4
    },
    '~/Documents/talks/js-ipfs-althing/5.md': {
      content: slide5
    },
    '~/Documents/talks/js-ipfs-althing/6.md': {
      content: slide6
    },
    '~/Documents/talks/js-ipfs-althing/7.md': {
      content: slide7
    }
  },
  history: 'cli-history', // the localStorage key used to store terminal history
  user: 'alex' // which user to be logged in as
})
