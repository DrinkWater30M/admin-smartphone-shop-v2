const addCategoryProductBtn = document.getElementById("add-product-btn");
const delCategoryProductBtn = document.getElementById("del-category-btn");
let errorData = document.getElementById("add-product-category-error");

function validateInputData(){
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

        return false;
    }
    else{
        return true;
    }
}

addCategoryProductBtn.addEventListener('click', ()=>{
    if(validateInputData()){
        document.getElementById("form-category").submit();
    }

});

delCategoryProductBtn.addEventListener('click', ()=>{
    document.getElementById("form-del-category").submit();
});