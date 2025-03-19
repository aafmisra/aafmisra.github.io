const colorSwitcher = document.querySelector('.switcher');
const root = document.documentElement;

// Only run if we're on the page with the color switcher
if (colorSwitcher) {
  colorSwitcher.addEventListener('click', changeColor);
}

// Change custom CSS cars based on which button was clicked
function changeColor(evt) {
  const buttonColorClicked = evt.target.dataset.color;

  if (buttonColorClicked === 'teal') {
    root.style.setProperty('--main-color', "#004643");
    root.style.setProperty('--main-color-', "#abd1c6");
    root.style.setProperty('--contrast-dark-color', "#001e1d");
    root.style.setProperty('--highlight-color', "#f9bc60");
    root.style.setProperty('--highlight-color-', "#e16162");
  } 
  else if (buttonColorClicked === 'brown') {
    root.style.setProperty('--main-color', "#55423d");
    root.style.setProperty('--main-color-', "#ffc0ad");
    root.style.setProperty('--contrast-dark-color', "#271c19");
    root.style.setProperty('--highlight-color', "#e78fb3");
    root.style.setProperty('--highlight-color-', "#9656a1");
  } 
  else if (buttonColorClicked === 'black') {
    root.style.setProperty('--main-color', "#16161a");
    root.style.setProperty('--main-color-', "#94a1b2");
    root.style.setProperty('--contrast-dark-color', "#010101");
    root.style.setProperty('--highlight-color', "#2cb67d");
    root.style.setProperty('--highlight-color-', "#7f5af0");
  }
  else if (buttonColorClicked === 'navy') {
    root.style.setProperty('--main-color', "#232946");
    root.style.setProperty('--main-color-', "#b8c1ec");
    root.style.setProperty('--contrast-dark-color', "#121629");
    root.style.setProperty('--highlight-color', "#ffaa01");
    root.style.setProperty('--highlight-color-', "#ff7900");
  }
}
