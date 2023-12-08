import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const firstDelay = parseInt(this.elements.delay.value, 10);
    const step = parseInt(this.elements.step.value, 10);
    const amount = parseInt(this.elements.amount.value, 10);

    for (let i = 1; i <= amount; i++) {
      try {
        const result = await createPromise(i, firstDelay + (i - 1) * step);
        Notiflix.Notify.success(
          `Fulfilled promise ${result.position} in ${result.delay}ms`
        );
      } catch (error) {
        Notiflix.Notify.failure(
          `Rejected promise ${error.position} in ${error.delay}ms`
        );
      }
    }
  });

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
      if (shouldResolve) {
        setTimeout(() => {
          resolve({ position, delay });
        }, delay);
      } else {
        reject({ position, delay });
      }
    });
  }
});
