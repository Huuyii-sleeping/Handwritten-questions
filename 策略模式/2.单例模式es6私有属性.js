class Singleton{
    static #instance
    constructor(){
        if(Singleton.#instance){
            throw new Error('单例模式只能创建一个实例对象')
        }
    }

    static getInstance(){
        if(!Singleton.#instance){
            Singleton.#instance = new Singleton()
        }
        return Singleton.#instance
    }
    doSomething(){
        console.log("单例实例业务")
    }
}

const instance1 = Singleton.getInstance()
const instance2 = Singleton.getInstance()
console.log(instance1 === instance2)