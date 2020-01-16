const e=require('express');
const router=e.Router();

export default function projectsRouterFactory(projects:{[key:string]:any}){
    router.get('/all',projects.getProjects)
    router.get('/project',projects.getProject)
    router.post('/postProject',projects.postProject)
    router.put('/putProject',projects.putProject)
    router.put('/putContributor',projects.putContributor)
    router.delete('/deleteContributor',projects.deleteContributor)
    router.delete('/deleteProject',projects.deleteProject)
    return router
}

projectsRouterFactory.__inject=['projects']