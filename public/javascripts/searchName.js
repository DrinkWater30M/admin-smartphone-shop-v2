
document.getElementById('search-bar').onchange = function (input) {

    let nameProduct = document.getElementById('search-bar').value
    let url = ''
    let urlCur = window.location.href
    urlCur = urlCur.substring(0, urlCur.indexOf('products'))
    url = urlCur + 'products' + '?search=' + nameProduct.toLowerCase();
    // if (urlCur.indexOf('search=') == -1)
    //     if (urlCur.indexOf('?') == -1)
    //         url = window.location.href + '?search=' + nameProduct.toLowerCase();
    //     else
    //         url = window.location.href + '&search=' + nameProduct.toLowerCase();
    // else {
    //     url = urlCur.substring(0, urlCur.indexOf('search=')) + 'search=' + nameProduct.toLowerCase();
    //     for (let i = urlCur.indexOf('search=') + 7; i < urlCur.length; i++)
    //         if (urlCur[i] == '?' || urlCur[i] == '/')
    //             url = url + urlCur.substring(i)
    // }
    window.location.assign(url)
}

document.getElementById("product-form").onsubmit = function(event){
    event.preventDefault()
}
