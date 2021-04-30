$(()=>{
    const ddown_button = $('.view_recipe')
    ddown_button.on('click', (e)=>{
        $(e.target.parentElement.nextElementSibling).toggle(200)
    })
})