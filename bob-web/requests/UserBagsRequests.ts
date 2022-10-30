export const getBags = () => {
    return fetch(process.env.BACK_URL+"bag").then(res => res.json())
}

export const createBag = (Name:string, Bags:number) => {
    return fetch(process.env.BACK_URL+"bag",{
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name,
            Bags
        })
    })
    .then(res => res.json())
}