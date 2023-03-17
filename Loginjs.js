$(document).ready(function() { // bắt đầu vào trang thì làm gì đó
    alert("Mời đăng nhập ");
    
    $("#btnLogin").click(function() { // $
        
          axios.get('https://jsonplaceholder.typicode.com/todos/1') // call API method GET
            .then(function (response) {
                console.log(response.data); 
                
                if(response.data.id == 1){
                    window.location.href = './Home.html'; //điều hướng trang
                    alert("Đăng nhập thành công");  //hiển thị popup thông báo               
                }
                else {
                    alert("Đăng nhập thất bại");  //hiển thị popup thông báo
                };
            })
            .catch(function (error) {
                console.log(error);
            });  
    });
        
    

});

