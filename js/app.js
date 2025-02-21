document.addEventListener('selectstart', (e) => {
    e.preventDefault();
})


function copyText(selector) {
  // Lấy nội dung text từ phần tử theo selector và loại bỏ khoảng trắng thừa
  const text = document.querySelector(selector).textContent.trim();

  // Tạo textarea tạm thời và gán giá trị cần copy
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);

  // Chọn nội dung và copy
  tempInput.select();
  document.execCommand('copy');

  // Xóa textarea tạm khỏi DOM
  document.body.removeChild(tempInput);

  // Hiển thị thông báo copy thành công (toast)
  const toast = document.getElementById('msg__copy');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

