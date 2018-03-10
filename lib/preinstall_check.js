'use strict';

// we cannot use semver here, because dependencies are not installed yet
// so the version checks get a bit messy

var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var os = require('os');

// where ioBroker is installed
var rootDir = __dirname.substr(0, __dirname.lastIndexOf("node_modules"));


function checkNpmVersion() {
    // Get npm version
    try {
        var nodeVersion = process.version;
        var npmVersion;
        try {
            npmVersion = child_process.execSync('npm -v', { encoding: "utf8" });
            if (npmVersion) npmVersion = npmVersion.trim();
            console.log('NPM version: ' + npmVersion);
        } catch (e) {
            console.error('Error trying to check npm version: ' + e);
        }

        if (!npmVersion) {
            console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.error('Aborting install because the npm version could not be checked!');
            console.error('Please check that npm is installed correctly.');
            console.error('Use "npm install -g npm@4" or "npm install -g npm@latest" to install a supported version.');
            console.error('You need to make sure to repeat this step after installing an update to NodeJS and/or npm.');
            console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            process.exit(3);
            return;
        }

        if (gte(npmVersion, "5.0.0") && lt(npmVersion, "5.7.1")) {
            console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.error('NPM 5 is only supported starting with version 5.7.1!');
            console.error('Please use "npm install -g npm@4" to downgrade npm to 4.x or ');
            console.error('use "npm install -g npm@latest" to install a supported version of npm 5!')
            console.error('You need to make sure to repeat this step after installing an update to NodeJS and/or npm.');
            console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            process.exit(4);
            return;
        }
        return npmVersion;
    }
    catch (e) {
        console.error('Could not check npm version: ' + e);
        console.error('Assuming that correct version is installed.');
    }
}

if (gte(checkNpmVersion(), "5.0.0")) {
    // disables NPM's package-lock.json on NPM >= 5 because that creates heaps of problems
    console.log("npm version >= 5: disabling package-lock")
    fs.writeFileSync(path.join(rootDir, '.npmrc'), 'package-lock=false' + os.EOL, "utf8");
}

process.exit(0);

// ======================================
// all the functions to replace `semver`:

/**
 * @typedef {{major: number, minor: number, build: number}} Version
 */
/**
 * Parses a version string
 * @param {string} version The version string to parse
 * @returns {Version | null} The parsed version
 */
function parseVersion(version) {
	var versionRegExp = /^v?(\d+)\.(\d+)\.(\d+).*?/;
	var parsed = versionRegExp.exec(version);
	if (!parsed) return null;

	return {
		major: +parsed[1],
		minor: +parsed[2],
		build: +parsed[3]
	};
}

/**
 * Checks if v1 > v2
 * @param {Version | string} v1 
 * @param {Version | string} v2 
 */
function gt(v1, v2) {
	if (typeof v1 === "string") v1 = parseVersion(v1);
	if (typeof v2 === "string") v2 = parseVersion(v2);

	if (v1.major > v2.major) return true;
	else if (v1.major < v2.major) return false;
	
	if (v1.minor > v2.minor) return true;
	else if (v1.minor < v2.minor) return false;
	
	if (v1.build > v2.build) return true;
	return false;
}

/**
 * Checks if v1 < v2
 * @param {Version | string} v1 
 * @param {Version | string} v2 
 */
function lt(v1, v2) {
	if (typeof v1 === "string") v1 = parseVersion(v1);
	if (typeof v2 === "string") v2 = parseVersion(v2);

	if (v1.major < v2.major) return true;
	else if (v1.major > v2.major) return false;
	
	if (v1.minor < v2.minor) return true;
	else if (v1.minor > v2.minor) return false;
	
	if (v1.build < v2.build) return true;
	return false;
}

/**
 * Checks if v1 == v2
 * @param {Version | string} v1 
 * @param {Version | string} v2 
 */
function eq(v1, v2) {
	if (typeof v1 === "string") v1 = parseVersion(v1);
	if (typeof v2 === "string") v2 = parseVersion(v2);

	if (v1.major !== v2.major) return false;
	if (v1.minor !== v2.minor) return false;
	if (v1.build !== v2.build) return false;
	return true;
}

/**
 * Checks if v1 != v2
 * @param {Version | string} v1 
 * @param {Version | string} v2 
 */
function ne(v1, v2) {
	return !eq(v1, v2);
}

/**
 * Checks if v1 >= v2
 * @param {Version | string} v1 
 * @param {Version | string} v2 
 */
function gte(v1, v2) {
	return gt(v1, v2) || eq(v1, v2);
}

/**
 * Checks if v1 <= v2
 * @param {Version | string} v1 
 * @param {Version | string} v2 
 */
function lte(v1, v2) {
	return lt(v1, v2) || eq(v1, v2);
}