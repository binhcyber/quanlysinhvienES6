class TruongHoc {
  constructor() {
    this.DanhSachSinhVien = new Array();
  }
  //---------------------------------Thêm sinh viên-------------------------
  ThemSinhVien(sinhvienmoi) {
    this.DanhSachSinhVien = [...this.DanhSachSinhVien, sinhvienmoi];
  }
  //----------------------Tìm kiếm sinh viên--------------------------
  TimvitriSinhVien(maSV) {
    for (let vitri in this.DanhSachSinhVien) {
      if (this.DanhSachSinhVien[vitri].ma == maSV) {
        return vitri;
      }
    }
  }
  //-----------------------------Xóa sinh viên-------------------------
  XoaSinhVien(maSV) {
    let vitri = this.TimvitriSinhVien(maSV);
    this.DanhSachSinhVien.splice(vitri, 1);
    renderTable(truonghoc.DanhSachSinhVien);
    luuLocal();
  }
  //-------------------------------Sứa sinh viên------------------------
  SuaSinhVien(maSV) {
    let vitri = this.TimvitriSinhVien(maSV);
    return this.DanhSachSinhVien[vitri];
  }
  //------------------------------Tìm kiếm sinh viên--------------------
  TimSinhVienTheoTen(Ten) {
    let dskq = new TruongHoc();
    Ten = Ten.trim().toUpperCase();
    for (let sinhvien of this.DanhSachSinhVien) {
      let hotenSV = sinhvien.ten.trim().toUpperCase();
      if (hotenSV.search(Ten) != -1) {
        dskq.DanhSachSinhVien = [...dskq.DanhSachSinhVien, sinhvien];
      }
    }
    return dskq.DanhSachSinhVien;
  }
  //-------------------------------Cập nhật sinh viên--------------------
  Capnhatsinhvien(maSV) {
    let vitri = this.TimvitriSinhVien(maSV);
    return vitri;
  }
  SapxepSinhVienTheoMa(type) {
    switch (type) {
      case 1:
        this.DanhSachSinhVien.sort((a, b) => {
          let x = a.ma;
          let y = b.ma;
          return y - x;
        });
        break;
      case 2:
        this.DanhSachSinhVien.sort((a, b) => {
          let x = a.ma;
          let y = b.ma;
          return x - y;
        });
        break;
    }
  }
}
