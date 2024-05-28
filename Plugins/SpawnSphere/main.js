"use strict";
/// <reference path="C:/l-api/defs/index.d.ts"/>
//triangle
function generateSphereTrianglesPoints(center, radius, resolution) {
    const points = [];
    // Calculate phi and theta angles for each segment
    const phiStep = Math.PI / resolution;
    const thetaStep = 2 * Math.PI / resolution;
    for (let phi = 0; phi < Math.PI; phi += phiStep) {
        for (let theta = 0; theta < 2 * Math.PI; theta += thetaStep) {
            // Calculate spherical coordinates
            const x = radius * Math.sin(phi) * Math.cos(theta) + center.x;
            const y = radius * Math.sin(phi) * Math.sin(theta) + center.y;
            const z = radius * Math.cos(phi) + center.z;
            // Create a new Vector3 for the point
            const point = new Vector3(x, y, z);
            if (phi < Math.PI - phiStep && theta < 2 * Math.PI - thetaStep) {
                const nextThetaPoint = new Vector3(radius * Math.sin(phi) * Math.cos(theta + thetaStep) + center.x, radius * Math.sin(phi) * Math.sin(theta + thetaStep) + center.y, radius * Math.cos(phi) + center.z);
                const upperPoint = new Vector3(radius * Math.sin(phi + phiStep) * Math.cos(theta) + center.x, radius * Math.sin(phi + phiStep) * Math.sin(theta) + center.y, radius * Math.cos(phi + phiStep) + center.z);
                points.push([point, nextThetaPoint, upperPoint]);
                const nextPhiNextThetaPoint = new Vector3(radius * Math.sin(phi + phiStep) * Math.cos(theta + thetaStep) + center.x, radius * Math.sin(phi + phiStep) * Math.sin(theta + thetaStep) + center.y, radius * Math.cos(phi + phiStep) + center.z);
                points.push([nextThetaPoint, upperPoint, nextPhiNextThetaPoint]);
            }
        }
    }
    return points;
}
//quads
function generateSphereQuadPoints(center, radius, resolution) {
    const points = [];
    const thetaLength = (Math.PI * 2 / resolution) / 2;
    const phiLength = Math.PI / resolution;
    for (let theta = 0; theta < Math.PI * 2; theta += thetaLength) { // Iterate until 2PI (excluding the last point)
        const nextTheta = theta + thetaLength;
        for (let phi = 0; phi < Math.PI; phi += phiLength) { // Iterate until PI (excluding the last point)
            const nextPhi = phi + phiLength;
            const p1 = new Vector3(radius * Math.sin(phi) * Math.cos(theta) + center.x, radius * Math.cos(phi) + center.y, radius * Math.sin(phi) * Math.sin(theta) + center.z);
            const p2 = new Vector3(radius * Math.sin(phi) * Math.cos(nextTheta) + center.x, radius * Math.cos(phi) + center.y, radius * Math.sin(phi) * Math.sin(nextTheta) + center.z);
            const p3 = new Vector3(radius * Math.sin(nextPhi) * Math.cos(nextTheta) + center.x, radius * Math.cos(nextPhi) + center.y, radius * Math.sin(nextPhi) * Math.sin(nextTheta) + center.z);
            const p4 = new Vector3(radius * Math.sin(nextPhi) * Math.cos(theta) + center.x, radius * Math.cos(nextPhi) + center.y, radius * Math.sin(nextPhi) * Math.sin(theta) + center.z);
            // Create two triangles for each quad (diagonal split)
            points.push([p1, p2, p3, p4]);
        }
    }
    return points;
}
let cmd = new Command("spawnsphere", "shows/hide mob spawn spheres", "$ <show/hide>", ["ssp"]);
let spherepos = new Vector3(0, 0, 0);
let render = false;
let indicatorPoints = generateSphereQuadPoints(spherepos, 1, 7);
let spawnSpherePoints = generateSphereQuadPoints(spherepos, 1, 25);
let despawnSpherePoints = generateSphereQuadPoints(spherepos, 1, 25);
//wireframe, radii shrunked/raised by 0.1 to avoid z-fighting
let renderWireframe = false;
let spawnSpherePointsInsideWireframe = generateSphereQuadPoints(spherepos, 0.9, 25);
let despawnSpherePointsInsideWireframe = generateSphereQuadPoints(spherepos, 0.9, 25);
let spawnSpherePointsOutsideWireframe = generateSphereQuadPoints(spherepos, 1.1, 25);
let despawnSpherePointsOutsideWireframe = generateSphereQuadPoints(spherepos, 1.1, 25);
cmd.on("execute", (label, args, line) => {
    let player = game.getLocalPlayer();
    if (!player)
        return false;
    switch (args[0]) {
        case "show":
            spherepos = player.getPositionInterpolated();
            spherepos.y -= 1.6;
            indicatorPoints = generateSphereQuadPoints(spherepos, 1, 4);
            spawnSpherePoints = generateSphereQuadPoints(spherepos, 24, 16);
            despawnSpherePoints = generateSphereQuadPoints(spherepos, 44, 24);
            spawnSpherePointsInsideWireframe = generateSphereQuadPoints(spherepos, 23.9, 16);
            despawnSpherePointsInsideWireframe = generateSphereQuadPoints(spherepos, 43.9, 24);
            spawnSpherePointsOutsideWireframe = generateSphereQuadPoints(spherepos, 24.1, 16);
            despawnSpherePointsOutsideWireframe = generateSphereQuadPoints(spherepos, 44.1, 24);
            render = true;
            clientMessage("[\xa79Spawn Spheres\xa7r] Spawn spheres shown");
            clientMessage(`[\xa79Spawn Spheres\xa7r] Center: ${spherepos.x.toFixed(2)}, ${spherepos.y.toFixed(2)}, ${spherepos.z.toFixed(2)}`);
            clientMessage("[\xa79Spawn Spheres\xa7r] Press \xa79F7\xa7r to toggle wireframe");
            break;
        case "hide":
            render = false;
            clientMessage("[\xa79Spawn Spheres\xa7r] Spawn spheres hidden");
            break;
        default:
            return false;
    }
    return true;
});
client.on("key-press", e => {
    if (e.keyCode == 0x76 && e.isDown) {
        renderWireframe = !renderWireframe;
    }
});
client.on("render3d", e => {
    if (!render)
        return;
    // we use quads because they are faster to render
    for (const triangle of indicatorPoints) {
        const [point1, point2, point3, point4] = triangle;
        graphics3D.setColor(new Color(0, 1, 0, 1));
        graphics3D.drawQuad(point1, point2, point3, point4);
    }
    //spawn sphere
    graphics3D.finish(true);
    for (const quad of despawnSpherePoints) {
        const [point1, point2, point3, point4] = quad;
        graphics3D.setColor(new Color(0, 1, 0, .3));
        graphics3D.drawQuad(point1, point2, point3, point4);
        graphics3D.drawQuad(point4, point3, point2, point1);
    }
    for (const quad of spawnSpherePoints) {
        const [point1, point2, point3, point4] = quad;
        graphics3D.setColor(new Color(1, 0, 0, .3));
        graphics3D.drawQuad(point1, point2, point3, point4);
        graphics3D.drawQuad(point4, point3, point2, point1);
    }
    graphics3D.finish(false);
    //wireframe
    if (!renderWireframe)
        return;
    let player = game.getLocalPlayer();
    if (!player)
        return;
    let distance = player.getPositionInterpolated().distanceTo(spherepos);
    if (distance < 24) {
        for (const quad of spawnSpherePointsInsideWireframe) {
            const [point1, point2, point3, point4] = quad;
            graphics3D.setColor(new Color(0, 1, 0, 1));
            graphics3D.drawLine(point1, point2);
            graphics3D.drawLine(point2, point3);
            graphics3D.drawLine(point3, point4);
            graphics3D.drawLine(point4, point1);
        }
    }
    if (distance > 24 && distance < 44) {
        for (const quad of despawnSpherePointsInsideWireframe) {
            const [point1, point2, point3, point4] = quad;
            graphics3D.setColor(new Color(1, 0, 0, 1));
            graphics3D.drawLine(point1, point2);
            graphics3D.drawLine(point2, point3);
            graphics3D.drawLine(point3, point4);
            graphics3D.drawLine(point4, point1);
        }
        for (const quad of spawnSpherePointsOutsideWireframe) {
            const [point1, point2, point3, point4] = quad;
            graphics3D.setColor(new Color(0, 1, 0, 1));
            graphics3D.drawLine(point1, point2);
            graphics3D.drawLine(point2, point3);
            graphics3D.drawLine(point3, point4);
            graphics3D.drawLine(point4, point1);
        }
    }
    if (distance > 44) {
        for (const quad of despawnSpherePointsOutsideWireframe) {
            const [point1, point2, point3, point4] = quad;
            graphics3D.setColor(new Color(1, 0, 0, 1));
            graphics3D.drawLine(point1, point2);
            graphics3D.drawLine(point2, point3);
            graphics3D.drawLine(point3, point4);
            graphics3D.drawLine(point4, point1);
        }
    }
    graphics3D.finish(false);
    /* //testing codss
    for (const triangle of indicatorPoints) {
        const [point1, point2, point3] = triangle;
        graphics3D.setColor(new Color(0,1,0,.3))
        graphics3D.drawTriangle(point1, point2, point3)
    }
    graphics3D.finish(true)
    // quad test
    //grahics3D.drawLine
    const quadPoints = generateSphereQuadPoints(spherepos, 44, 25);
    for (const quad of quadPoints) {
        graphics3D.setColor(new Color(0,1,0,.3))
        // clientMessage(quad) //lag, do not uncomment
        const [point1, point2, point3, point4] = quad;
        graphics3D.drawLine(point1, point2)
        graphics3D.drawLine(point2, point3)
        graphics3D.drawLine(point3, point4)
        graphics3D.drawLine(point4, point1)
    }
    graphics3D.finish(false)
    
    //graphics3D.drawQuad
    for (const triangle of quadPoints) {
        const [point1, point2, point3, point4] = triangle;
        graphics3D.setColor(new Color(0,1,1,.3))
        graphics3D.drawQuad(point4, point3, point2, point1)
    }
    graphics3D.finish(false)*/
});
client.getCommandManager().registerCommand(cmd);
