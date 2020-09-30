const params = new URLSearchParams(window.location.search);
const gclid = params.get("gclid");
const fbclid = params.get("fbclid");
const s = params.get("s");


// tid = tracking ID - gclid, fbglid, bclid, etc...
// ts= tracking source - adwords, facebook, etc...
// s = sub tracking ID - campaign 1, campaign 2

if (gclid) {
  localStorage.setItem("tid", gclid);
  localStorage.setItem("ts", "adwords");
}

if (fbclid) {
  localStorage.setItem("tid", fbclid);
  localStorage.setItem("ts", "facebook");
}

if (s) {
  localStorage.setItem("s", s);
}
