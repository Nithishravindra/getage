#!/usr/bin/env node
"use strict"
const pkg = require('./package.json');
const moment = require('moment');
const conf = require('conf');
require('moment-countdown');

const args = process.argv.slice(2);
const config = new conf({
    projectName: 'get-your-age'
});

const print_age = () => {
    const date = config.get('dateOfBirth')
    if (date === undefined) {
        go_help();
    } else {
        const age = moment(date).countdown().toString();
        console.log('You are '+ age + ' old.')
    }
}

const go_help = () => {
    return console.log(`
  
      To know your age:
      $ get-your-age
  
      To set your date of birth:
      $ get-your-age YYYY-MM-DD (ISO Format)
  
      To remove previously set date of birth:
      $ get-your-age clear
  
      To output version:
      $ get-your-age version|--version|-v
  
      To output this help message:
      $ get-your-age help|--help|-h
    `);
}

const version = () => {
    return console.log(pkg.version);
}

const delete_age = () => {
    config.clear();
    return console.log('Date of Birth Removed.');
}

const set_age = (date) => {
    if (moment(date).isValid() === true) {
        config.set('dateOfBirth', date);
    } else {
        go_help();
    }
}

if (args.length > 0) {
    switch (args[0]) {
        case 'help':
        case '--help':
        case '-h': go_help();
            break;
        case 'clear': delete_age();
            break;
        case 'version':
        case '--version':
        case '-v': version();
            break;
        default: {
            const date = args[0];
            set_age(date)
            break;
        }
    }
} else {
    print_age();
}

