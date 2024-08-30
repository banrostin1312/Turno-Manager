"use strict";
let num1 = 15;
let num2 = 345;
const sumar = (a, b) => {
    return a + b;
};
// console.log(sumar(num1,num2));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["GUEST"] = "guest";
})(UserRole || (UserRole = {}));
;
;
const user1 = {
    name: "rambe",
    age: 25,
    email: "banrostin@gmail.com",
    role: UserRole.ADMIN
};
const gato1 = {
    name: "Lerbux",
    age: 999,
    patas: "cuatro",
    felino: true
};
const iguana1 = {
    name: "Reslamp",
    age: 1200,
    patas: "cuatro",
    reptil: true
};
console.log(gato1, iguana1);
