import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  };

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default }; 

// database.ref('expenses').on('child_removed', (snapshot) => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses')
// 	.on('value', (snapshot) => {
// 		const expenses = [];
// 		snapshot.forEach((childSnapshot) => {
// 			expenses.push({
// 				id: childSnapshot.key,
// 				...childSnapshot.val()
// 			});
// 		});

// 		console.log(expenses);
// 	})

// database.ref('expenses')
// 	.once('value')
// 	.then((snapshot) => {
// 		const expenses = [];
// 		snapshot.forEach((childSnapshot) => {
// 			expenses.push({
// 				id: childSnapshot.key,
// 				...childSnapshot.val()
// 			});
// 		});

// 		console.log(expenses);
// 	});

// database.ref('expenses').push({
// 	description: 'test',
// 	note: 'note',
// 	amount: 1200,
// 	createdAt: 0
// });

// database.ref('notes').push({
// 	title: 'Course Topics',
// 	body: 'React Native, Angular, Python'
// });

// database.ref('notes').set(notes);

// database.ref().on('value', (snapshot) => {
// 	console.log(snapshot.val());
// });

// setTimeout(() => {
// 	database.ref('age').set(29);
// }, 3500);

// database.ref()
// 	.once('value')
// 	.then((snapshot) => {
// 		const val = snapshot.val();
// 		console.log(val);
// 	})
// 	.catch((e) => {
// 		console.log('Error fetching data', e);
// 	});

// database.ref().set({
// 	name: 'Leo',
// 	age: 23,
// 	stressLevel: 6,
// 	job: {
// 		title: 'Software developer',
// 		company: 'Google'
// 	},
// 	location: {
// 		city: 'College Park',
// 		country: 'USA'
// 	}
// }).then(() => {
// 	console.log('Data is saved');
// }).catch((e) => {
// 	console.log('This failed.', e);
// });

// // database.ref('isSingle').remove()
// //   .then(function() {
// //     console.log("Remove succeeded.")
// //   })
// //   .catch(function(error) {
// //     console.log("Remove failed: " + error.message)
// //   });

// database.ref().update({
// 	'job/company': 'Amazon',
// 	'location/city': 'Seattle',
// 	stressLevel : 9
// });