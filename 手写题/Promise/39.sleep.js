function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time))
}

async function hello(){
    await sleep(1000)
    console.log('hello')
}

hello()