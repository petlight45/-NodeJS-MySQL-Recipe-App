$(()=>{
    const delete_button = $('.delete_button')
    delete_button.on('click', (e)=>{
        if (confirm('Proceed with delete?')){
            $.ajax({
                type:'DELETE',
                url:'/delete_recipe/' + e.target.dataset.id,
                success:(x)=>{
                    window.location.reload()
                    
                }
            })
        }
    })
})