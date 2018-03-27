var admin = require("firebase-admin");
 // var serverKey = process.env.noti
try {
var serviceAccount = require('../key.json')
} catch (e) {
	var serviceAccount = JSON.parse(process.env.noti);
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL : "https://mylifeshare-8e6ff.firebaseio.com"
});

var baseTopic = "/topics/";

function sendNotification(body,mydata,topic,res){
	var title = 'LifeShare';

topic = baseTopic + topic ;
var payload = {
    notification: {
            title: title,
            body: body
        },

    data:{
    	data :mydata
    }
};


admin.messaging().sendToTopic(topic, payload)
  .then(function(response) {
    console.log("Successfully sent message:", response);
            res.json({resp :false, error : 'server error!! '});

  })
  .catch(function(error) {
    console.log("Error sending message:", error);
            res.json({resp :true});

  });




}

module.exports=sendNotification;