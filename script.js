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
const doodles = document.querySelector('.doodles');
const about = document.querySelector('.about');
const projectSubhead = document.querySelector('.projectHeading');
const doodleSubhead = document.querySelector('.doodleHeading')

pageSwitcher.addEventListener('click', switchPage);

function switchPage() {
  if (pageSwitcher.textContent === 'About Me') {
    pageSwitcher.textContent = 'Projects';
    projectSubhead.textContent = '';
    doodleSubhead.textContent = '';
    projects.style.display = 'none';
    doodles.style.display = 'none';
    about.style.display = 'flex';
  } else {
    pageSwitcher.textContent = 'About Me';
    projectSubhead.textContent = 'Projects';
    doodleSubhead.textContent = 'Doodles';
    projects.style.display = 'flex';
    doodles.style.display = 'flex';
    about.style.display = 'none';
  }
}
