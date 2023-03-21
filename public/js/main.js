
var currentPage = 1
function loadPage(page){
    currentPage = page
    $.ajax({
        url:'/api/account?page='+page,
        type: 'GET'
    })
    .then(data=>{
        // console.log(data);
        $('#content').html('')
        for(let i =0 ;i< data.data.length; i++){
            const element = data.data[i];
    
            var item = $(`
                <h1>${element.username} : ${element.lastname}</h1>
            `)
            
            $('#content').append(item)
        }
    })
    .catch(err=>{
        console.log('call API error')
    })
}
function nextPage(){
    loadPage(currentPage+1)
}
function previousPage(){
    loadPage(currentPage-1)
}
function login(_username,_password){
    $.ajax({
        url:'/api/login',
        type: 'POST',
        dataType: 'json',
        data: {username: _username,Password:_password}
    })
    .then(data=>{
        // alert(data)
        alert("Đăng nhập thành công");  //hiển thị popup thông báo   
        window.location.href = './home'; //điều hướng trang
        
    })
    .catch(err=>{
        console.log("Call api login false "+ err)
    })
}