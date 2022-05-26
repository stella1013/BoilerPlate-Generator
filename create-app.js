#! /usr/bin/env node

'use strict';
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const path = require('path');
const util = require('util');
//const packageJson = require('../package.json');
const fs = require('fs');
const { inherits } = require('node:util');
const exec = util.promisify(require('child_process').exec);
const ownPath = process.cwd();
//const folderName = '';//process.argv[2];
//const appPath = path.join(ownPath, folderName);
const frontendRepo = 'https://github.com/stella1013/Boilerplate-Frontend-TS-Vanilla.git';

const rl = readline.createInterface({ input, output });
const strings = [
    'What type of Project do you want to create? Frontend, Backend ',
    'Creating ',
    'What is the Project Name'
];
function init(){
	rl.question(strings[0], (answer) => {
		console.log(strings[1] + `${answer}`);
		//console.log(ownPath);
		console.log('\x1b[34m', 'Creating Folder...', '\x1b[0m');
		//make folder
		try {
			fs.mkdirSync(path.join(ownPath, answer));
			setup(answer);
		  } catch (err) {
			if (err.code === 'EEXIST') {
			  console.log(
				'\x1b[31m',
				`The folder ${answer} already exist in the current directory, please give it another name.`,
				'\x1b[0m'
			  );
			} else {
			  console.log(err);
			}
			process.exit(1);
		  }
	  
		rl.close();
	  });
}
function makeFolder(appName){
	
}
init();
async function runCmd(command) {
	try {
		const { stdout, stderr } = await exec(command);
		console.log(stdout);
		console.log(stderr);
	} catch {
		(error) => {
			console.log('\x1b[31m', error, '\x1b[0m');
		};
	}
}


async function setup(folderName) {
	try {
		console.log('\x1b[33m', 'Downloading the project structure...', '\x1b[0m');
		await runCmd(`git clone --depth 1 ${frontendRepo} ${folderName}`);

		console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m');
		//await runCmd('npm install');
		console.log();


		console.log(
			'\x1b[32m',
			'The installation is done, this is ready to use !',
			'\x1b[0m'
		);
		console.log();

		console.log('\x1b[34m', 'You can start by typing:');
		console.log(`    cd ${folderName}`);
		console.log('    npm start', '\x1b[0m');
		console.log();
		console.log('Check Readme.md for more informations');
		console.log();
	} catch (error) {
		console.log(error);
	}
}