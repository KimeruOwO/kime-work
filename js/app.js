document.addEventListener('selectstart', (e) => {
    e.preventDefault();
})


function copyText(selector) {
  const text = document.querySelector(selector).textContent.trim();

  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);

  tempInput.select();
  document.execCommand('copy');

  document.body.removeChild(tempInput);

  const toast = document.getElementById('msg__copy');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

