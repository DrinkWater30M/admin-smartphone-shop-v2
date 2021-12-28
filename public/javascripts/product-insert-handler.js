//Handle preview images before upload
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

//Handle product information before add product
let addCategoryProductBtn = document.getElementById('add-product-category-btn');
let errorData = document.getElementById('add-product-category-error');
let product = document.querySelector('ul[class="product-inf"]');

function getProductData(){
    let form = new FormData();

    //Get product
    let fieldsProductElement = document.querySelectorAll('.product-inf .inf.product');
    for(let field of fieldsProductElement){
        form.append(field.name, field.value);
    }

    // //Get category
    let categoryElement = document.querySelectorAll('.product-inf .product-inf-category');
    for(let item of categoryElement){
        let fieldsCategory = item.querySelectorAll('.inf.category');
        for(let field of fieldsCategory){
            form.append(field.name, field.value);
        }
    }

    return form;
}

function main(){
    //PRODUCT INFORMATION
    addCategoryProductBtn.addEventListener('click', ()=>{
        //Check empty data
        let inputsData = document.querySelectorAll('.product-inf .inf');
        let emptyData = false;

        for(let i = 0; i < inputsData.length; i++){
            if(inputsData[i].value == ""){
                emptyData = true;
                break;
            }
        }

        if(emptyData){
            //Notification
            errorData.innerText = "Có trường dữ liệu nào đó bị trống!";
            inputsData.forEach(inputData => {
                inputData.addEventListener('focus', ()=>{
                    errorData.innerText = "";
                })
            })
        }
        else{
            //Add new category, change necessary value
            let categoryProductCurrent = document.querySelector('.product-inf-category:last-child').cloneNode(true);
            let sequenceCategoryProduct = Number.parseInt(categoryProductCurrent.querySelector('span').textContent) + 1;
            categoryProductCurrent.querySelector('span').innerText = sequenceCategoryProduct;
            categoryProductCurrent.classList.remove(sequenceCategoryProduct - 1);
            categoryProductCurrent.classList.add(sequenceCategoryProduct);

            //Add html
            product.insertAdjacentHTML( 'beforeend', categoryProductCurrent.outerHTML);
        }
    })

    //PREVIEW IMAGES
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
        //Check images
        if(images.length == 0){
            errorData.innerText = "Có trường dữ liệu nào đó bị trống!";
        }
            else{
            //Get data images
            let formImage = getImageData();

            //Get and add data fields of product to form
            let formProduct = getProductData();

            //Generate form form form image and form Product
            let form = new FormData;
            for (let pair of formProduct.entries()) {
                formImage.append(pair[0], pair[1]);
            }
            form = formImage;

            //Call ajax
            $.ajax({
                url: '/api/upload-images',
                type: 'POST',
                processData: false,
                contentType: false,
                cache: false,
                data: form,
                success: function(res){
                    //Notification
                    alert('Thêm sản phẩm thành công!');

                    //Redirect
                    console.log(res.redirectUrl)
                    window.location.href = res.redirectUrl;
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
        }
    })
}

main();