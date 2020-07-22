const params = new URLSearchParams(window.location.search);
let gclid = params.get("gclid");
let fbclid = params.get("fbclid");
let s = params.get("s");

if(gclid){
    localStorage.setItem('tid', gclid);
}

if(fbclid){
    localStorage.setItem('tid', gclid);
}

if(fbclid){
    localStorage.setItem('s', s);
}
