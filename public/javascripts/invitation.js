const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = 5 * window.innerHeight / 6;
canvas.width = window.innerWidth / 2;
canvas.style.backgroundColor = '#123456';


window.addEventListener('resize', ()=>{
    canvas.height = 5*window.innerHeight/6
    canvas.width = window.innerWidth/2
    canvas.style.backgroundColor = '#123456'
})

const urlParams = new URLSearchParams(window.location.search)
var eventName = urlParams.get ('eventName');
var eventDescription = urlParams.get ('eventDescription');
var eventDate = urlParams.get ('eventDate');
var eventTime = urlParams.get ('eventTime');
var invitation = urlParams.get ('invitationBody');
var eventHost = urlParams.get ('eventHost')


function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
        }
        else {
        line = testLine;
        }
    }
    context.fillText(line, x, y);
}
      

function write(ct) {
    ct.font = '70px Montserrat, sans-serif';
    ct.fillStyle = '#fff'
    ct.beginPath()
    ct.fillText(eventName, 20, 80)
    ct.closePath()

    ct.font = '18px Montserrat, sans-serif';
    ct.beginPath ();
    wrapText(ctx, eventDescription, 20, 135, canvas.width-40, 28)
    // ct.fillText (eventDescription, 10, 150);
    ct.closePath ();

    ct.beginPath ();
    ct.fillText ('Date : '+eventDate, 20, 210);
    ct.closePath ();

    ct.beginPath ();
    ct.fillText ('Time : ' + eventTime, 20, 250);
    ct.closePath ();

    ct.beginPath ();
    ct.fillText ('Hosted by : ' + eventHost, 20, 290);
    ct.closePath ();


    ct.beginPath ();
    wrapText (ctx, invitation, 20, 350, canvas.width - 40, 28);
    // ct.fillText (invitation, 10, 300);
    ct.closePath ();


}

write(ctx)