var physical = require('voxel-physical')
var THREE = require('three')
module.exports = function (game) {
    return function () {
        var geometry = new THREE.BoxGeometry( 2, 2, 2 );
        var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        var mob = new THREE.Mesh(geometry, material)
        var physics = physical(
            mob
          , game.potentialCollisionSet()
          , new THREE.Vector3(2, 2, 2)
          , new THREE.Vector3(30, 5.6, 30)  // what's my terminal velocity?
        ) 
        game.scene.add(mob);
        game.addItem(physics);
        
        physics.yaw = mob;
        physics.move = function (x, y, z) {
            var xyz = parseXYZ(x, y, z);
            physics.yaw.position.x += xyz.x;
            physics.yaw.position.y += xyz.y;
            physics.yaw.position.z += xyz.z;
        };
        
        physics.moveTo = function (x, y, z) {
            var xyz = parseXYZ(x, y, z);
            physics.yaw.position.x = xyz.x;
            physics.yaw.position.y = xyz.y;
            physics.yaw.position.z = xyz.z;
        };
        
        return physics;
    }
};

function parseXYZ (x, y, z) {
    if (typeof x === 'object' && Array.isArray(x)) {
        return { x: x[0], y: x[1], z: x[2] };
    }
    else if (typeof x === 'object') {
        return { x: x.x || 0, y: x.y || 0, z: x.z || 0 };
    }
    return { x: Number(x), y: Number(y), z: Number(z) };
}