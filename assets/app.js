/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';


// start the Stimulus application
import './bootstrap';

const openMenuBtn = document.getElementById('open_menu')
const closeMenuBtn = document.getElementById('close_menu')
const nav = document.getElementById('nav')

openMenuBtn.addEventListener('click',() => {
    nav.classList.toggle('hidden')
})
closeMenuBtn.addEventListener('click',() => {
   nav.classList.toggle('hidden')
})



// let f = (v1) => (v2) =>  v1 + v2


// let f2 = f(60)

// console.log(f2(-50));



// class Obj {
//     constructor(name){
//         this.name = name,
//         this.age = 23
//         this.address = 'address'
//         let address2 = 'address2';
//     }
//     method(){
//         console.log(address2);
//     }

// }

function Obj (age,name) {
    this.name = name
    this.age = age
    this.fn = function(){
        return this;
    }
}

const module = {
    x: 42,
    getx : function(){
    
    }
}

const {x, getx} = module

console.log(module.getx());

// let method = module.getx
// ;
// let methodBinded = method.bind(module)

// this === undefined ? console.log("undefined") : console.log(this)

// window.x = 50

// let tailwindcss = {x : 100}

// console.log(window.x);

// console.log(method.bind(tailwindcss)());


// console.log(obj.name == obj2.name);

// for(let prop in obj){
//     console.log(prop);
// }

// console.log([] === []);
// console.log({} === {});
//  function fn (){}
//  function fn2 (){}
// console.log(fn);


