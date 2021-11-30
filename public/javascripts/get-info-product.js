
document.getElementById('btn-submit-product').addEventListener('click', () => {
    const infoProduct = document.getElementsByClassName("info-add-product")
    let formData = {}
    Array.from(infoProduct).forEach(element => {
        console.log("🚀 ~ file: get-info-product.js ~ line 6 ~ Array ~ element", element)
        formData[element.name] = element.value
    });
    const url_post = window.location.href + '/post'
    
    fetch(url_post, {
        method: 'POST', // thêm mới thì dùng post
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // chuyển dữ liệu object trên thành chuỗi json
    })
    .then((data) => {
        console.log('Success:', data); // ghi log kết quả hoàn thành
    })
    .catch((error) => {

        console.error('Error:', error); // ghi log nếu xảy ra lỗi
    });
});