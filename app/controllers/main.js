$(document).ready(function() {
  // ready function để cho nó đợi mọi file Html css chạy xong thì nó mới bắt đầu chạy
  var nguoiDungService = new NguoiDungService();

  layDanhSachNguoiDung();

  function getInput(title, btnTitle, btnId) {
    $(".modal-title").html(title);

    var footer = `
            <button id="${btnId}" class="btn btn-success">${btnTitle}</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            `;

    $(".modal-footer").html(footer);
  }

  $("#btnThemNguoiDung").click(function() {
    getInput("Thêm người dùng", "Thêm", "btnThem");
  });

  // delegate,on,live,bind,addeventlistener
  $("body").on("click", ".btnSua", function() {
    getInput("Sửa người dùng", "Cập nhật", "btnCapNhat");
    var taikhoan = $(this).data('taikhoan');
    // var index = nguoiDungService.layViTriNguoiDung(taikhoan);
    var nguoiDung = nguoiDungService.layThongTinNguoiDung(taikhoan);

    console.log(nguoiDung);
    // $("#TaiKhoan").val(taikhoan);
    $("#HoTen").val(nguoiDung.TaiKhoan);
    $("#MatKhau").val(nguoiDung.MatKhau);
    $("#Email").val(nguoiDung.Email);
    $("#SoDienThoai").val(nguoiDung.SoDT);
    $("#loaiNguoiDung").val(nguoiDung.TenLoaiNguoiDung);

  });

  $("body").delegate("#btnThem", "click", function() {
      var taikhoan = $("#TaiKhoan").val();
      var hoten = $("#HoTen").val();
      var matkhau = $("#MatKhau").val();
      var email = $("#Email").val();
      var SoDT = $("#SoDienThoai").val();
      var loainguoidung = $("#loaiNguoiDung").val();
    var nguoiDung = new NguoiDung(taikhoan,hoten,matkhau,email,SoDT,loainguoidung);
    nguoiDungService.themNguoiDung(nguoiDung);
  });

  $("body").delegate(".btnXoa","click",function(){
    var taikhoan = $(this).data("taikhoan");
    nguoiDungService.xoaNguoiDung(taikhoan);
  })

  $("body").delegate("#btnCapNhat","click",function(){

  })

  $("#txtTimKiem").keyup(function(){
        var mangTimKiem =[];
        var taikhoan = $(this).val();
        mangTimKiem = nguoiDungService.timKiemNguoiDung(taikhoan);
        taoBang(mangTimKiem);
  })
  function layDanhSachNguoiDung() {
    nguoiDungService
      .layDanhSachNguoiDung()
      .done(function(result) {
        // console.log(result);
        taoBang(result);
        localStorage.setItem("DSND",JSON.stringify(result));
        nguoiDungService.DSND = result;
      })
      .fail(function(err) {
        console.log(err);
      });
  }

  function taoBang(danhSachNguoiDung) {
    var tblBody = "";
    // Map có ba tham số là value,index và array
    // map xuất ra từng người dùng được gán vào item và có vị trí là index
    danhSachNguoiDung.map(function(item, index) {
      tblBody += `
        <tr>

            <td>${index + 1}</td>
            <td>${item.TaiKhoan}</td>
            <td>${item.MatKhau}</td>
            <td>${item.HoTen}</td>
            <td>${item.Email}</td>
            <td>${item.SoDT}</td>
            <td>${item.TenLoaiNguoiDung}</td>
            <td>
            <button class="btn btn-success btnSua"  data-toggle="modal" data-target="#myModal" data-taikhoan="${item.TaiKhoan}">Sửa</button>
            <button class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xóa</button>
            </td>

        </tr>
        
        
        `;
    });

    // for (var i = 0; i < danhSachNguoiDung.length; i++) {
    //   tblBody += `
    //             <tr>

    //                 <td>${i + 1}</td>
    //                 <td>${danhSachNguoiDung[i].TaiKhoan}</td>
    //                 <td>${danhSachNguoiDung[i].MatKhau}</td>
    //                 <td>${danhSachNguoiDung[i].HoTen}</td>
    //                 <td>${danhSachNguoiDung[i].Email}</td>
    //                 <td>${danhSachNguoiDung[i].SoDT}</td>
    //                 <td>${danhSachNguoiDung[i].TenLoaiNguoiDung}</td>

    //             </tr>
    //         `;
    // }
    $("#tblDanhSachNguoiDung").html(tblBody);
  }
});
