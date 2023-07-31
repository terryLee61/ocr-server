const board_number = window.location.pathname.split('/board/')[1]

$.ajax({
    "url": `/api/v1/boards/board/${board_number}`,
    "method": "GET",
    "timeout": 0,
}).done(function (board) {
    console.log(board);
    $('#author').text(board.author === null ? 'anonymous' : board.author.username);
    $('#title').val(board.title);
    $('#contents').val(board.contents);
    $('#loaded_file').attr('src', board.loaded_file);
    $('#created_at').val(board.created_at);
    $('#modified_at').val(board.modified_at);
});

function displayOCRResult(result) {
    var ocrContents = document.getElementById('ocr_contents');
    ocrContents.value = result;
}

function performOCR() {
    var image = document.getElementById('loaded_file');
    var apiUrl = 'http://127.0.0.1:8000/ocr'; // 실제 서버의 OCR API 엔드포인트 URL로 대체해야 함

    // 이미지 데이터를 FormData로 생성
    var formData = new FormData();
    formData.append('image', image.src);

    // AJAX를 사용하여 서버와 통신
    fetch(apiUrl, {
        method: 'POST', // 이미지 데이터를 POST 방식으로 전송
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        var result = data.result;
        displayOCRResult(result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// 이미지 업로드 input 요소에 change 이벤트 리스너 추가
// var imageUpload = document.getElementById('image_upload');
// if (imageUpload) { // 요소가 존재하는지 확인
//     imageUpload.addEventListener('change', function() {
//         var imageContainer = document.getElementById('image-container');
//         var image = document.getElementById('image_url');
//         var file = this.files[0];
//         var reader = new FileReader();

//         reader.onload = function (e) {
//             image.src = e.target.result;
//             image.style.display = 'block';
//         };

//         reader.readAsDataURL(file);
//     });
// } else {
//     console.error('Image upload element not found.');
// }