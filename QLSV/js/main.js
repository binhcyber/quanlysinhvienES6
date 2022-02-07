var truonghoc = new TruongHoc();

// -----------------------Hàm gọi modal popup---------------------------
GoiModal = (model_title, readonly = false, type = 1) => {
  // type 1: Thêm thông tin sinh viên, type 2: Sửa thông tin nhân viên
  document.getElementById("exampleModalLabel").innerHTML = model_title;
  document.getElementById("txtMaSV").readOnly = readonly;
  switch (type) {
    case 1:
      document.getElementById("btn-themsinhvien").style.display = "block";
      document.getElementById("btn-CapNhat").style.display = "none";
      break;
    case 2:
      document.getElementById("btn-themsinhvien").style.display = "none";
      document.getElementById("btn-CapNhat").style.display = "block";
      break;
  }
};
// ------------------------------Clear form--------------------------
clearForm = () => {
  document.getElementById("formQLSV").reset();
};
//----------------------------Thêm sinh viên-----------------------------
document.getElementById("themsinhvien").addEventListener("click", () => {
  GoiModal("THÊM SINH VIÊN", false, 1);
});
document.getElementById("btn-themsinhvien").addEventListener("click", () => {
  var ma = document.getElementById("txtMaSV").value;
  var ten = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var mk = document.getElementById("txtPass").value;
  var kh = document.getElementById("khSV").value;
  var toan = document.getElementById("txtDiemToan").value * 1;
  var ly = document.getElementById("txtDiemLy").value * 1;
  var hoa = document.getElementById("txtDiemHoa").value * 1;
  var sinhvien = new SinhVien(ma, ten, email, mk, kh, toan, ly, hoa);
  flag = [
    kiemTraRong("txtMaSV", "spanMaSV", 0),
    kiemTraRong("txtTenSV", "spanTenSV", 1),
    kiemTraRong("txtEmail", "spanEmailSV", 2),
    kiemTraRong("txtPass", "spanMatKhau", 3),
    kiemTraKhoaHoc("khSV", "spanKhoaHoc", 4),
    kiemTraRong("txtDiemToan", "spanToan", 5),
    kiemTraRong("txtDiemLy", "spanLy", 6),
    kiemTraRong("txtDiemHoa", "spanHoa", 7),
    kiemTraKyTuSo("txtMaSV", "spanMaSV", 8, 1, 10000),
    kiemTraKyTuSo("txtDiemToan", "spanToan", 9, 0, 10),
    kiemTraKyTuSo("txtDiemLy", "spanLy", 10, 0, 10),
    kiemTraKyTuSo("txtDiemHoa", "spanHoa", 11, 0, 10),
    kiemTraKyTuChu("txtTenSV", "spanTenSV", 12),
    kiemTraEmail("txtEmail", "spanEmailSV", 13),
  ];
  for (let i = 0; i < flag.length; i++) {
    let check = flag[i];
    if (!check) {
      return false;
    }
  }

  truonghoc.ThemSinhVien(sinhvien);
  clearForm();
  renderTable(truonghoc.DanhSachSinhVien);
  swal("Thành công!", "Bạn đã thêm thành công!", "success");
  luuLocal();
  renderListPage();
});
//--------------------------Tìm kiếm sinh viên-------------------------
document.getElementById("btnSearch").addEventListener("click", () => {
  var sinhVienCanTim = document.getElementById("txtSearch").value;
  var svTimKiem = truonghoc.TimSinhVienTheoTen(sinhVienCanTim);
  console.log(svTimKiem);
  renderTables = (array) => {
    let contentHTML = "";
    for (i = 0; i < array.length; i++) {
      let sv = array[i];

      contentHTML += `
      <tr>
      <td>${sv.ma}</td>
      <td>${sv.ten}</td>
      <td>${sv.email}</td>
      <td>${sv.kh}</td>
      <td>${sv.DiemTrungBinh()}</td>
      <td>
      <button class = "btn btn-danger" " onclick="truonghoc.XoaSinhVien(${
        sv.ma
      })"><i class="fas fa-trash"></i></button>
      </td>
      <td>
      <button  data-toggle="modal" data-target="#exampleModal" class = "btn btn-warning text-white"
      onclick="suasinhvien(${sv.ma})"><i class="fas fa-edit"></i></button>
      </td>`;
    }
    document.getElementById("tbodySinhVien").innerHTML = contentHTML;
  };
  renderTables(svTimKiem);
});
document.getElementById("txtSearch").addEventListener("keyup", () => {
  var sinhVienCanTim = document.getElementById("txtSearch").value;
  var svTimKiem = truonghoc.TimSinhVienTheoTen(sinhVienCanTim);
  renderTables = (array) => {
    let contentHTML = "";
    for (i = 0; i < array.length; i++) {
      let sv = array[i];

      contentHTML += `
      <tr>
      <td>${sv.ma}</td>
      <td>${sv.ten}</td>
      <td>${sv.email}</td>
      <td>${sv.kh}</td>
      <td>${sv.DiemTrungBinh()}</td>
      <td>
      <button class = "btn btn-danger" " onclick="truonghoc.XoaSinhVien(${
        sv.ma
      })"><i class="fas fa-trash"></i></button>
      </td>
      <td>
      <button  data-toggle="modal" data-target="#exampleModal" class = "btn btn-warning text-white"
      onclick="suasinhvien(${sv.ma})"><i class="fas fa-edit"></i></button>
      </td>`;
    }
    document.getElementById("tbodySinhVien").innerHTML = contentHTML;
  };
  renderTables(svTimKiem);
});

