export const fetchAllEnployees = async () => {

    const res = await fetch('https://promange-app.onrender.com/api/admin/employees',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }) 

    const response = res
    const data = await res.json()
    return{data, response} ;
}

export const fetchOneEmployees = async (id) => {

    const res = await fetch(`https://promange-app.onrender.com/api/admin/employee/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }) 

    const response = res
    const data = await res.json()
    return{data, response} ;
}

export const fetchUpdateEmployees = async (id, updatedEmployee) => {

    const res = await fetch(`https://promange-app.onrender.com/api/admin/employee/update/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(updatedEmployee)
    }) 

    const response = res
    const data = await res.json()
    return{data, response} ;
}

export const fetchDeleteEmployees = async (id) => {

    const res = await fetch(`https://promange-app.onrender.com/api/admin/employee/delete/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }) 

    const response = res
    const data = await res.json()
    return{data, response} ;
}