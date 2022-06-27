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