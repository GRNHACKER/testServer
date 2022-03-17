//import { AccessToken } from 'livekit-server-sdk';
const {AccessToken} = require('livekit-server-sdk')
const express = require('express');
const http = require('http');
const { listen } = require('express/lib/application');

// const roomName = 'srp room';
// const participantIdentity = '1234';
// const participantName = 'Anant7';
// const expireTime = "1000";
const appID = 'APILdoF5BeTTyBZ';
const appCertificate = 'qPo0MfakALaaMtbtwr6NXlqOTCcU8LX3T4KJiWmsT2L';
const app2 = express();
const PORT = 5000;

const generateToken = function(req, resp) {
  let _participantIdentity = req.query.participantIdentity;
  let _participantName = req.query.participantName;
  let _expireTime = req.query.expireTime;
  let _roomCreate = req.query.roomCreate;
  let _roomJoin = req.query.roomJoin;
  let _roomAdmin = req.query.roomAdmin;
  let _roomName = req.query.roomName;
  let _userCanPublish = req.query.userCanPublish;
  let _userCanSubscribe = req.query.userCanSubscribe;
  let _canPublishData = req.query.userCanPublishData;

  const at = new AccessToken(appID, appCertificate, {
    identity: _participantIdentity,
    name: _participantName,
    ttl: _expireTime,
  });

  at.addGrant({ 
    roomCreate: setBooleanValue(_roomCreate),roomJoin: setBooleanValue(_roomJoin), roomAdmin: setBooleanValue(_roomAdmin), room: _roomName, 
    canPublish: setBooleanValue(_userCanPublish), canSubscribe: setBooleanValue(_userCanSubscribe), canPublishData: setBooleanValue(_canPublishData) 
  });


  //console.log('canSubscribeTest2:- ' + typeof(setBooleanValue(_userCanSubscribe)));
  //console.log('canSubscribeTest2:- ' + setBooleanValue(_userCanSubscribe));


  const token = at.toJwt();

   console.log('participantIdentity', _participantIdentity);
   console.log('participantName', _participantName);
   console.log('expireTime', _expireTime);
   console.log('roomCreate', setBooleanValue(_roomCreate));
   console.log('roomJoin', setBooleanValue(_roomJoin));
   console.log('roomAdmin', setBooleanValue(_roomAdmin));
   console.log('roomName', _roomName);
   console.log('userCanPublish', setBooleanValue(_userCanPublish));
   console.log('userCanSubscribe', setBooleanValue(_userCanSubscribe));
   console.log('canPublishData', setBooleanValue(_canPublishData));
  
  // console.log('participantIdentity', _participantIdentity);
  // console.log('participantName', _participantName);
  // console.log('expireTime', _expireTime);
  // console.log('roomCreate', _roomCreate);
  // console.log('roomJoin', _roomJoin);
  // console.log('roomAdmin', _roomAdmin);
  // console.log('roomName', _roomName);
  // console.log('userCanPublish', _userCanPublish);
  // console.log('userCanSubscribe', _userCanSubscribe);
  // console.log('canPublishData', _canPublishData);
  // console.log('access token:-', token);

  resp.header("Access-Control-Allow-Origin", "http://192.168.29.4:" + PORT)
  return resp.json({'token' : token}).send()
  
}

function setBooleanValue(data) {
  if(data == null || data == ""){
    //console.log('testtest1', typeof(JSON.parse(data)) +'||' + (data) +'||' + typeof(data))
    return false

  } else {
    console.log('testtest2', typeof(JSON.parse(data)) +'||' + (data) +'||' + typeof(data))
    return JSON.parse(data)
  
  }
}

app2.get('/generateToken', generateToken);

http.createServer(app2),listen(app2.get('port'), function(){
  console.log('LiveUs Token Generate Server starts at' + app2.get('port'))
})

 app2.listen(PORT, () => {
      console.log(`Server is up and running on ${PORT} ...`);
 });

