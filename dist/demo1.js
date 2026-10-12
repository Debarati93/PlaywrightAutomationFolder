"use strict";
//Typescript checks types durinng development,catching error before you run your code.
let message1 = "Hello";
//message1 = 2 ;       //Error: Type 'number' is not assignable to type 'string'.
let age1 = 20;
let isActive = true;
let numbers1 = [1, 2, 3, 4, 5];
let data = "Hello"; //any type can be assigned to any type of value
data = 42;
console.log(data);
function add(a, b) {
    return a + b;
}
//add(3,"4");  //Error: Argument of type 'string' is not assignable to parameter of type 'number'.
add(3, 4);
let user = {
    name: "Bob",
    age: 30
};
console.log(user);
//user.location = "USA";  //Error: Property 'location' does not exist on type '{ name: string; age: number; }'.
//during compile you will get the error message, but the code will still run and you will get the output as { name: 'Bob', age: 30 }.
let user1 = {
    name: "Bob",
    age: 30,
    location: "USA"
};
console.log(user1);
