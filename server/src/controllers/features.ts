import e = require("express")


export type handlers = {
    getFeatures:e.RequestHandler;
    getFeature:e.RequestHandler;
    postFeature:e.RequestHandler;
    putFeature:e.RequestHandler;
    deleteFeature:e.RequestHandler;
}

function featuresHandlers(__data:{[key:string]:any},models:any,helpers:{[key:string]:any}):handlers{
    
    const handlers:handlers={
        getFeatures:function(req,res,next){
            try{
                let start:number|boolean=typeof +req.query.start === 'number'?+req.query.start:false,rows:number|boolean=typeof +req.query.rows === 'number'?+req.query.rows:false
                let userId:number | boolean= typeof +req.query.userId === 'number' && +req.query.userId>=0?+req.query.userId:false;
                if(typeof start ==='number' && typeof userId ==='number' && typeof rows === 'number'){
                    __data.getFeatures(start,rows).then((results:{count:number,rows:[]})=>{
                        if(rows){
                            let data=results.rows.filter((row:{[key:string]:any})=>{
                                return row.contributor===userId || row.creator===userId
                            })
                            res.setHeader('Content-Type','application/json')
                            res.status(200).send({status:200,data:data,next:(+start+ +rows+1)<results.count?+start+ +rows+1:null})
                        }
                        else {
                            res.setHeader('Content-Type','application/json')
                            res.status(200).send({status:200,data:[],next:null})
                        }
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(400).send({status:400,error:'please check your query params,start,rows and userId, they must all be positive numbers'}) 
                }

            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }

        },
        getFeature:function(req,res,next){
            try{
                let userId:number | boolean= typeof +req.query.userId === 'number' && +req.query.userId>=0?+req.query.userId:false
                let id:number | boolean=typeof +req.query.id === 'number' && +req.query.id>=0?+req.query.id:false;
                if(typeof userId === 'number' && typeof id === 'number' ){
                    __data.getFeature(id).then((row:{[key:string]:any})=>{
                        if(row){
                            if(row.contributor===userId || row.creator===userId){
                                res.setHeader('Content-Type','application/json')
                                res.status(200).send({status:200,data:row})
                            }
                            else{
                                res.setHeader('Content-Type','application/json')
                                res.status(401).send({status:401,error:'Access denied'})  
                            }
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(404).send({status:404,error:'Feature not found'}) 
                        }
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(400).send({status:400,error:'please check your query params,id and userId, they must be positive numbers'}) 
                }
                
            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }

        },
        postFeature:function(req,res,next){
            try{
                
                let title:string | boolean=typeof req.body.title === 'string' && req.body.title.trim().length>3?req.body.title.trim():false;
                let description:string | boolean=typeof req.body.description === 'string' && req.body.description.trim().length>3?req.body.description.trim():false;
                let status:string | boolean=typeof req.body.status === 'string' && req.body.status.trim().length>1?req.body.status.trim():false;
                let creator:number | boolean=typeof req.body.creator === 'number' && req.body.creator>=0?req.body.creator:false;
                let edd:string |boolean=typeof req.body.edd === 'string' && new Date(req.body.edd.trim()).toString() !== 'Invalid Date'?req.body.edd.trim():false;
                let type:number | boolean=typeof req.body.type === 'number' && (req.body.type===0 || req.body.type===1)?req.body.type:false;
                let projectId:number | boolean=typeof req.body.projectId === 'number' && req.body.projectId>=0?req.body.projectId:false;
                let contributor:number | boolean=typeof req.body.contributor === 'number' && req.body.contributor>=0?req.body.contributor:false;
                let data:{[key:string]:any}={}, errors:{[key:string]:any}={}
                
                if(!title) errors.title="title required and must be a string";
                if(!description) errors.description="description required and must be a string";
                if(!status) errors.status="status required and must be a string";
                if(typeof creator !== 'number') errors.creator="creator required and must be a number";
                if(!edd) errors.ecd="ecd required and must be a date string with format YYYY-MM-DD";
                if(typeof type !== 'number') errors.type="type required and must be 0 or 1";
                if(typeof projectId !== 'number') errors.projectId="projectId required and must be a number";
                if(typeof contributor !== 'number') errors.contributor="contributor required and must be a number";

                if(Object.keys(errors).length===0){
                    data={title,description,status,creator,edd,type,projectId,contributor}
                    models.sequelize.transaction((t:any)=>{
                        return __data.createFeature(data,t).then((feature:{[key:string]:any})=>{
                            let id=feature.get({plain:true}).id
                            return __data.findUserById(contributor,t).then((user:{[key:string]:any})=>{
                                if(user.dataValues){
                                    user.dataValues.features.push(id);
                                    return __data.updateUser(user.dataValues,t)
                                }
                                else{
                                    throw new Error('User not Found')
                                }
                            })
                        }).then(()=>{
                            res.setHeader('Content-Type','application/json')
                            res.sendStatus(204)
                        }).catch((err:any)=>{
                            res.setHeader('Content-Type','application/json')
                            res.status(500).send({status:500,error:err.message?err.message:'An unknown error occured'})
                        })  
                    })  
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(405).send({status:405,error:errors})
                }
            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }

        },
        putFeature:function(req,res,next){
            try{
                let userId:number | boolean= typeof req.body.userId === 'number' && req.body.userId>=0?req.body.userId:false
                let id:number | boolean=typeof req.body.id === 'number' && req.body.id>=0?req.body.id:false;
                let title:string | boolean=typeof req.body.title === 'string' && req.body.title.trim().length>3?req.body.title.trim():false;
                let description:string | boolean=typeof req.body.description === 'string' && req.body.description.trim().length>3?req.body.description.trim():false;
                let status:string | boolean=typeof req.body.status === 'string' && req.body.status.trim().length>1?req.body.status.trim():false;
                let creator:number | boolean=typeof req.body.creator === 'number' && req.body.creator>=0?req.body.creator:false;
                let edd:string |boolean=typeof req.body.edd === 'string' && new Date(req.body.edd.trim()).toString() !== 'Invalid Date'?req.body.edd.trim():false;
                let type:number | boolean=typeof req.body.type === 'number' && (req.body.type===0 || req.body.type===1)?req.body.type:false;
                let projectId:number | boolean=typeof req.body.projectId === 'number' && req.body.projectId>=0?req.body.projectId:false;
                let contributor:number | boolean=typeof req.body.contributor === 'number' && req.body.contributor>=0?req.body.contributor:false;
                let data:{[key:string]:any}={}, errors:{[key:string]:any}={}
                
                if(typeof id !== 'number') errors.id="id of feature required and must be a number";
                if(!title) errors.title="title required and must be a string";
                if(!description) errors.description="description required and must be a string";
                if(!status) errors.status="status required and must be a string";
                if(typeof creator !== 'number') errors.creator="creator required and must be a number";
                if(!edd) errors.ecd="ecd required and must be a date string with format YYYY-MM-DD";
                if(typeof type !== 'number') errors.type="type required and must be 0 or 1";
                if(typeof projectId !== 'number') errors.projectId="projectId required and must be a number";
                if(typeof contributor !== 'number') errors.contributor="contributor required and must be a number";
                if(typeof userId !== 'number') errors.userId="userId required and must be a number";
                if(Object.keys(errors).length===0){
                    data={title,description,status,creator,edd,type,contributor,projectId}
                    __data.getFeature(id).then((row:{[key:string]:any})=>{
                        if(row){
                            if(row.contributor===userId || row.creator===userId){
                                models.sequelize.transaction((t:any)=>{
                                    return __data.updateFeature(id,data,t).then((feature:{[key:string]:any})=>{
                                        
                                        return __data.findUserById(contributor,t).then((user:{[key:string]:any})=>{
                                            if(user){
                                                if(user.dataValues.features.indexOf(id)>-1) user.dataValues.features.push(id);
                                                return __data.updateUser(user.dataValues,t)
                                            }
                                            else throw new Error('Error updating user data user not found')
                                        })
                                    }).then(()=>{
                                        res.setHeader('Content-Type','application/json')
                                        res.sendStatus(204)
                                    }).catch((err:{message:string})=>{
                                        res.setHeader('Content-Type','application/json')
                                        res.status(500).send({status:500,error:err.message?err.message:'An unknown error occured'})
                                    })  
                                })  
                            }
                            else{
                                res.setHeader('Content-Type','application/json')
                                res.status(401).send({status:401,error:'Access denied, not an admin or contributor'}) 
                            }
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(404).send({status:404,error:'Feature not found'})  
                        }
 
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
                   
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(400).send({status:400,error:errors})
                }
            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            } 
        },
        deleteFeature:function(req,res,next){
            try{
                let userId:number | boolean= typeof +req.query.userId === 'number' && +req.query.userId>=0?+req.query.userId:false
                let id:number | boolean=typeof +req.query.id === 'number' && +req.query.id>=0?+req.query.id:false;
                if(typeof userId === 'number' && typeof id === 'number' ){
                   __data.getFeature(id).then((obj:{[key:string]:any})=>{
                        if(obj){
                            if(obj.creator===userId){
                                __data.deleteFeature(id).then(()=>{
                                    res.setHeader('Content-Type','application/json') 
                                    res.status(204).send({status:204})
                                }).catch(()=>{
                                    res.setHeader('Content-Type','application/json')
                                    res.status(500).send({status:500,error:'An unknown error occured while trying to delete'})
                                })
                                  
                            }
                           else{
                            res.setHeader('Content-Type','application/json') 
                            res.status(401).send({status:401,error:'Access denied'}) 
                           }
                        }
                        else{
                            res.setHeader('Content-Type','application/json') 
                            res.status(204).send({status:204}) 
                        }
                        
                   }).catch((err:any)=>{
                    res.setHeader('Content-Type','application/json')
                    res.status(500).send({status:500,error:'An unknown error occured'}) 
                   })
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(405).send({status:405,error:'id and userId required'})
                }
            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }

        }
    }
    return handlers
}
featuresHandlers.__inject=['__data','models','helpers']

export default featuresHandlers