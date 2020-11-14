
function resetError() {
    document.getElementById("submitF").innerHTML = "";
}

//Kiểm tra tính hợp lệ của Toạ độ nhập vào
function checkValidCoord() {
    ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
    ck_lon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
    var str = document.getElementById("toado").value;
    var coords = str.split(",");
    var lat = coords[0];
    var lon = coords[1];
    //Kiểm tra
    var validLat = ck_lat.test(lat);
    var validLon = ck_lon.test(lon.trim());
    if (validLat && validLon) {
        return true;
    } else {
        return false;
    }
}