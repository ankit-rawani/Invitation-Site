const del = document.querySelectorAll('.delete')
const view = document.querySelectorAll('.view')

del.forEach(btn => {
    btn.addEventListener('click', async e => {
        var d = confirm('Are you sure you want to delete this event?')

        if(d){
            let id = (e.target.parentElement.parentElement.parentElement.lastChild.getAttribute('data-id'))
            let name = (e.target.parentElement.parentElement.parentElement.lastChild.getAttribute('data-name'))

            var data = {
                event_id: id,
                event_name: name
            }
            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            await fetch('/dashboard/event/delete', options)

            location.reload()
        }
    })
})