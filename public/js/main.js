$('#paging').pagination({
    dataSource: './api/account?page=1',
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
        url:'./api/account?page='+page,
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
        console.log('call API error '+ err)
    })
}
loadPage(1)

