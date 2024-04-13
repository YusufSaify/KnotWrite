const now = new Date();

// Get the current time in IST
const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours ahead of UTC
const istTime = new Date(now.getTime() + istOffset);

// Extract hours, minutes, and seconds
const hours = istTime.getUTCHours();
const minutes = istTime.getUTCMinutes();
const seconds = istTime.getUTCSeconds();

function formatmassage(username,text){

    return{
        username,
        text,
        time:`${hours}:${minutes}`
    }
}

module.exports=formatmassage