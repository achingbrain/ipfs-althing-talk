import { cli } from 'ipfs-cli'
import { getIpfs } from 'ipfs-cli/utils'

export default {
  handler: async (args, session) => {
    let ctx = {
      print: session.api.print,
      getStdin: () => {},
      repoPath: () => '/home/alex/.jsipfs',
      cleanup: () => {},
      isDaemon: false,
      ipfs: undefined
    }

    try {
      await cli(args._, async (argv) => {
        if (!['daemon', 'init'].includes(args._[0])) {
          // @ts-expect-error argv as no properties in common
          const { ipfs, isDaemon, cleanup } = await getIpfs(argv)

          ctx = {
            ...ctx,
            ipfs,
            isDaemon,
            cleanup
          }
        }

        argv.ctx = ctx
      })
    } catch (/** @type {any} */ err) {
      // TODO: export errors from ipfs-repo to use .code constants
      if (err.code === 'ERR_INVALID_REPO_VERSION') {
        err.message = 'Incompatible repo version. Migration needed. Pass --migrate for automatic migration'
      }

      if (err.code === 'ERR_NOT_ENABLED') {
        err.message = `no IPFS repo found in ${ctx.repoPath}.\nplease run: 'ipfs init'`
      }

      // Handle yargs errors
      if (err.code === 'ERR_YARGS') {
        err.yargs.showHelp()
        session.api.print('\n')
        session.api.print(`Error: ${err.message}`)
      } else if (log.enabled) {
        // Handle commands handler errors
        log(err)
      } else {
        session.api.print(err.message)
      }

      exitCode = 1
    } finally {
      await ctx.cleanup()
    }

    if (args._[0] === 'daemon') {
      // don't shut down the daemon process
      return
    }
  },
  args: {
    string: [
      0, 1, 2, 3, 4, 5
    ]
  }
}
