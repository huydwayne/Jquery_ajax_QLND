function NguoiDungService() {
  this.DSND = [];

  this.layDanhSachNguoiDung = function() {
    return $.ajax({
      url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
      type: "GET"
    });
    //   .done(function(result) {
    //     this.DSND = result;
    //   })
    //   .fail(function(err) {
    //     console.log(err);
    //   });
  };

  this.themNguoiDung = function(nguoiDung) {
    $.ajax({
      url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
      type: "POST",
      data: nguoiDung
    })
    .done(function(result){
      if (result === "tai khoan da ton tai !"){
        alert(result);
      } else {
        location.href = "";
      }
    })
    .fail(function(err){
      console.log(err);
    })
  };

  this.timKiemNguoiDung = function (chuoiTimKiem){
    var mangTimKiem = [];
    var DSND = JSON.parse(sessionStorage.getItem("DSND"));
    DSND.map(function(item){
      // if(value)  value : false,nan,null,undefined,"",0
      if (item.TaiKhoan.toLowerCase().indexOf(chuoiTimKiem.toLowerCase())>-1){
        mangTimKiem.push(item);
      }
    })

    return mangTimKiem;
  }

  this.xoaNguoiDung = function(taikhoan){
    $.ajax({
      url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taikhoan}`,
      type: "DELETE",

    })
    .done(function(result){
      console.log(result);
    })
    .fail(function(err){
      console.log(err);
    })
  }

  this.layViTriNguoiDung = function (taikhoan){
    var viTri;
    var danhSachNguoiDung = JSON.parse(localStorage.getItem("DSND"));
    // danhSachNguoiDung.map(function(item,index){
    //   if (item.TaiKhoan === taikhoan) {
    //     viTri = index;
    //     return viTri;
    //   }
    // })
    return danhSachNguoiDung.findIndex(function(item){
      return item.TaiKhoan === taikhoan;
    });

      // return viTri;
    
  }
  this.layThongTinNguoiDung = function (taikhoan){
    var danhSachNguoiDung = JSON.parse(localStorage.getItem("DSND"));
     return danhSachNguoiDung.find(function(item){
      return item.TaiKhoan === taikhoan;
    })
  }
  this.suaNguoiDung = function(taikhoan){
    console.log(23);
  }
}
