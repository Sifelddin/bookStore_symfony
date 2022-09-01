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

const openMenuBtn = document.getElementById('open_menu');
const closeMenuBtn = document.getElementById('close_menu');
const nav = document.getElementById('nav');

openMenuBtn?.addEventListener('click', () => {
  nav.classList.toggle('hidden');
});
closeMenuBtn.addEventListener('click', () => {
  nav.classList.toggle('hidden');
});

const userMenu = document.getElementById('userMenu');
const userNav = document.getElementById('userNav');
const userActionsNav = document.getElementById('userActionsNav');
const userActionsMenu = document.getElementById('userActionsMenu');

userMenu?.addEventListener('click', (e) => toggleClasses(e, userActionsMenu));
userNav?.addEventListener('click', (e) => toggleClasses(e, userActionsNav));

document.addEventListener('click', clickDocument(userActionsNav));
document.addEventListener('click', clickDocument(userActionsMenu));

function toggleClasses(e, userActions) {
  e.stopPropagation();
  if (userActions.classList.contains('hidden')) {
    userActions.classList.remove('hidden');
    userActions.classList.add('block');
  } else {
    userActions.classList.add('hidden');
    userActions.classList.remove('block');
  }
}

function clickDocument(userActions) {
  if (userActions?.classList.contains('block')) {
    userActions.classList.remove('block');
    userActions.classList.add('hidden');
  }
}
