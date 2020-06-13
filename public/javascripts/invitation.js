const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const list = document.querySelector('#list')
const all = document.querySelector('#all')
const custom = document.querySelector('#custom')
const submit = document.querySelector('#submit')
var users
var list_elements

var list_item
var list_item_des
var list_item_img 
var list_item_name 
var list_item_userid 
var img 

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

var CUSTOM_PARTICIPANTS = false
var participants = []

custom.addEventListener('click', async ()=>{
    CUSTOM_PARTICIPANTS = true
    
    while(list.firstChild){
        list.removeChild(list.firstChild)
    }

    await getData()

    var head = document.createElement('h1')
    head.textContent = 'Choose participants'
    head.style.textAlign = 'center'
    list.appendChild(head)

    await users.forEach(element => {
        list_item = document.createElement('div')
        list_item_des = document.createElement('div')
        list_item_img = document.createElement('div')
        list_item_name = document.createElement('div')
        list_item_userid = document.createElement('div')
        img = document.createElement('img')

        list_item.style.width = '70%'
        list_item_des.style.width = '70%'
        list_item.style.margin = '10px auto'
        list_item.style.border = '1px solid #c0c0c0'
        list.style.border = '1px solid #c0c0c0'
        list_item.style.borderRadius = '2px'

        list_item_name.style.fontWeight = '800'
        list_item_name.style.fontSize = '30px'
        list_item_name.style.margin = '5px'
        list_item_userid.style.fontWeight = '400'
        list_item_userid.style.fontSize = '15px'
        list_item_userid.style.margin = '5px'
        img.src = '/images/placeholder.png'
        img.style.margin = '10px'
        img.height = 80
        img.width = img.height
        list_item_img.style.display = 'inline-block'
        list_item_des.style.display = 'inline-block'
        list_item_des.style.margin = 0
        list_item_des.style.verticalAlign = 'middle'
        list_item_img.style.verticalAlign = 'middle'

        list_item_name.textContent = element['name']
        list_item_userid.textContent = element['userid']
        list_item_des.appendChild(list_item_name)
        list_item_des.appendChild(list_item_userid)
        list_item_img.appendChild(img)
        list_item.appendChild(list_item_img)
        list_item.appendChild(list_item_des)
        list.appendChild(list_item)

    });

    addEvents()
})

function addEvents(){
    list_elements = document.querySelectorAll('#list>div')
    list_elements.forEach(e=>{
        e.addEventListener('click', ()=>{
            if (participants.indexOf(e.lastChild.lastChild.textContent) == -1){
                participants.push(e.lastChild.lastChild.textContent)
                e.style.backgroundColor = "#aaddcc88"

                // console.log(e)
            }
            else {
                participants.splice(participants.indexOf(e.lastChild.lastChild.textContent), 1)
                e.style.backgroundColor = "#ffffff"
                console.log(e)
            }
            
        })
    })
}


all.addEventListener('click', () => {
    CUSTOM_PARTICIPANTS = false

    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
})

async function getData(){
    //get data from the server, the names of all the users
    const response = await fetch('/users/getUsers')
    const data = await response.json()
    console.log(data)
    users = data
    
}

async function sendData() {
    //send data to the server, the names of selected participants
    let data = {
        'date': eventDate,
        'time': eventTime,
        'invitation': invitation,
        'host': eventHost,
        'description': eventDescription,
        'name': eventName,
        'participants': participants
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    var response = await fetch('/dashboard/invitation/send', options)
    window.open(response.url, "_self")
    
    submit.removeEventListener('mousedown', sendData)
}

submit.addEventListener('mousedown', sendData)

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