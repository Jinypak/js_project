const wrapper = document.querySelector('.wrapper');
generateBtn = wrapper.querySelector('.form button');
qrInput = wrapper.querySelector('.form input');
qrImg = wrapper.querySelector('.qr-code img');

generateBtn.addEventListener('click', () => {
  let qrValue = qrInput.value;
  if (!qrValue) return;
  generateBtn.innerText = 'Generating...';
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
  qrImg.addEventListener('load', () => {
    wrapper.classList.add('active');
    generateBtn.innerText = 'Generate QR Code';
  });
});

qrInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    generateBtn.click();
  }

  if (!qrInput.value) {
    wrapper.classList.remove('active');
  }
});