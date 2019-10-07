const {db, Board, BoardObjective, Item} = require('./js/server/models')

async function seed() {
    await db.sync({force: true})
    console.log('db synced')

    const boards = await Promise.all([
        Board.create({
            name: 'fullStack',
            totem: `require('./res/tottem.jpg')`
        })
    ])

    const items = await Promise.all([
        Item.create({
            name: 'star',
            source: `require('./res/animated_objects/object_star_anim/object_star_anim.vrx')`,
            resources: `[
                require('./res/animated_objects/object_star_anim/object_star_diffuse.png'),
                require('./res/animated_objects/object_star_anim/object_star_specular.png')
            ]`,
            is3D: true
        }),
        Item.create({
            name: 'smiley',
            source: `require("./res/animated_objects/emoji_smile/emoji_smile.vrx")`,
            is3D: true
        })
    ])

    // const objectives = await Promise.all([
    //     BoardObjectives.create({

    //     })
    // ])

    console.log(`seeded ${boards.length} boards`)
    console.log(`seeded ${items.length} items`)
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