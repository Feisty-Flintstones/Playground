const {db, Board, Item, BoardObjective} = require('./js/server/models')

async function seed() {
    await db.sync({force: true})
    console.log('db synced')

    const boards = await Promise.all([
        Board.create({
            id: 1,
            name: 'fullStack',
            totem: `require('./res/tottem.jpg')`
        }),
        Board.create({
            id: 0,
            name: 'tutorial',
            totem: `require('./res/tottem.jpg)`
        })
    ])

    const items = await Promise.all([
        Item.create({
            name: 'Star',
            source: `require('./res/animated_objects/object_star_anim/object_star_anim.vrx')`,
            resources: `[
                require('./res/animated_objects/object_star_anim/object_star_diffuse.png'),
                require('./res/animated_objects/object_star_anim/object_star_specular.png')
            ]`,
            is3D: true
        }),
        Item.create({
            name: 'Smiley',
            source: `require("./res/animated_objects/emoji_smile/emoji_smile.vrx")`,
            is3D: true
        }),
        Item.create({
            name: 'Heart',
            source: `require('../res/animated_objects/emoji_heart_anim/emoji_heart_anim.vrx')`,
            resources: `[
                require('../res/animated_objects/emoji_heart_anim/emoji_heart_specular.png'),
                require('../res/animated_objects/emoji_heart_anim/emoji_heart.png')
            ]`,
            is3D: true
        }),
        Item.create({
            name: 'Poop',
            source: `require('../res/animated_objects/emoji_poop_anim/emoji_poop_anim.vrx')`,
            is3D: true
        }),
        Item.create({
            name: 'Coin',
            source: 'required',
            is3D: true
        }),
        Item.create({
            name: 'Coin',
            source: 'required',
            is3D: true
        }),
        Item.create({
            name: 'Coin',
            source: 'required',
            is3D: true
        }),
        Item.create({
            name: 'Coin',
            source: 'required',
            is3D: true
        })
    ])

    const objectives = await Promise.all([
        BoardObjective.create({
            xpos: 0,
            ypos: 0,
            zpos: -10,
            type: 'onClick',
            collected: false,
            itemId: 2,
            boardId: 1
        }),
        BoardObjective.create({
            xpos: -20,
            ypos: 10,
            zpos: 0,
            type: 'onClick',
            collected: false,
            itemId: 4,
            boardId: 1
        }),
        BoardObjective.create({
            xpos: -20,
            ypos: 15,
            zpos: 0,
            type: 'onClick',
            collected: false,
            itemId: 3,
            boardId: 1
        }),
        BoardObjective.create({
            xpos: 0,
            ypos: 10,
            zpos: 0,
            type: 'onClick',
            collected: false,
            itemId: 6,
            boardId: 0
        }),
        BoardObjective.create({
            xpos: 0,
            ypos: 0,
            zpos: 30,
            type: 'onClick',
            collected: false,
            itemId: 7,
            boardId: 0
        }),
        BoardObjective.create({
            xpos: 0,
            ypos: 0,
            zpos: 30,
            type: 'onClick',
            collected: false,
            itemId: 8,
            boardId: 0
        }),
        BoardObjective.create({
            xpos: -20,
            ypos: 10,
            zpos: 30,
            type: 'onClick',
            collected: false,
            itemId: 5,
            boardId: 0
        })
    ])
    

    console.log(`seeded ${boards.length} boards`)
    console.log(`seeded ${items.length} items`)
    console.log(`seeded ${objectives.length} objectives`)
    console.log(`seeding success!`)
}

async function runSeed() {
    console.log('seeding...')
    try {
        await seed()
    } catch (err) {
        console.error(err)
        process.exitCode = 1
    } finally {
        console.log('closing db connection')
        await db.close()
        console.log('db connection closed')
    }
}

runSeed()