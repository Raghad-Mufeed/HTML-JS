function filter_status(element){
    window.localStorage.setItem('status',element);
    window.location.reload();
}
function check_status(status){
    let stat=window.localStorage.getItem('status');
    if(stat===status){
        return "selected";
    }
    else{
        return "";
    }
}