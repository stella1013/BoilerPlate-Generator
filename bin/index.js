#! /usr/bin/env node

'use strict';
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const path = require('path');
const util = require('util');
const fs = require('fs');
const { inherits } = require('node:util');
const exec = util.promisify(require('child_process').exec);
const ownPath = process.cwd();
const chalk = require('chalk');
const boxen = require('boxen');
const yargs = require("yargs");

const rl = readline.createInterface({ input, output });
const frontendRepo = 'https://github.com/stella1013/Boilerplate-Frontend-TS-Vanilla.git';
const sandboxRepo = 'https://github.com/stella1013/Boilerplate-Experimental-TS-Vanilla.git';
let repo = '';
const strings = [
    'What type of File Structure do you want to create? 1. Project, 2. Sandbox',
    'What type of Project do you want to create? Frontend, Backend ',
    'Creating ',
    'What is the Project Name'
];
const isOpen = false;
function question(){
   
}
function init(){
    rl.question(strings[0], (answer) => {
        if(answer === '1'){
            answer = 'project';

        }else{
            answer = 'sandbox'
        }
        //Creating 'frontend'
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
    /* const greeting = chalk.white.bold("Hello!");
    
    const boxenOptions = {
     padding: 1,
     margin: 1,
     borderStyle: "round",
     borderColor: "green",
     backgroundColor: "#555555"
    };
    const msgBox = boxen( greeting, boxenOptions );
    
    console.log(msgBox); */
   /*  var argv = require('yargs/yargs')(process.argv.slice(2))
  .option('size', {
    alias: 's',
    describe: 'choose a size',
    choices: ['xs', 's', 'm', 'l', 'xl']
  })
  .argv;
    const options = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .argv;

    const greeting = `Hello, ${options.name}!`;

    console.log(greeting); */
	
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
    if(folderName === 'project'){
        repo = frontendRepo;
        folderName = 'frontend';
    }else{
        repo = sandboxRepo;
    }
	try {
		console.log('\x1b[33m', 'Downloading the project structure...', '\x1b[0m');
		await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
		console.log(`    cd ${folderName}`);
	    console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m');
		await runCmd('npm install --save-dev  @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-proposal-private-methods @babel/plugin-transform-modules-commonjs @babel/plugin-transform-runtime @babel/preset-env @babel/preset-typescript @types/jest @types/node babel-jest babel-loader commitizen css-loader cz-conventional-changelog dotenv-webpack file-loader file-replace-loader html-loader-jest html-loader html-webpack-plugin husky jest-environment-jsdom jest-serializer-html jest mini-css-extract-plugin sass-loader@ sass standard-version style-loader ts-jest ts-node typescript webpack-cli webpack-dev-server webpack');
		console.log();


		console.log(
			'\x1b[32m',
			'The installation is done, this is ready to use !',
			'\x1b[0m'
		);
		console.log();

		console.log('\x1b[34m', 'You can start dev server by typing:');
		console.log('    npm start', '\x1b[0m');
		console.log();
		console.log('Check Readme.md for more informations');
		console.log();
	} catch (error) {
		console.log(error);
	}
}