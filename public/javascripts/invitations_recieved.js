const accept = document.querySelectorAll('.accept')
const reject = document.querySelectorAll('.reject')
const view = document.querySelectorAll('.view')

const accepted = document.querySelector('#accepted')
const rejected = document.querySelector('#rejected')
const pending = document.querySelector('#pending')

const a_button = document.querySelector('#a_button')
const r_button = document.querySelector('#r_button')
const p_button = document.querySelector('#p_button')
const refresh = document.querySelector('#refresh')

accepted.style.display = 'none'
rejected.style.display = 'none'
pending.style.display = 'block'
p_button.style.backgroundColor = '#aab'

refresh.addEventListener('click', e => {
    location.reload()
})

a_button.addEventListener('click', e => {
    // location.reload()
    accepted.style.display = 'block'
    rejected.style.display = 'none'
    pending.style.display = 'none'

    a_button.style.backgroundColor = '#aab'
    r_button.style.backgroundColor = '#fff'
    p_button.style.backgroundColor = '#fff'

})

r_button.addEventListener('click', e => {
    // location.reload()
    accepted.style.display = 'none'
    rejected.style.display = 'block'
    pending.style.display = 'none'

    a_button.style.backgroundColor = '#fff'
    r_button.style.backgroundColor = '#aab'
    p_button.style.backgroundColor = '#fff'
})

p_button.addEventListener('click', e => {
    // location.reload()
    accepted.style.display = 'none'
    rejected.style.display = 'none'
    pending.style.display = 'block'

    a_button.style.backgroundColor = '#fff'
    r_button.style.backgroundColor = '#fff'
    p_button.style.backgroundColor = '#aab'
})

accept.forEach(btn => {
    btn.addEventListener('click', async e => {
        let id = (e.target.parentElement.parentElement.parentElement.lastChild.getAttribute('data-id'))
        let data = {
            'invite_id': id 
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        await fetch('/dashboard/invitation/accept', options)
        await e.target.parentElement.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement.parentElement)
    })
})

reject.forEach(btn => {
    btn.addEventListener('click', async e => {
        let id = (e.target.parentElement.parentElement.parentElement.lastChild.getAttribute('data-id'))
        let data = {
            'invite_id': id 
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        await fetch('/dashboard/invitation/reject', options)

        e.target.parentElement.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement.parentElement)
    })
})

view.forEach(btn => {
    btn.addEventListener('click', async e => {
        let id = (e.target.parentElement.parentElement.parentElement.lastChild.getAttribute('data-id'))
        let data = {
            'invite_id': id
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        // var r = await fetch('/dashboard/invitation/view', options)
        // window.open(r.url, "_self")
    })
})