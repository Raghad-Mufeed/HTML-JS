function filter_severity(element){
    window.localStorage.setItem('severity',element);
    window.location.reload();
}
function check_severity(number){
    let num=JSON.parse(window.localStorage.getItem('severity'));
    if(num===number){
        return "selected";
    }
    else{
        return "";
    }
}