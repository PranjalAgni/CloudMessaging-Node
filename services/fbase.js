const firebase = require('firebase-admin');
const serviceAccount = require('../config/service-key');
const dataObj = require('../core/random.data.packets');


const serverKey = 'AAAAXjVBn9U:APA91bGfUicRdYdsWVhlrbIlPr7w1c4OLCMQVhlkHxIngnuUQTi0UtxIF21dHSizUO-1-aCpHf37s-eQATvUaf0zseogAam3SW-bzvgbuxf_6nfhBoktwZAoJItfBLiN02cKtvZD128WKCbzYVX4x2MN9z3t6oreoQ';


//Firebase Init
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://my-webpush-50f42.firebaseio.com',
});


const fdb = firebase.database();
const ref = fdb.ref('just_for_ecell');
const department = ref.child('Details');

//Push a new object.
department.push(dataObj.generate());

module.exports = firebase;
