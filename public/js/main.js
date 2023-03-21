$('#paging').pagination({
    dataSource: '/api/account?page=1',
    locator: 'data',
    totalNumberLocator: function(response) {
        // you can return totalNumber by analyzing response content
        return response.total;
    },
    pageSize: 2,
    afterPageOnClick: function(event, pageNumber){
        loadPage(pageNumber);
    },
    afterPreviousOnClick: function(event,page){
        loadPage(page)
    },
    afterNextOnClick : function(event,page){
        loadPage(page)
    }
})
var currentPage = 1
function loadPage(page){
    currentPage = page
    $.ajax({
        url:'/api/account?page='+page,
        type: 'GET'
    })
    .then(rs=>{
        // console.log(data);
        $('#content').html('')
        for(let i =0 ;i< rs.data.length; i++){
            const element = rs.data[i];
    
            var item = $(`<h3>${element.username} : ${element.lastname}</h3>`)
            
            $('#content').append(item)
        }
    })
    .catch(err=>{
        console.log('call API error')
    })
}
// function nextPage(){
//     loadPage(currentPage+1)
// }
// function previousPage(){
//     loadPage(currentPage-1)
// }
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
        window.location.href = './'; //điều hướng trang
        
    })
    .catch(err=>{
        console.log("Call api login false "+ err)
    })
}
loadPage(1)

