function main() {
    let paginationLeft = document.getElementById('pagination-left');
    let paginationRight = document.getElementById('pagination-right');
    let url = window.location.href;
    let curPage = 1;

    if (url.indexOf('page=') == -1)
        curPage = 1;
    else
        curPage = Number.parseInt(url.substring(url.indexOf('page=') + 5))

    paginationLeft.addEventListener('click', () => {
        if (curPage > 1) {
            curPage = curPage - 1;
            if (curPage == 1)
                window.location.assign(url.substring(0, url.indexOf('page=') - 1)); //bỏ dấu chấm hỏi hoặc &
            else
                window.location.assign(url.substring(0, url.indexOf('page=')) + 'page=' + curPage)
        }
    })

    paginationRight.addEventListener('click', () => {
        curPage = curPage + 1;
        if (curPage == 2) {
            if (window.location.search == '')
                window.location.assign(url + '?page=' + curPage)
            else
                window.location.assign(url + '&page=' + curPage)
        }
        else {
            window.location.assign(url.substring(0, url.indexOf('page=')) + 'page=' + curPage)
        }
    })
}

main();