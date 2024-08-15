const supperAdmin =require('./superAdmin.test')
const createDB =require('./createDB.test')
const relifManager =require('./reliefManager.test')
const visitedTeam =require('./visitedTeam.test')
const receptionist =require('./receptionist.test')
const user =require('./user.test')
const mediaTeam =require('./mediaTeam.test')

const requestFromAddToVisited =require('./requestFromAddToVisited.test')

//after requestFromAddToVisited use donation
const donation =require('./donation.test')
const allotmentReq =require('./allotmentReq.test')
const showReq =require('./showReq.test')


function donationStatusStory(){
    let show = "donationStatusShow",notShow ="donationStatusNotShow",allotment = "donationStatusAllotment";

    requestFromAddToVisited(notShow)
    requestFromAddToVisited(allotment)
    showReq(allotment)
    allotmentReq(allotment)
    requestFromAddToVisited(show)
    showReq(show)

    donation(notShow,show,allotment)

}

function requestFromAddToVisitedStory(){
    requestTitle="requestFromAddToVisited"

    requestFromAddToVisited(requestTitle)
}


 function stories(){


    requestFromAddToVisitedStory()
    donationStatusStory()


 }
 function allTest(){
     createDB()
     
     supperAdmin()
     relifManager()
     visitedTeam()
     receptionist()
     user()
     mediaTeam()


     stories()




    return 
}
allTest()