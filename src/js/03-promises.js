import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector("[name = 'delay']"),
  step: document.querySelector("[name = 'step']"),
  amount: document.querySelector("[name = 'amount']"),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);


function onSubmit() {
  event.preventDefault();
  let startDelay = refs.delay.value;
  const step = refs.step.value;
  const maxCalls = refs.amount.value

  for (let i = 1; i <= maxCalls; i += 1) {
    createPromise(i, startDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.failure(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.success(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    startDelay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

