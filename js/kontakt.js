function myFunction() {
    var left = (screen.width - 1000) / 2;
    var top = (screen.height - 800) / 4;
    var myWindow = window.open("", "anketa", "resizable=yes,, width=" + 1000 + ", height=" + 800 + ", top=" + top + ", left=" + left);
    myWindow.document.write("<div style='text-align:center;'><h1>Ви благодарам што ја пополнивте анкетата!</h1>"+
    "<p><img src='https://cdn.dribbble.com/users/754661/screenshots/2332743/media/273de3deaaf5dd8e19cf43c18e345dda.gif'></p></div>");
  }

  function createPopupWin(pageURL, pageTitle,
    popupWinWidth, popupWinHeight) {
var left = (screen.width - popupWinWidth) / 2;
var top = (screen.height - popupWinHeight) / 4;

var myWindow = window.open(pageURL, pageTitle, 
    'resizable=yes, width=' + popupWinWidth
    + ', height=' + popupWinHeight + ', top='
    + top + ', left=' + left);
}