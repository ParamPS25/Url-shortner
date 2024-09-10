const sessionIdToUserMap = new Map(); //new hashmap to map sessionId to user

function setUser(id,user){
    sessionIdToUserMap.set(id,user);
}

function getUser(id){
   return sessionIdToUserMap.get(id) //Returns a specified element from the Map object
}

module.exports={
    setUser,getUser
}