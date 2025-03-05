const background = document.getElementById('background');
const numberOfDigits = 250; // Количество цифр

function createBinaryDigit() {
  const digit = document.createElement('span');
  digit.classList.add('binary-digit');
  digit.textContent = Math.random() < 0.5 ? '0' : '1'; // Случайный 0 или 1

  // Случайное положение по горизонтали
  digit.style.left = Math.random() * 100 + 'vw';

  // Случайная задержка анимации для создания разнообразия
  digit.style.animationDelay = Math.random() * 2 + 's';

  // Случайная продолжительность анимации для разных скоростей
  digit.style.animationDuration = Math.random() * 8 + 6 + 's';

  //Случайный размер
  digit.style.fontSize = Math.random() * 0.8 + 0.8 + 'em';


  background.appendChild(digit);

  //Удаляем цифру после завершения анимации
  digit.addEventListener('animationend', () => {
    digit.remove();
  });
}

// Создаем цифры только один раз при загрузке страницы
function populateBackground() {
    for (let i = 0; i < numberOfDigits; i++) {
        createBinaryDigit();
    }
}


// Создаем новые цифры с интервалом
function startAnimation() {
  setInterval(() => {
    createBinaryDigit();
  }, 200); // Создаем новую цифру каждые 200 миллисекунд
}


// Запускаем все
populateBackground();
startAnimation();