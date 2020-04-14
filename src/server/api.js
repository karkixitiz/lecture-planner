function formatResponse(response){
    return{
        status:'success',
        data:response
    }
}

function formatError(error){
    return{
        status:'error',
        message:error
    }
}

export{
    formatResponse,
    formatError
}