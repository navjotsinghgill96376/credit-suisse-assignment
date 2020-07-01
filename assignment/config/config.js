const Messages={
    SuspiciousTransactionMsg:'Suspicous Transaction Found',
    NoSuspiciousTransactionMsg:'No Suspicious Transaction',
    emptyFile:'Transaction File is Empty',
    fileFormat:'File Not Present/File Format should be csv',
    
}

const createResponse=(Msg,data)=>{

    let response={
        Message:Msg,
        data
    }
    return response
}

module.exports={
    Messages,
    createResponse
}