class SinhVien {
  constructor(_ma, _ten, _email, _mk, _kh, _toan, _ly, _hoa) {
    this.ma = _ma;
    this.ten = _ten;
    this.email = _email;
    this.mk = _mk;
    this.kh = _kh;
    this.toan = _toan;
    this.ly = _ly;
    this.hoa = _hoa;
  }
  DiemTrungBinh() {
    return (this.toan + this.ly + this.hoa) / 3;
  }
}
