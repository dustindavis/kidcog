var playerSprite = {
    image: '/images/sprites.png',
    width: 65,
    height: 70,
    walking: [{ x: '-0px', y: '-105px' }, { x: '-90px', y: '-105px' }, { x: '-190px', y: '-105px' }, { x: '-285px', y: '-105px' }],
    attacking: [{ x: '-395px', y: '-105px' }, { x: '-520px', y: '-105px' }, { x: '-633px', y: '-105px' }],
    dying: [],
    walkingSpeed: 150,
    attackingSpeed: 100,
    dyingSpeed: 0
}

var enemy1Sprite = {
    image: '/images/sprites.png',
    width: 65,
    height: 70,
    walking: [{ x: '-0px', y: '-0px' }, { x: '-75px', y: '-0px' }, { x: '-150px', y: '-0px' }, { x: '-225px', y: '-0px' }],
    attacking: [{ x: '-308px', y: '-0px' }, { x: '-383px', y: '-0px' }],
    dying: [{ x: '-832px', y: '-0px' }, { x: '-758px', y: '-0px' }, { x: '-658px', y: '-0px' }, { x: '-583px', y: '-0px' }, { x: '-458px', y: '-0px' }],
    walkingSpeed: 150,
    attackingSpeed: 700,
    dyingSpeed: 300
}