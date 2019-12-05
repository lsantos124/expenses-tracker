//
// Object destructuring
//


// const person = {
// 	//name: 'Leo',
// 	age: 23,
// 	location: {
// 		city: 'Owings Mills',
// 		temp: 43
// 	}
// };

// // const name = person.name;
// // const age = person.age;

// const { name = 'Anonymous', age } = person;

// console.log(`${name} is ${age}.`);

// const { city, temp: temperature } = person.location;

// if (city && temperature) {
// 	console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
// 	title: 'Ego is the Enemy',
// 	author: 'Ryan Holiday',
// 	publisher: {
// 		name: 'Penguin'
// 	}
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName);

//
// Array destructuring
//

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

// const [, city, state] = address;

// console.log(`You are in ${city} ${state}`);

// const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

// const [itemName, , medium] = item;

// console.log(`A medium ${itemName} costs ${medium}`);