$.ajax({
    "url": "/api/v1/boards",
    "method": "GET",
    "timeout": 0,
}).done(function (list) {
    list.forEach(board => {
        image_url = 'media/noimage.jpeg';
        image_url = board.loaded_file === null ? image_url : board.loaded_file;
        
        $('#boards-container').append(`
        <div class="board">
            <div class="img">
                <img src="${image_url}">
            </div>
            <div class="img_sub">
                <p>
                    <a href="/board/${board.no}"><h4>${board.title}</h4></a>
                    <span>${board.author}</span>
                </p>
            </div>
        </div>
        `)
    })
});