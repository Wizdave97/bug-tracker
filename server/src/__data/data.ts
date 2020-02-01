import {Model } from 'sequelize';

type __data={
    findUser(email:string,transaction:undefined|{}):Promise<any>,
    findUserById(id:number,transaction:undefined|{}):Promise<any>,
    createUser(data:{[key:string]:string},transaction:undefined|{}):Promise<any>,
    saveToken(tokenObject:{token:string,expiresIn:number,userId:string},transaction:undefined|{}):Promise<any>,
    deleteToken(token:string,transaction:undefined|{}):Promise<any>,
    updateUser(data:{[key:string]:string},transaction:undefined|{}):Promise<any>,
    createProject(data:{[key:string]:string},transaction:undefined|{}):Promise<any>,
    getProject(id:number,transaction:undefined|{}):Promise<any>,
    deleteProject(id:number,transaction:undefined|{}):Promise<any>,
    updateProject(id:number,data:{[key:string]:string},transaction:undefined|{}):Promise<any>,
    getProjects(start:number,rows:number,transaction:undefined|{}):Promise<any>,
    createFeature(data:{[key:string]:string},transaction:undefined|{}):Promise<any>,
    getFeature(id:number,transaction:undefined|{}):Promise<any>,
    deleteFeature(id:number,transaction:undefined|{}):Promise<any>,
    updateFeature(id:number,data:{[key:string]:string},transaction:undefined|{}):Promise<any>,
    getFeatures(start:number,rows:number,transaction:undefined|{}):Promise<any>,
    createLog(data:{[key:string]:string},transaction:undefined|{}):Promise<any>,
    getLogs(start:number,rows:number,transaction:undefined|{}):Promise<any>,
    getFeatureLogs(featureId:number,start:number,rows:number,transaction:undefined|{}):Promise<any>
}

export default function __dataFactory(models:{[key:string]:any}){
    const __data:__data={
        findUser:function(email,transaction=undefined){
           return new Promise((resolve,reject)=>{
            models.Users.findOne({where:{
                email:email
                },
                transaction
            }).then((user:{})=>{
                resolve(user)
            }).catch((err:{})=>{
                reject(err)
            })
           }) 
        },
        findUserById:function(id,transaction=undefined){
            return new Promise((resolve,reject)=>{
             models.Users.findOne({where:{
                 id
             },
             transaction
            }).then((user:{})=>{
                 resolve(user)
             }).catch((err:{})=>{
                 reject(err)
             })
            }) 
         },
        createUser:function(data,transaction=undefined){
            return new Promise((resolve,reject)=>{
               models.Users.create(data,{transaction}).then((result:{})=>{
                   resolve(true)
               }).catch((err:{})=>{
                   reject(err)
               })
            })
        },
        updateUser:function(data,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Users.update(data,{where:{email:data.email},transaction}).then((result:Model<any,any>)=>{
                    resolve(true)
                }).catch((err:any)=>{
                    reject(false)
                })
            })
        },
        saveToken:function(tokenObject,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Tokens.create(tokenObject,{transaction}).then((result:{})=>{
                    resolve(true)
                }).catch((err:{})=>{
                    reject(err)
                })
            })
        },
        deleteToken:function(token,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Tokens.destroy({where:{
                    token
                },
                transaction
                }).then(()=>resolve(true)).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        createProject:function(data,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Projects.create(data,{transaction}).then((result:{})=>{
                    resolve(true)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        getProject:function(id,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Projects.findOne({
                    where:{
                        id
                    },
                    transaction
                }).then((data:{})=>{
                    resolve(data)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        deleteProject:function(id,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Projects.destroy({
                    where:{
                        id
                    },
                    transaction
                }).then((result:any)=>{
                    resolve(true)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        updateProject:function(id,data,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Projects.update(data,{
                    where:{id},transaction
                }).then((result:any)=>{
                    resolve(result)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        getProjects:function(start,rows,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Projects.findAndCountAll({offset:start,limit:rows,transaction}).then((result:{count:number,rows:[]})=>{
                    resolve(result)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        createFeature:function(data,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Features.create(data,{transaction}).then((result:{})=>{
                    resolve(result)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        getFeature:function(id,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Features.findOne({
                    where:{
                        id
                    },transaction
                }).then((data:{})=>{
                    resolve(data)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        deleteFeature:function(id,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Features.destroy({
                    where:{
                        id
                    },
                    transaction
                }).then((result:any)=>{
                    resolve(true)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        updateFeature:function(id,data,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Features.update(data,{
                    where:{id},
                    transaction
                }).then((result:any)=>{
                    resolve(result)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        getFeatures:function(start,rows,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Features.findAndCountAll({offset:start,limit:rows,transaction}).then((result:{count:number,rows:[]})=>{
                    resolve(result)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        createLog:function(data,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Logs.create(data,{transaction}).then((result:{})=>{
                    resolve(true)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        getLogs:function(start,rows,projects,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Logs.findAndCountAll({where:{
                    projectId:projects
                },offset:start,limit:rows,transaction}).then((result:{count:number,rows:[]})=>{
                    resolve(result)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        getFeatureLogs:function(featureId,start,rows,transaction=undefined){
            return new Promise((resolve,reject)=>{
                models.Logs.findAndCountAll({where:{featureId},offset:start,limit:rows,transaction}).then((result:{count:number,rows:[]})=>{
                    resolve(result)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        }
    }
    return __data
}

__dataFactory.__inject=['models']
