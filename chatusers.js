
const    users=[];

function joinuser(id,username,room){

    const user={
        id,
        username,
        room
    }

    users.push(user)
    return user;

}

function getcurrentuser(id){
    
return users.find(user => user.id === id)
}


function userleave(id){
const index=users.findIndex(user=>user.id===id)

if(index!==-1){
    return users.splice(index,1)[0];
}

}

function getrromusers(room){
    return users.find(user => user.room === room)
}



module.exports={
    getcurrentuser,
    joinuser,
    userleave,
    getrromusers,
}