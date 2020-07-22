const params = new URLSearchParams(window.location.search);
let gclid = params.get("gclid");
let fbclid = params.get("fbclid");
let s = params.get("s");

localStorage.setItem('tid', gclid || fbclid);
localStorage.setItem('s', s);