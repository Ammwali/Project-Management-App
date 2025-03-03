export const fetchAllProjects = async () => {

    const res = await fetch('http://localhost:5000/api/projects/allProjects',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }) 

    const response = res
    const data = await res.json()
    return{data, response} ;
}

export const fetchOneProjects = async (id) => {

    const res = await fetch(`http://localhost:5000/api/projects/project/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }) 

    const response = res
    const data = await res.json()
    return{data, response} ;
}

export const fetchUpdateProjects = async (id, updatedProject) => {

    const res = await fetch(`http://localhost:5000/api/projects/update/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(updatedProject)
    }) 

    const response = res
    const data = await res.json()
    return{data, response} ;
}

export const fetchDeleteProjects = async (id) => {

    const res = await fetch(`http://localhost:5000/api/projects/delete/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }) 

    const response = res
    const data = await res.json()
    return{data, response} ;
}
