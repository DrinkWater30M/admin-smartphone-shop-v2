var images = [];
var addImageBtn = document.getElementById('add-image-btn');
var inputFileTag = document.getElementById('image');

function checkDuplicate(name) {
    let image = true;
    if (images.length > 0) {
        for (let e = 0; e < images.length; e++) {
            if (images[e].name == name) {
                image = false;
                break;
            }
        }
    }
    return image;
}

function deleteImage(e) {
    console.log(e);
    images.splice(e, 1);
    document.getElementById('container-image').innerHTML = imageShow();
}

function imageShow() {
    let image = "";
    images.forEach((i) => {
        let index = images.indexOf(i);
        image += `<div class="image-preview">
                    <img src="${i.url}" alt="product-image">
                    <span class="position-absolute" onclick="deleteImage(${index})">&times;</span>
                </div>`;
    })
    return image;
}

function imageSelect() {
    let image = document.getElementById('image').files;

    for (i = 0; i < image.length; i++) {
          if (checkDuplicate(image[i].name)) {
     images.push({
                  "name" : image[i].name,
                  "url" : URL.createObjectURL(image[i]),
                  "file" : image[i],
            })
          } else 
          {
               alert(image[i].name + " đã được thêm!");
          }
    }

    document.getElementById('form-image').reset();
    document.getElementById('container-image').innerHTML = imageShow();
}

function getImageData() {
    let form = new FormData();
    for (let index = 0; index < images.length; index++) {
       form.append("file[" + index + "]", images[index]['file']);
    }
    return form;
}

function main(){
    //Event for add image button
    addImageBtn.addEventListener('click', ()=>{
        inputFileTag.click();
    })

    //Handle after choose image
    inputFileTag.addEventListener('change', ()=>{
        imageSelect();
    })

    //Handle for add product btn
    $('#add-product-btn').on('click', ()=>{
        //Get data images
        let data = getImageData();

        //Call ajax
        $.ajax({
            url: '/api/upload-images',
            type: 'POST',
            processData: false,
            contentType: false,
            cache: false,
            data: data,
            success: function(res){
                console.log(res);
                alert('Thêm sản phẩm thành công!');
            },
            error: function(xhr, status, error){
                console.log(error);

                //Create message
                let message = "Đã có lỗi xảy ra, vui lòng thử lại!";

                //Get message from server
                if(xhr.responseText) {message = xhr.responseText.error;}

                //Notification
                alert(message);
            }
        })
    })
}

main();