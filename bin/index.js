#! /usr/bin/env node

const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');
const translate = require('@vitalets/google-translate-api');

const logo = figlet.textSync('Translator CLI', { font: 'ANSI Shadow' });

console.log(chalk.cyan(logo));

const question = [{
    type: 'input',
    name: 'sentence',
    message: 'Enter a word/sentence to translate into Chinese:',
    default: 'Hello world!',
}, {
    type: 'list',
    name: 'loop',
    message: 'Do you want to translate another one?',
    choices: ['Yes', 'No'],
    default: true,
}];

const translateAndAsk = () => {
    inquirer.prompt(question[0]).then((answers) => {
        translate(answers.sentence, { to: 'zh-CN' }).then(res => {
            console.log(chalk.cyan(res.text), '\n');

            inquirer.prompt(question[1]).then((answers) => {
                if (answers.loop === 'Yes') {
                    translateAndAsk();
                } else {
                    console.log('\n', chalk.cyan('Thank you for using Translator CLI'));
                }
            });
        }).catch(err => {
            console.error(chalk.red(err));
        });
    });
};

translateAndAsk();