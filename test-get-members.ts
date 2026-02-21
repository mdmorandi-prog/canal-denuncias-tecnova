import { getMembers } from './src/app/comite/membros/actions'

async function run() {
    console.log("Calling getMembers()...")
    const result = await getMembers()
    console.log("Result:", result)
}

run()
