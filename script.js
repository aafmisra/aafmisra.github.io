document.body.className = localStorage.getItem('color');

const colorSwitcher = document.querySelector('.switcher');

colorSwitcher.addEventListener('click', changeColor);

function changeColor(evt) {
  const buttonColorClicked = evt.target.dataset.color;
  if (buttonColorClicked === 'teal') {
    document.body.className = '';
    document.body.classList.add('teal');
    window.localStorage.setItem('color', 'teal');
  } else if (buttonColorClicked === 'blue') {
    document.body.className = '';
    document.body.classList.add('blue');
    window.localStorage.setItem('color', 'blue');
  } else if (buttonColorClicked === 'maroon') {
    document.body.className = '';
    document.body.classList.add('maroon');
    window.localStorage.setItem('color', 'maroon');
  }
}

const pageSwitcher = document.querySelector('span');
const projects = document.querySelector('.projects');
const about = document.querySelector('.about');
const subhead = document.querySelector('h2');

pageSwitcher.addEventListener('click', switchPage);

function switchPage() {
  if (pageSwitcher.textContent === 'About Me') {
    pageSwitcher.textContent = 'Projects';
    subhead.textContent = '';
    projects.style.display = 'none';
    about.style.display = 'flex';
  } else {
    pageSwitcher.textContent = 'About Me';
    subhead.textContent = 'Projects';
    projects.style.display = 'flex';
    about.style.display = 'none';
  }
}
