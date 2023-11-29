import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  const firstDelay = parseInt(this.elements.delay.value, 10);
  const delayStep = parseInt(this.elements.step.value, 10);
  const amount = parseInt(this.elements.amount.value, 10);

  generatePromises(amount, firstDelay, delayStep)
    .then(() => {
      this.reset();
    })
    .catch(error => {
      console.error('Error during promise generation:', error);
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

async function generatePromises(amount, firstDelay, delayStep) {
  const promises = [];

  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * delayStep;

    const promise = createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(promise);
  }

  await Promise.all(promises);
}
