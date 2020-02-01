import e = require("express")

export type handlers = {
    getProjects:e.RequestHandler;
    getProject:e.RequestHandler;
    postProject:e.RequestHandler;
    putProject:e.RequestHandler;
    deleteProject:e.RequestHandler;
    putContributor:e.RequestHandler;
    deleteContributor:e.RequestHandler;
}

function projectHandlers(__data:{[key:string]:any},helpers:{[key:string]:any},models:{[key:string]:any}):handlers{
    
    const handlers:handlers={
        getProjects:function(req,res,next){
            try{
                let start:number|boolean=typeof +req.query.start === 'number'?+req.query.start:false,rows:number|boolean=typeof +req.query.rows === 'number'?+req.query.rows:false
                let userId:number | boolean= typeof +req.query.userId === 'number' && +req.query.userId>=0?+req.query.userId:false;
                
                if(typeof start==='number' && typeof userId ==='number' && typeof rows==='number'){
                    
                    __data.getProjects(start,rows).then((results:{count:number,rows:[]})=>{
                        if(results.rows){
                            let data=results.rows.filter((row:{[key:string]:any})=>{
                                let parsedContributors:{}[]=[];
                                let contributors:{}[]=row.contributors.filter((obj:string)=>{
                                    let parsedObj:{[key:string]:any}=JSON.parse(obj);
                                    parsedContributors.push(parsedObj)
                                    return parsedObj.userId===userId
                                })
                                row.contributors=parsedContributors
                                return contributors.length===1
                            })
                            
                            res.setHeader('Content-Type','application/json')
                            res.status(200).send({status:200,data:data,next:(+start + +rows+1)<results.count?+start + +rows+1:null})
                        }
                        else{
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
        getProject:function(req,res,next){
            try{
                let userId:number | boolean= typeof +req.query.userId === 'number' && +req.query.userId>=0?+req.query.userId:false
                let id:number | boolean=typeof +req.query.id === 'number' && +req.query.id>=0?+req.query.id:false;
                if(typeof userId === 'number' && typeof id ==='number' ){
                    __data.getProject(id).then((row:{[key:string]:any})=>{
                        if(row){
                            let parsedContributors:{}[]=[]
                            let contributors=row.contributors.filter((obj:string)=>{
                                let parsedObj:{[key:string]:any}=JSON.parse(obj);
                                parsedContributors.push(parsedObj)
                                return parsedObj.userId===userId
                            })
                            row.contributors=parsedContributors;
                            if(contributors.length===1){
                                res.setHeader('Content-Type','application/json')
                                res.status(200).send({status:200,data:row})
                            }
                            else{
                                res.setHeader('Content-Type','application/json')
                                res.status(401).send({status:401,error:'Access denied, not a member of this project'})  
                            }
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(200).send({status:200,data:{}})
                        }  
                    }).catch((err:any)=>{
                        console.log(err)
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
        postProject:function(req,res,next){
            try{
                
                let title:string | boolean=typeof req.body.title === 'string' && req.body.title.trim().length>3?req.body.title.trim():false;
                let description:string | boolean=typeof req.body.description === 'string' && req.body.description.trim().length>3?req.body.description.trim():false;
                let status:string | boolean=typeof req.body.status === 'string' && req.body.status.trim().length>1?req.body.status.trim():false;
                let creator:number | boolean=typeof req.body.creator === 'number' && req.body.creator>=0?req.body.creator:false;
                let ecd:string |boolean=typeof req.body.ecd === 'string' && new Date(req.body.ecd.trim()).toString()!=='Invalid Date'?req.body.ecd.trim():false;

                let data:{[key:string]:any}={}, errors:{[key:string]:any}={}
                
                if(typeof title !== 'string') errors.title="title required and must be a string";
                if(typeof description !== 'string') errors.description="description required and must be a string";
                if(typeof status !== 'string') errors.status="status required and must be a string";
                if(typeof creator !== 'number') errors.creator="creator required and must be a number";
                if(typeof ecd !== 'string') errors.ecd="ecd required and must be a date string with format YYYY-MM-DD";
                if(Object.keys(errors).length===0){
                    data={title,description,status,creator,ecd,contributors:[JSON.stringify({userId:creator,role:0})]}
                    __data.createProject(data).then((results:[])=>{
                        res.setHeader('Content-Type','application/json')
                        res.sendStatus(204)
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
        putProject:function(req,res,next){
            try{
                let userId:number | boolean= typeof req.body.userId === 'number' && req.body.userId>=0?req.body.userId:false
                let id:number | boolean=typeof req.body.id === 'number' && req.body.id>=0?req.body.id:false;
                let title:string | boolean=typeof req.body.title === 'string' && req.body.title.trim().length>3?req.body.title.trim():false;
                let description:string | boolean=typeof req.body.description === 'string' && req.body.description.trim().length>3?req.body.description.trim():false;
                let status:string | boolean=typeof req.body.status === 'string' && req.body.status.trim().length>1?req.body.status.trim():false;
                let creator:number | boolean=typeof req.body.creator === 'number' && req.body.creator>=0?req.body.creator:false;
                let ecd:string |boolean=typeof req.body.ecd === 'string' && new Date(req.body.ecd.trim()).toString()!=='Invalid Date'?req.body.ecd.trim():false
                let data:{[key:string]:any}={}, errors:{[key:string]:any}={}
                if(typeof id !== 'number') errors.id="id of project required and must be a number";
                if(typeof title !== 'string') errors.title="title required and must be a string";
                if(typeof description !== 'string') errors.description="description required and must be a string";
                if(typeof status !== 'string') errors.status="status required and must be a string";
                if(typeof creator !== 'number') errors.creator="creator required and must be a number";
                if(typeof ecd !== 'string') errors.ecd="ecd required and must be a date string with format YYYY-MM-DD";
                if(typeof userId !== 'number') errors.userId="userId required and must be a number";
                if(Object.keys(errors).length===0){
                    data={title,description,status,creator,ecd}
                    __data.getProject(id).then((row:{[key:string]:any})=>{
                        if(row){
                            let contributors:any[]=row.contributors.filter((obj:string)=>{
                                let parsedObj:{[key:string]:string|number}=JSON.parse(obj)
                                return parsedObj.userId===userId && parsedObj.role===0
                            })
                            if(contributors.length===1){
                                __data.updateProject(id,data).then((results:[])=>{
                                    res.setHeader('Content-Type','application/json')
                                    res.sendStatus(204)
                                }).catch((err:any)=>{
                                    res.setHeader('Content-Type','application/json')
                                    res.status(500).send({status:500,error:'An unknown error occured'})
                                })
                            }
                            else{
                                res.setHeader('Content-Type','application/json')
                                res.status(401).send({status:401,error:'Access denied, not an admin of project'}) 
                            }
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(404).send({status:404,error:'Project not found'}) 
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
        deleteProject:function(req,res,next){
            try{
                let userId:number | boolean= typeof +req.query.userId === 'number' && +req.query.userId>=0?+req.query.userId:false
                let id:number | boolean=typeof +req.query.id === 'number' && +req.query.id>=0?+req.query.id:false;
                if(typeof userId === 'number' && typeof id ==='number' ){
                   __data.getProject(id).then((row:{[key:string]:any})=>{
                       if(row){
                        let count:number=0
                        for(let contributor of row.contributors){
                         contributor=JSON.parse(contributor)
                         if(contributor.userId===userId && contributor.role===0){
                             __data.deleteProject(id).then(()=>{
                                 res.setHeader('Content-Type','application/json') 
                                 res.status(204).send({status:204})
                             }).catch(()=>{
                                 res.setHeader('Content-Type','application/json')
                                 res.status(500).send({status:500,error:'An unknown error occured while trying to delete'})
                             })
                             break;
                         }
                         count++
                        }
                        if(count===row.contributors.length){
                         res.setHeader('Content-Type','application/json') 
                         res.status(401).send({status:401,error:'Access denied'}) 
                        }
                       }
                       else{
                        res.setHeader('Content-Type','application/json')
                        res.status(404).send({status:404,error:'Project not found'})   
                       }
                       
                   }).catch((err:any)=>{
                    res.setHeader('Content-Type','application/json')
                    res.status(500).send({status:500,error:'An unknown error occured'}) 
                   })
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(400).send({status:400,error:'id and userId required'})
                }
            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }

        },
        putContributor:function(req,res,next){
            try{
                let adminId:number | boolean=typeof req.body.adminId === 'number' && req.body.adminId>=0?req.body.adminId:false;
                let userId:number | boolean= typeof req.body.userId === 'number' && req.body.userId>=0?req.body.userId:false
                let projectId:number | boolean=typeof req.body.projectId === 'number' && req.body.projectId>=0?req.body.projectId:false;
                let role:number | boolean=typeof req.body.role === 'number' && req.body.role>=0?req.body.role:false;
                let errors:{[keys:string]:string}={}
                if(typeof adminId !== 'number') errors.adminId="Id of project admin trying to add contributor required must be a positive number"
                if(typeof userId !== 'number') errors.userId="Id of contributor being added to project is required must be a positive number"
                if(typeof projectId !== 'number') errors.projectId="Id of project required must be a positive number"
                if(typeof role !== 'number') errors.role="Role of contributor required must be a positive number"
                if(Object.keys(errors).length===0){
                    __data.getProject(projectId).then((project:{[key:string]:any})=>{
                        if(project){
                            let contributors=project.contributors;
                            let adminClearance=false;
                            for(let contributor of contributors){
                                contributor=JSON.parse(contributor)
                                if(contributor.userId===adminId && contributor.role===0){
                                    adminClearance=true
                                    break;
                                }
                            }
                            if(adminClearance){
                                contributors.push(JSON.stringify({userId,role}))
                                models.sequelize.transaction((t:any)=>{
                                    return __data.findUserById(userId,t).then((user:{[key:string]:any})=>{
                                        if(user){
                                            user.dataValues.projects.push(projectId)
                                            return __data.updateUser(user.dataValues,t)
                                        }
                                        else {
                                            throw new Error('User you are trying to add does not exist') 
                                        }
                                        
                                    }).then((result:any)=>{
                                        return __data.updateProject(projectId,{contributors},t) 
                                        }).then((result:any)=>{
                                            res.setHeader('Content-Type','application/json')
                                            res.sendStatus(204)
                                        }).catch((err:any)=>{
                                            console.log(err)
                                            res.setHeader('Content-Type','application/json')
                                            res.status(500).send({status:500,error:err.message?err.message:'An unknown error occured'})
                                        })
                                    })  
                                
                            }
                            else{
                                res.setHeader('Content-Type','application/json')
                                res.status(401).send({status:401,error:'You do not have admin clearance to this project'}) 
                            }
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(404).send({status:404,error:'Project not found'})  
                        }
                        
                    }).catch((err:any)=>{
                        console.log(err)
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
                console.log(err)
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'}) 
            }

        },
        deleteContributor:function(req,res,next){
            try{
                let adminId:number | boolean=typeof req.body.adminId === 'number' && req.body.adminId>=0?req.body.adminId:false;
                let userId:number | boolean= typeof req.body.userId === 'number' && req.body.userId>=0?req.body.userId:false
                let projectId:number | boolean=typeof req.body.projectId === 'number' && req.body.projectId>=0?req.body.projectId:false;
                let errors:{[keys:string]:string}={}
                if(typeof adminId !== 'number') errors.adminId="Id of project admin trying to add contributor required must be a positive number"
                if(typeof userId !== 'number') errors.userId="Id of contributor being added to project is required must be a positive number"
                if(typeof projectId !== 'number') errors.projectId="Id of project required must be a positive number"
                if(Object.keys(errors).length===0){
                    __data.getProject(projectId).then((project:{[key:string]:any})=>{
                        if(project){
                            let contributors=project.contributors;
                            let adminClearance=false;
                            for(let contributor of contributors){
                                contributor=JSON.parse(contributor)
                                if(contributor.userId===adminId && contributor.role===0){
                                    adminClearance=true
                                    break;
                                }
                            }
                            if(adminClearance){
                                let contributorsReconstruct:{}[]=[]
                                for(let contributor of contributors){
                                    contributor=JSON.parse(contributor)
                                    if(contributor.userId === userId){
                                        continue
                                    }
                                    else contributorsReconstruct.push(JSON.stringify(contributor))
                                }
                                models.sequelize.transaction((t:any)=>{
                                    return __data.findUserById(userId,t).then((user:{[key:string]:any})=>{
                                        if(user){
                                            let projectIndex=user.dataValues.projects.indexOf(projectId)
                                            user.dataValues.projects.splice(projectIndex,1)
                                            return __data.updateUser(user.dataValues,t)
                                        }
                                        else {
                                           throw new Error('User you are trying to remove does not exist') 
                                        }
                                    }).then((result:any)=>{
                                        return __data.updateProject(projectId,{contributors:contributorsReconstruct},t) 
                                        }).then((result:any)=>{
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
                                res.status(401).send({status:401,error:'You do not have admin clearance to this project'}) 
                            }
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(404).send({status:404,error:'Project not found'}) 
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

        }
    }
    return handlers
}
projectHandlers.__inject=['__data','helpers','models']

export default projectHandlers