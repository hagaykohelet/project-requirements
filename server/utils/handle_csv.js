// import fs from 'fs/promises';

// const users = [
//     { id: 1, name: 'John Doe0', age: 21 },
//     { id: 2, name: 'John Doe1', age: 22 },
//     { id: 3, name: 'John Doe2', age: 23 }
// ];
// const dataCSV = users.reduce((acc, user) => {
//     acc += `${user.id}, ${user.name}, ${user.age}\n`;
//     return acc;
// }, `id, name, age\n`
// );
// fs.writeFile('mycsv.csv', dataCSV, 'utf8')
//     .then(() => console.log("here"))
//     .catch((error) => console.log(error))