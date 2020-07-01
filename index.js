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

		await exec.exec( 'mkdir terminus');
		await exec.exec( 'cd terminus');
		await exec.exec( 'composer require pantheon-systems/terminus' );
		await exec.exec( 'cd..');
		await exec.exec( 'alias terminus=terminus/vendor/bin/terminus' );
		await exec.exec( 'terminus', [ 'auth:login', `--machine-token=${ PANTHEON_MACHINE_TOKEN }` ] );
	} catch ( error ) {
		core.setFailed( error.message );
	}
}

run()
