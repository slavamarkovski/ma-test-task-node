import promptSync from 'prompt-sync';
import SeaBattle from './src/seabattle.class.js';

const prompt = promptSync();
const prompt_message = 'Press [enter] to hit, enter [i] to see the battlefield, enter [s] to see the battle summary: ';

const rows = 5;
const columns = 8

const seaBattle = new SeaBattle(rows, columns);

let hit;
let stat = seaBattle.stat();

while (stat.targets.total !== stat.hits.on_target) {
    const prompt_value = prompt(prompt_message);

    if (prompt_value === 'i') {
        console.log(seaBattle.toString());

    } else if (prompt_value === 's') {
        console.log(`Total hits: ${stat.hits.total}, on target: ${stat.hits.on_target}, targets left: ${stat.targets.left}`)

    } else if (prompt_value === '') {
        hit = seaBattle.hit();
        console.log(`Hit coordinates [${hit.coords}]: ${hit.on_target ? 'ON TARGET' : 'MISSED'}`);

    } else {
        prompt(prompt_message);
    }
    stat = seaBattle.stat();
}
stat = seaBattle.stat();

console.log(`!!! You won after ${stat.hits.total} hits !!!`);
console.log(seaBattle.toString());

prompt('Press any key...');

