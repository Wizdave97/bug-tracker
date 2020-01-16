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
                let start:number|boolean=typeof Number(req.query.start) === 'number'?Number(req.query.start):false,rows:number|boolean=typeof Number(req.query.rows) === 'string'?Number(req.query.rows):false
                let userId:number | boolean= typeof Number(req.query.userId) === 'number' && Number(req.query.userId)>=0?Number(req.query.userId):false;
                if(start && userId && rows){
                    __data.getProjects(start,rows).then((results:{count:number,rows:[]})=>{
                        let data=results.rows.filter((row:{[key:string]:any})=>{
                            let contributors=row.contributors.filter((obj:{[key:string]:any})=>{
                                return obj.userId===userId
                            })
                            return contributors.length===1
                        })
    
                        res.setHeader('Content-Type','application/json')
                        res.status(200).send({status:200,data:data,next:(Number(start)+Number(rows)+1)<results.count?Number(start)+Number(rows)+1:null})
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(405).send({status:405,error:'please check your query params,start,rows and userId, they must all be positive numbers'}) 
                }

            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }

        },
        getProject:function(req,res,next){
            try{
                let userId:number | boolean= typeof req.body.userId === 'number' && req.body.userId>=0?req.body.userId:false
                let id:number | boolean=typeof req.body.id === 'number' && req.body.id>=0?req.body.id:false;
                if(userId && id ){
                    __data.getProject(id).then((row:{[key:string]:any})=>{
                        let contributors=row.contributors.filter((obj:{[key:string]:any})=>{
                            return obj.userId===userId
                        })
                        if(contributors.length===1){
                            res.setHeader('Content-Type','application/json')
                            res.status(200).send({status:200,data:row})
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(403).send({status:403,error:'Access denied, not a member of this project'})  
                        }
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(405).send({status:405,error:'please check your query params,id and userId, they must be positive numbers'}) 
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
                let ecd:string |boolean=typeof req.body.edd === 'string' && req.body.edd.trim().length===10?req.body.edd.trim():false;

                let data:{[key:string]:any}={}, errors:{[key:string]:any}={}
                
                if(!title) errors.title="title required and must be a string";
                if(!description) errors.description="description required and must be a string";
                if(!status) errors.status="status required and must be a string";
                if(!creator) errors.creator="creator required and must be a number";
                if(!ecd) errors.ecd="ecd required and must be a date string";
                if(Object.keys(errors).length===0){
                    data={title,description,status,creator,ecd,contributors:[{userId:creator,role:0}]}
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
                    res.status(405).send({status:405,error:errors})
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
                let ecd:string |boolean=typeof req.body.edd === 'string' && req.body.edd.trim().length===10?req.body.edd.trim():false
                let data:{[key:string]:any}={}, errors:{[key:string]:any}={}
                if(!id) errors.id="id of project required and must be a number";
                if(!title) errors.title="title required and must be a string";
                if(!description) errors.description="description required and must be a string";
                if(!status) errors.status="status required and must be a string";
                if(!creator) errors.creator="creator required and must be a number";
                if(!ecd) errors.ecd="ecd required and must be a date string with format DD-MM-YYYY";
                if(!userId) errors.userId="userId required and must be a number";
                if(Object.keys(errors).length===0){
                    data={title,description,status,creator,ecd}
                    __data.getProject(id).then((row:{[key:string]:any})=>{
                        let contributors:any[]=row.contributors.filter((obj:{[key:string]:any})=>{
                            return obj.userId===userId && obj.role===0
                        })
                        if(contributors.length===1){
                            __data.updateProject(data).then((results:[])=>{
                                res.setHeader('Content-Type','application/json')
                                res.sendStatus(204)
                            }).catch((err:any)=>{
                                res.setHeader('Content-Type','application/json')
                                res.status(500).send({status:500,error:'An unknown error occured'})
                            })
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(403).send({status:500,error:'Access denied, not an admin of project'}) 
                        }
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
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
        deleteProject:function(req,res,next){
            try{
                let userId:number | boolean= typeof req.body.userId === 'number' && req.body.userId>=0?req.body.userId:false
                let id:number | boolean=typeof Number(req.query.id.trim()) === 'number' && Number(req.query.id.trim())>=0?Number(req.query.id.trim()):false;
                if(userId && id ){
                   __data.getProject(id).then((obj:{[key:string]:any})=>{
                       let count:number=0
                       for(let contributor of obj.contributors){
                        if(contributor.id===userId){
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
                       if(count===obj.contributors){
                        res.setHeader('Content-Type','application/json') 
                        res.status(403).send({status:2403,error:'Access denied'}) 
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

        },
        putContributor:function(req,res,next){
            try{
                let adminId:number | boolean=typeof req.body.adminId === 'number' && req.body.adminId>=0?req.body.adminId:false;
                let userId:number | boolean= typeof req.body.userId === 'number' && req.body.userId>=0?req.body.userId:false
                let projectId:number | boolean=typeof req.body.projectId === 'number' && req.body.projectId>=0?req.body.projectId:false;
                let role:number | boolean=typeof req.body.role === 'number' && req.body.role>=0?req.body.role:false;
                let errors:{[keys:string]:string}={}
                if(!adminId) errors.adminId="Id of project admin trying to add contributor required must be a positive number"
                if(!userId) errors.userId="Id of contributor being added to project is required must be a positive number"
                if(!projectId) errors.projectId="Id of project required must be a positive number"
                if(!role) errors.role="Role of contributor required must be a positive number"
                if(adminId && userId && projectId && role){
                    __data.getProject(projectId).then((project:{[key:string]:any})=>{
                        let contributors=project.contributors;
                        let adminClearance=false;
                        for(let contributor of contributors){
                            if(contributor.userId===adminId && contributor.role===0){
                                adminClearance=true
                                break;
                            }
                        }
                        if(adminClearance){
                            contributors.push({userId,role})
                            models.sequelize.transaction((t:any)=>{
                                return __data.findUserById(userId).then((user:{[key:string]:any})=>{
                                    user.projects.push(projectId)
                                    return __data.updateUser(user,{transaction:t})
                                }).then((result:any)=>{
                                    return __data.updateProject(projectId,{contributors},{transaction:t}) 
                                    }).then((result:any)=>{
                                        res.setHeader('Content-Type','application/json')
                                        res.sendStatus(204)
                                    }).catch((err:any)=>{
                                        res.setHeader('Content-Type','application/json')
                                        res.status(500).send({status:500,error:'An unknown error occured'})
                                    })
                                })  
                            
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(403).send({status:403,error:'You do not have admin clearance to this project'}) 
                        }
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
                }
            }
            catch(err){
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
                if(!adminId) errors.adminId="Id of project admin trying to add contributor required must be a positive number"
                if(!userId) errors.userId="Id of contributor being added to project is required must be a positive number"
                if(!projectId) errors.projectId="Id of project required must be a positive number"
                if(adminId && userId && projectId){
                    __data.getProject(projectId).then((project:{[key:string]:any})=>{
                        let contributors=project.contributors;
                        let adminClearance=false;
                        for(let contributor of contributors){
                            if(contributor.userId===adminId && contributor.role===0){
                                adminClearance=true
                                break;
                            }
                        }
                        if(adminClearance){
                            let contributorsReconstruct:{}[]=[]
                            for(let contributor of contributors){
                                if(contributor.userId === userId){
                                    continue
                                }
                                else contributorsReconstruct.push(contributor)
                            }
                            models.sequelize.transaction((t:any)=>{
                                return __data.findUserById(userId).then((user:{[key:string]:any})=>{
                                    let projectIndex=user.projects.indexOf(projectId)
                                    user.projects.splice(projectIndex,1)
                                    return __data.updateUser(user,{transaction:t})
                                }).then((result:any)=>{
                                    return __data.updateProject({contributors:contributorsReconstruct},{transaction:t}) 
                                    }).then((result:any)=>{
                                        res.setHeader('Content-Type','application/json')
                                        res.sendStatus(204)
                                    }).catch((err:any)=>{
                                        res.setHeader('Content-Type','application/json')
                                        res.status(500).send({status:500,error:'An unknown error occured'})
                                    })
                                })  
                            
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(403).send({status:403,error:'You do not have admin clearance to this project'}) 
                        }
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
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