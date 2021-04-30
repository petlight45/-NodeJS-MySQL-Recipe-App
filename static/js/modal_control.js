$(()=>{
    const add_but = $('#add_button')
    const edit_but = $('.edit_button')
    console.log(edit_but)
    edit_but.on('click', (e)=>{
        $.ajax({
            type:'GET',
            url:'/get_recipe/' + e.target.dataset.id,
            success:(data)=>{
                if (data){
                    $('#input-recipe-name').val(data.name)
                    $('#input-ingredients').val(data.ingredients)
                    $('#input-directions').val(data.directions)
                }
                
            }
        })
        $('#form').attr('action', '/edit_recipe/' + e.target.dataset.id)        
        $('#modal').modal('show')
        $('#modal #action').text('Edit')
    })
    add_but.on('click', (e)=>{
        $('#modal #action').text('Add')
        $('#input-recipe-name').val('')
                    $('#input-ingredients').val('')
                    $('#input-directions').val('')
                    
        $('#form').attr('action', '/add_recipe')  
    })
})