#!/usr/bin/env ts-node

import inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
import { Answers, Question, QuestionArray } from 'inquirer/dist/cjs/types/types';

const templateDir = path.join(__dirname, '../template');
const currentDir = process.cwd();
const questions: QuestionArray<Question<Answers>> = [
  {
    name: 'projectName',
    type: 'input',
    message: 'Project name:',
    validate: function (input: string) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    name: 'author',
    type: 'input',
    message: 'Author name:',
  },
  {
    name: 'lua54',
    type: 'confirm',
    message: 'Enable Lua 5.4?',
    default: false,
  },
  {
    name: 'esx',
    type: 'confirm',
    message: 'Include ESX Import?',
    default: false,
  }
];

inquirer.prompt<Answers>(questions).then((answers) => {
  const { projectName, author, lua54, esx } = answers;
  const projectPath = path.join(currentDir, projectName);

  if (fs.existsSync(projectPath)) {
    console.log(`Folder ${projectName} exists. Delete or use another name.`);
    return;
  }

  fs.mkdirSync(projectPath);

  createDirectoryContents(templateDir, projectPath, { projectName, author, lua54, esx });
});

function createDirectoryContents(templatePath: string, newProjectPath: string, options: any) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file: string) => {
    const origFilePath = path.join(templatePath, file);

    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');

      contents = contents.replace(/<project-name>/g, options.projectName);
      contents = contents.replace(/--<AUTHOR>--/g, `author '${options.author}'`);
      contents = contents.replace(/--<LUA54>--.*(\r?\n|$)/g, options.lua54 ? 'lua54 "yes"\n' : '');
      contents = contents.replace(/[\t ]*--<ESX_IMPORT>--\r?\n?/, options.esx ? "    '@es_extended/imports.lua'\n" : '');

      const writePath = path.join(newProjectPath, file);
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(newProjectPath, file));

      createDirectoryContents(path.join(templatePath, file), path.join(newProjectPath, file), options);
    }
  });
}
