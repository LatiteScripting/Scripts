/// <reference path="definitions/index.d.ts" />
"use strict";
let mod = new Module(
    "slimey",
    "Slimey",
    "Tells if your current chunk is a slime chunk or not. Requires chunk borders to be enabled.",
    0
)

// let borderColor = module.addColorSetting("borderColor", "Border Color", "The color of the border", new Color(0, 255, 0, 255)); //buggy but planned


client.getModuleManager().registerModule(mod);

// source: https://github.com/depressed-pho/slime-finder-pe/issues/21
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
}


client.on("render3d", (e) => {
    const cbm = client.getModuleManager().getModuleByName("ChunkBorders");
    if (!cbm.isEnabled()) return;
  
    const player = game.getLocalPlayer();
    let ppos = player.getPosition();
    const chunkX = Math.floor(ppos.x / 16);
    const chunkZ = Math.floor(ppos.z / 16);
  
    // graphics3D.setColor(borderColor.getValue());
    graphics3D.setColor(new Color(0, 1, 0, 1));
    if (slime([chunkX, chunkZ])) {
      for (let i = -64; i < 321; i++) {
          graphics3D.drawLine(new Vector3(chunkX * 16,  i, chunkZ * 16), new Vector3(chunkX * 16 + 16,  i, chunkZ * 16));
          graphics3D.drawLine(new Vector3(chunkX * 16,  i, chunkZ * 16), new Vector3(chunkX * 16,  i, chunkZ * 16 + 16));
          graphics3D.drawLine(new Vector3(chunkX * 16,  i, chunkZ * 16 + 16), new Vector3(chunkX * 16 + 16,  i, chunkZ * 16 + 16));
          graphics3D.drawLine(new Vector3(chunkX * 16 + 16,  i, chunkZ * 16), new Vector3(chunkX * 16 + 16,  i, chunkZ * 16 + 16));
      }
      for (let i=0; i<17; i++) {
          for (let j=0; j<17; j++) {
              if(i==0 || i==16 || j==0 || j==16) {
                  graphics3D.drawLine(new Vector3(chunkX*16+i, -64, chunkZ*16+j), new Vector3(chunkX*16+i, 320, chunkZ*16+j));
              }
          }
      }
    }
    graphics3D.finish(false);
})




