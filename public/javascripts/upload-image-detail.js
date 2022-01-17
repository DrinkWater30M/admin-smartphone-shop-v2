var images = [];
var addImageBtn = document.getElementById('add-image-btn');
var inputFileTag = document.getElementById('image');



function imageSelect() {
    let image = document.getElementById('image').files;

    for (i = 0; i < image.length; i++) {
        images.push({
            "name": image[i].name,
            "url": URL.createObjectURL(image[i]),
            "file": image[i],
        })
    }

    document.getElementById('form-image').reset();
}


function getImageData() {
    let form = new FormData();
    for (let index = 0; index < images.length; index++) {
        form.append("file[" + index + "]", images[index]['file']);
    }
    return form;
}

function handling() {
    let formImage = getImageData();

    let formProduct = new FormData();
    const idProduct = document.getElementById("idProduct").value;
    formProduct.append('idProduct', idProduct)

    //Generate form form form image and form Product
    let form = new FormData;
    for (let pair of formProduct.entries()) {
        formImage.append(pair[0], pair[1]);
    }
    form = formImage;

    //Call ajax
    $.ajax({
        url: '/api/upload-image',
        type: 'POST',
        processData: false,
        contentType: false,
        cache: false,
        data: formImage,
        success: function (res) {
            //Notification
            alert('Thêm sản phẩm thành công!');

            //Redirect
            console.log(res.redirectUrl)
            window.location.href = res.redirectUrl;
        },
        error: function (xhr, status, error) {
            console.log(error);

            //Create message
            let message = "Đã có lỗi xảy ra, vui lòng thử lại!";

            //Get message from server
            if (xhr.responseText) { message = xhr.responseText.error; }

            //Notification
            alert(message);
        }
    })
}

addImageBtn.addEventListener('click', () => {
    inputFileTag.click();
})

//Handle after choose image
inputFileTag.addEventListener('change', () => {
    imageSelect();
    handling();
})