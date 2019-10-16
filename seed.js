const { db, Board, Item, BoardObjective } = require('./js/server/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced');

  const boards = await Promise.all([
    Board.create({
      id: 0,
      name: 'tutorial',
      totem: `require('./res/tottem.jpg)`
    }),
    Board.create({
      id: 1,
      name: 'fullStack',
      totem: `require('./res/tottem.jpg')`
    }),
    Board.create({
      id: 2,
      name: "test",
      totem: `require('./res/test.jpg'),`
    })
  ]);

  const items = await Promise.all([
    Item.create({
      name: 'Coin',
      source: 'required',
      is3D: true,
      id: 1
    }),
    Item.create({
      name: 'Coin',
      source: 'required',
      is3D: true,
      id: 2
    }),
    Item.create({
      name: 'Coin',
      source: 'required',
      is3D: true,
      id: 3
    }),
    Item.create({
      name: 'Coin',
      source: 'required',
      is3D: true,
      id: 4
    }),
    Item.create({
      name: 'Coin',
      source: 'required',
      is3D: true,
      id: 5
    }),
    Item.create({
      name: 'Star',
      source: `require('./res/animated_objects/object_star_anim/object_star_anim.vrx')`,
      resources: `[
                require('./res/animated_objects/object_star_anim/object_star_diffuse.png'),
                require('./res/animated_objects/object_star_anim/object_star_specular.png')
            ]`,
      is3D: true,
      id: 6
    }),
    Item.create({
      name: 'Smiley',
      source: `require("./res/animated_objects/emoji_smile/emoji_smile.vrx")`,
      is3D: true,
      id: 7
    }),
    Item.create({
      name: 'Heart',
      source: `require('../res/animated_objects/emoji_heart_anim/emoji_heart_anim.vrx')`,
      resources: `[
                require('../res/animated_objects/emoji_heart_anim/emoji_heart_specular.png'),
                require('../res/animated_objects/emoji_heart_anim/emoji_heart.png')
            ]`,
      is3D: true,
      id: 8
    }),
    Item.create({
      name: 'Crown',
      source: `require('../res/animated_objects/crown/crown.obj')`,
      is3D: true,
      id: 9
    }),
    Item.create({
      name: 'Key',
      source: `require('../res/key/key.obj')`,
      resources: `[require('../res/key/key.bmp')]`,
      is3D: true,
      id: 10
    }),
    Item.create({
      name: 'Lock',
      source: `require('../res/padlock/scene.gltf')`,
      is3D: true,
      id: 11
    })
  ]);

  const objectives = await Promise.all([
    BoardObjective.create({
      xpos: 0,
      ypos: -3,
      zpos: 0,
      type: 'onCollision',
      collected: false,
      itemId: 10,
      boardId: 1
    }),
    BoardObjective.create({
      xpos: 50,
      ypos: -5,
      zpos: 0,
      type: 'onCollision',
      collected: false,
      itemId: 11,
      boardId: 1
    }),
    BoardObjective.create({
      xpos: 20,
      ypos: -5,
      zpos: 0,
      type: 'onClick',
      collected: false,
      itemId: 9,
      boardId: 1
    }),
    BoardObjective.create({
      xpos: 0,
      ypos: 0,
      zpos: 20,
      type: 'onClick',
      collected: false,
      itemId: 8,
      boardId: 1
    }),
    BoardObjective.create({
      xpos: 20,
      ypos: 3,
      zpos: 20,
      type: 'onClick',
      collected: false,
      itemId: 7,
      boardId: 1
    }),
    BoardObjective.create({
      xpos: 10,
      ypos: 8,
      zpos: 0,
      type: 'onClick',
      collected: false,
      itemId: 6,
      boardId: 1
    }),
    BoardObjective.create({
      xpos: 20,
      ypos: 0,
      zpos: 30,
      type: 'onClick',
      collected: false,
      itemId: 5,
      boardId: 1
    }),
    BoardObjective.create({
      xpos: 10,
      ypos: -5,
      zpos: -10,
      type: 'onClick',
      collected: false,
      itemId: 4,
      boardId: 1
    }),
    BoardObjective.create({
      xpos: 25,
      ypos: -2,
      zpos: 5,
      type: 'onClick',
      collected: false,
      itemId: 3,
      boardId: 1
    }),
    BoardObjective.create({
      xpos: -10,
      ypos: 0,
      zpos: 20,
      type: 'onClick',
      collected: false,
      itemId: 2,
      boardId: 1
    }),
    BoardObjective.create({
      xpos: 0,
      ypos: -12,
      zpos: 0,
      type: 'onClick',
      collected: false,
      itemId: 1,
      boardId: 1
    }),
  ]);

  console.log(`seeded ${boards.length} boards`);
  console.log(`seeded ${items.length} items`);
  console.log(`seeded ${objectives.length} objectives`);
  console.log(`seeding success!`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

runSeed();
