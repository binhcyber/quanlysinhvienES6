let checkMess = [
  "Vui lòng nhập mã",
  "Vui lòng nhập tên",
  "Vui lòng nhập email",
  "Vui lòng nhập mk",
  "Vui lòng nhập khóa học",
  "Vui lòng nhập toán",
  "Vui lòng nhập lý",
  "Vui lòng nhập hóa",
  "Mã không hợp lệ",
  "Điểm toán không hợp lệ",
  "Điểm lý không hợp lệ",
  "Điểm hóa không hợp lệ",
  "Tên không hợp lệ",
  "Email không hợp lệ",
];

getElement = (ele) => document.getElementById(ele);
kiemTraRong = (idInput, idSpan, mess) => {
  let flag = true;
  let inputValue = getElement(idInput).value;
  let spanValue = getElement(idSpan);
  if (inputValue === "") {
    spanValue.style.display = "block";
    spanValue.style.color = "red";
    spanValue.innerHTML = checkMess[mess];
    flag = false;
  } else {
    spanValue.style.display = "none";
    flag = true;
  }
  return flag;
};
kiemTraKhoaHoc = (idInput, idSpan, mess) => {
  let flag = true;
  let inputValue = getElement(idInput).value;
  let spanValue = getElement(idSpan);
  if (inputValue === "Chọn khóa học") {
    spanValue.style.display = "block";
    spanValue.style.color = "red";
    spanValue.innerHTML = checkMess[mess];
    flag = false;
  } else {
    spanValue.style.display = "none";
    flag = true;
  }
  return flag;
};
kiemTraKyTuSo = (idInput, idSpan, mess, minLength, maxLength) => {
  let flag = true;
  let num = /^\d+$/;
  let inputValue = getElement(idInput).value;
  let spanValue = getElement(idSpan);
  if (
    inputValue.match(num) &&
    inputValue >= minLength &&
    inputValue <= maxLength
  ) {
    spanValue.style.display = "none";
    flag = true;
  } else {
    spanValue.style.display = "block";
    spanValue.style.color = "red";
    spanValue.innerHTML = checkMess[mess];
    flag = false;
  }
  return flag;
};
kiemTraKyTuChu = (idInput, idSpan, mess) => {
  let flag = true;
  let letters = /^[A-Za-z ]+$/;
  let inputValue = getElement(idInput).value;
  let spanValue = getElement(idSpan);
  if (inputValue.match(letters)) {
    spanValue.style.display = "none";
    flag = true;
  } else {
    spanValue.style.display = "block";
    spanValue.style.color = "red";
    spanValue.innerHTML = checkMess[mess];
    flag = false;
  }
  return flag;
};
kiemTraEmail = (idInput, idSpan, mess) => {
  let flag = true;
  let email =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let inputValue = getElement(idInput).value;
  let spanValue = getElement(idSpan);
  if (inputValue.match(email)) {
    spanValue.style.display = "none";
    flag = true;
  } else {
    spanValue.style.display = "block";
    spanValue.style.color = "red";
    spanValue.innerHTML = checkMess[mess];
    flag = false;
  }
  return flag;
};