//------------------------------------Sửa sinh viên-----------------------
suasinhvien = (maSV) => {
  GoiModal("SỬA SINH VIÊN", true, 2);
  var suaSinhvien = truonghoc.SuaSinhVien(maSV);
  console.log(suaSinhvien);
  document.getElementById("txtMaSV").value = suaSinhvien.ma;
  document.getElementById("txtTenSV").value = suaSinhvien.ten;
  document.getElementById("txtEmail").value = suaSinhvien.email;
  document.getElementById("txtPass").value = suaSinhvien.mk;
  document.getElementById("khSV").value = suaSinhvien.kh;
  document.getElementById("txtDiemToan").value = suaSinhvien.toan;
  document.getElementById("txtDiemLy").value = suaSinhvien.ly;
  document.getElementById("txtDiemHoa").value = suaSinhvien.hoa;
};
//-----------------------------Cập nhật sinh viên-------------------------
document.getElementById("btn-CapNhat").addEventListener("click", () => {
  var ma = document.getElementById("txtMaSV").value;
  var ten = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var mk = document.getElementById("txtPass").value;
  var kh = document.getElementById("khSV").value;
  var toan = document.getElementById("txtDiemToan").value * 1;
  var ly = document.getElementById("txtDiemLy").value * 1;
  var hoa = document.getElementById("txtDiemHoa").value * 1;
  flag = [
    kiemTraRong("txtMaSV", "spanMaSV", 0),
    kiemTraRong("txtTenSV", "spanTenSV", 1),
    kiemTraRong("txtEmail", "spanEmailSV", 2),
    kiemTraRong("txtPass", "spanMatKhau", 3),
    kiemTraKhoaHoc("khSV", "spanKhoaHoc", 4),
    kiemTraRong("txtDiemToan", "spanToan", 5),
    kiemTraRong("txtDiemLy", "spanLy", 6),
    kiemTraRong("txtDiemHoa", "spanHoa", 7),
    kiemTraKyTuSo("txtMaSV", "spanMaSV", 8, 0, 10),
    kiemTraKyTuSo("txtDiemToan", "spanToan", 9, 0, 10),
    kiemTraKyTuSo("txtDiemLy", "spanLy", 10, 0, 10),
    kiemTraKyTuSo("txtDiemHoa", "spanHoa", 11, 0, 10),
    kiemTraKyTuChu("txtTenSV", "spanTenSV", 12),
    kiemTraEmail("txtEmail", "spanEmailSV", 13),
  ];
  for (let i = 0; i < flag.length; i++) {
    let check = flag[i];
    if (!check) {
      return false;
    }
  }
  var sinhVienCapNhat = truonghoc.Capnhatsinhvien(ma);
  console.log(sinhVienCapNhat);
  truonghoc.DanhSachSinhVien[sinhVienCapNhat] = new SinhVien(
    ma,
    ten,
    email,
    mk,
    kh,
    toan,
    ly,
    hoa
  );
  renderTable(truonghoc.DanhSachSinhVien);
  clearForm();
  swal("Cập nhật thành công!", "Bạn đã cập nhật thành công!", "success");
});
//---------------------------------Hiển thị ra giao diện--------------------
let perPage = 2;
let currentPage = 1;
let start = 0;
let end = perPage;
renderTable = (array) => {
  let contentHTML = "";
  for (i = 0; i < array.length; i++) {
    let sv = array[i];
    if (i >= start && i < end) {
      contentHTML += `
    <tr>
    <td>${sv.ma}</td>
    <td>${sv.ten}</td>
    <td>${sv.email}</td>
    <td>${sv.kh}</td>
    <td>${sv.DiemTrungBinh()}</td>
    <td>
    <button class = "btn btn-danger" " onclick="truonghoc.XoaSinhVien(${
      sv.ma
    })"><i class="fas fa-trash"></i></button>
    </td>
    <td>
    <button  data-toggle="modal" data-target="#exampleModal" class = "btn btn-warning text-white"
    onclick="suasinhvien(${sv.ma})"><i class="fas fa-edit"></i></button>
    </td>`;
    }
  }
  document.getElementById("tbodySinhVien").innerHTML = contentHTML;
  renderListPage();
  changePage();
};
//----------------------------------Pagination---------------------------
changePage = () => {
  let currentPages = document.querySelectorAll("#num-page li");
  for (let i = 0; i < currentPages.length; i++) {
    currentPages[i].addEventListener("click", () => {
      let value = i + 1;
      currentPage = value;
      currentPages[i].classList.remove("active");
      currentPages[i].classList.add("active");
      getCurrentPage(currentPage);
      renderTable(truonghoc.DanhSachSinhVien);
    });
  }
};
renderListPage = () => {
  let totalPage = Math.ceil(truonghoc.DanhSachSinhVien.length / perPage);
  let html = "";
  html += `<li class="page-item active">
    <a class="page-link " href="#">${1}</a>
  </li>`;
  for (let i = 2; i <= totalPage; i++) {
    html += `<li class="page-item ">
    <a class="page-link" href="#">${i}</a>
  </li>`;
  }
  document.getElementById("num-page").innerHTML = html;
};
getCurrentPage = (currentPage) => {
  start = (currentPage - 1) * perPage;
  end = currentPage * perPage;
};

