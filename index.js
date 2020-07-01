/**
 * Pantheon Terminus Setup
 *
 * @package setupPantheonTerminus
 */

// External Dependencies
const core = require( '@actions/core' );
const exec = require( '@actions/exec' );

async function run() {
	try {
		const PANTHEON_MACHINE_TOKEN = core.getInput( 'pantheon-machine-token' );

		await exec.exec( 'mkdir ~/terminus && cd ~/terminus && composer require pantheon-systems/terminus' );
		await exec.exec( 'sudo ln -s ~/terminus/vendor/bin/terminus /usr/bin/terminus' ); // Sudo is required in order to install bin/terminus.
		await exec.exec( 'terminus', [ 'auth:login', `--machine-token=${ PANTHEON_MACHINE_TOKEN }` ] );
	} catch ( error ) {
		core.setFailed( error.message );
	}
}

run()
