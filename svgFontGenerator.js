import webfontsGenerator from '@vusion/webfonts-generator';
import fs from 'node:fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const red = '\x1b[31m';
const green = '\x1b[32m';
const reset = '\x1b[0m';
const blue = '\x1b[34m';

/***
 * This module build icon font from icons
 * It is accept two cli args first one is icons dir - where your desirable icons are placed
 * second cli argument represents destination dir for built icon font files
 * You can launch this module separately from building process
 * 
 * Usage example of built icon font: <i class="icon icon-{icon-name}"/>
 * where's icon name is name of original svg file. You can place that html code everywhere in your template
 * 
 */

console.log(blue, `- Building icons from dir: ${process.argv[2]} to destination dir: ${process.argv[3]}`,reset )
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folderPath = resolve(__dirname, process.argv[2]);

const icons = fs.readdirSync(folderPath).map(file => resolve(folderPath, file));

webfontsGenerator({
  files: icons,
  dest: process.argv[3],
}, function(error) {
  if (error) {
    console.log(red + 'Fail!' + reset, error);
  } else {
    console.log(green + 'Done!' + reset);
  }
});