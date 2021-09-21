function reset_filter(){
    window.localStorage.setItem('severity',-1);
    window.localStorage.setItem('status',"none");
    window.location.reload();
}