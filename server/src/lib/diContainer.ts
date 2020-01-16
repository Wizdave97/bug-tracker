interface DIContainer {
    factory(name:string,factory:{(...[]):Object}&{__inject:string[]}):void;
    register(name:string,instance:{}):void;
    get(name:string):Object;
    inject(factory:{(...[]):Object}&{__inject:string[]}):any;
}

export default function diContainerFactory():DIContainer{
    let dependencies:{[key:string]:Object}={}
    let factories:{[key:string]:{(...[]):Object}&{__inject:string[]}}={}
    let diContainer:DIContainer={
        factory:function(name,factory){
            factories[name]=factory
        },
        register:function(name,instance){
            dependencies[name]=instance
        },
        get:function(name){
            if(!dependencies[name]){
                let factory=factories[name];
                dependencies[name]=factory && diContainer.inject(factory)
                if(!dependencies[name]){
                    throw new Error('Cannot find module '+name)
                }
            }
            return dependencies[name]
        },
        inject:function(factory){
            let dependencyArray:Array<string>=factory.__inject
            let dependencies:Object[]=[]
            dependencyArray.forEach(dependency=>{
                dependencies.push(diContainer.get(dependency))
            })
            return factory && factory(...dependencies)
        }
    }
    
    return diContainer
}
