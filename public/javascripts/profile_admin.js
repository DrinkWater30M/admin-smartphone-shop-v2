function main() {
    const name = document.getElementById('ten_nguoi_su_dung').value;
    const username = document.getElementById('ten_dang_nhap').value;
    const email = document.getElementById('email').value;
    let error = document.getElementById('error');
    error.textContent = '';

    if (name == '' || username == '' || email == '') {
        error.append('Còn thông tin chưa được nhập')
    }
    else if (!email.includes("@")) {
        error.append('Email phải có ký hiệu @');
    }
    else {
        document.getElementById('form_profile').submit();
    }
}

document.getElementById('btn_update_profile').onclick = main;