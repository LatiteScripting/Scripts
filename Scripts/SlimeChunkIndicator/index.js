"use strict";
// For more documentation, go to https://latitescripting.github.io/
script.name = "Slime Chunk Indicator";
script.author = "@raspberryepicly";
script.version = "1.0.0";
// // Shows a Latite notification or "toast" at the top of the screen.
// client.showNotification(`Script ${script.name} has been loaded!`);
// https://github.com/depressed-pho/slime-finder-pe/issues/21
// const slime=m=>{//der MersenneTwister m=[chunkX,chunkZ]
// 	m=Math.imul(m[0],0x1f1f1f1f)^m[1];
// 	const f=(x,y)=>Math.imul(x^x>>>30,0x6c078965)+y,a=m&0x80000000|(m=f(m,1))&0x7fffffff;
// 	for(let i=2;i<398;i++)m=f(m,i);
// 	m^=a>>> 1 ^[0,0x9908b0df][a&1];
// 	m^=m>>>11;
// 	m^=m<<  7 &0x9d2c5680;
// 	m^=m<< 15 &0xefc60000;
// 	m^=m>>>18;
// 	return!((m>>>0)%10);
// };
const slime = (m) => {
    m = [Math.imul(m[0], 0x1f1f1f1f) ^ m[1], m[1]]; // Ensure m is an array with two numbers
    const f = (x, y) => Math.imul(x ^ (x >>> 30), 0x6c078965) + y;
    let a = (m[0] & 0x80000000) | ((m[0] = f(m[0], 1)) & 0x7fffffff);
    for (let i = 2; i < 398; i++) {
        m[0] = f(m[0], i);
    }
    m[0] ^= a >>> 1 ^ [0, 0x9908b0df][a & 1];
    m[0] ^= m[0] >>> 11;
    m[0] ^= (m[0] << 7) & 0x9d2c5680;
    m[0] ^= (m[0] << 15) & 0xefc60000;
    m[0] ^= m[0] >>> 18;
    return !((m[0] >>> 0) % 10);
};
// Declares a module inside of the variable "exampleModule"
let exampleModule = new Module("slimechecker", "Slime Chunk Indicator", "Press the keybind and this module will notify\ntelling you if your in a slime chunk", 117);
// Registers the module in Latite Client. With this line, the module will show in the Mod Menu.
client.getModuleManager().registerModule(exampleModule);
client.on("key-press", (e) => {
    const player = game.getLocalPlayer();
    if (exampleModule !== null && player !== null && e.isDown) { //i like ts error checking
        if (e.keyCode === exampleModule.key) {
            const pos = player.getPos();
            const chunkX = Math.floor(pos.x / 16);
            const chunkZ = Math.floor(pos.z / 16);
            const isSlimeChunk = slime([chunkX, chunkZ]);
            if (isSlimeChunk) {
                script.log(`[§aSlime Chunk Indicator§r] §aYou are in a slime chunk!`);
            }
            else {
                script.log(`[§aSlime Chunk Indicator§r] §cYou are not in a slime chunk!`);
            }
        }
    }
});