document.getElementById("next").addEventListener("click", () => {
  currentPage++;
  let totalPage = Math.ceil(truonghoc.DanhSachSinhVien.length / perPage);
  if (currentPage > totalPage) {
    currentPage = totalPage;
  }
  if (currentPage === totalPage) {
    document.getElementById("next").classList.add("disabled");
  }
  document.getElementById("previous").classList.remove("disabled");
  getCurrentPage(currentPage);
  renderTable(truonghoc.DanhSachSinhVien);
});
document.getElementById("previous").addEventListener("click", () => {
  currentPage--;
  if (currentPage <= 1) {
    currentPage = 1;
  }
  if (currentPage === 1) {
    document.getElementById("previous").classList.add("disabled");
  }
  document.getElementById("next").classList.remove("disabled");
  getCurrentPage(currentPage);
  renderTable(truonghoc.DanhSachSinhVien);
});

// ---------------------------Lưu local Strorage--------------------------
luuLocal = () => {
  let localJson = JSON.stringify(truonghoc.DanhSachSinhVien);
  localStorage.setItem("DSSV", localJson);
};
let getLocal = localStorage.getItem("DSSV");
let parseLocal = JSON.parse(getLocal);
truonghoc.DanhSachSinhVien = parseLocal.map((sv) => {
  return new SinhVien(
    sv.ma,
    sv.ten,
    sv.email,
    sv.mk,
    sv.kh,
    sv.toan,
    sv.ly,
    sv.hoa
  );
});
renderTable(truonghoc.DanhSachSinhVien);
//Sắp xếp
document.getElementById("arrowUp").addEventListener("click", () => {
  document.getElementById("arrowUp").style.display = "none";
  document.getElementById("arrowDown").style.display = "inline";
  truonghoc.SapxepSinhVienTheoMa(1);
  renderTable(truonghoc.DanhSachSinhVien);
});
document.getElementById("arrowDown").addEventListener("click", () => {
  document.getElementById("arrowUp").style.display = "inline";
  document.getElementById("arrowDown").style.display = "none";
  truonghoc.SapxepSinhVienTheoMa(2);
  renderTable(truonghoc.DanhSachSinhVien);
});
