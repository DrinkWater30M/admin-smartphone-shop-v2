var images = [];
var addImageBtn = document.getElementById('add-image-btn');
var inputFileTag = document.getElementById('image');
var addProductBtn = document.getElementById('add-product-btn');

function checkDuplicate(name) {
    let image = true;
    if (images.length > 0) {
        for (e = 0; e < images.length; e++) {
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
          if (checkDuplicate(images, image[i].name)) {
     images.push({
                  "name" : image[i].name,
                  "url" : URL.createObjectURL(image[i]),
                  "file" : image[i],
            })
          } else 
          {
               alert(image[i].name + "Có vài ảnh đã được thêm!");
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
    addProductBtn.addEventListener('click', ()=>{
        //Get data images
        console.log(getImageData())
    })
}

main();