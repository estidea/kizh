$(document).on('click', '#load_project', function(event){
	event.preventDefault();
	var project_id = $(this).data('id');
    	that = $(this);
        $.ajax({
            url:'/getportfolio',
            type: "POST",
            dataType: "json",
            data: {
                "project_id": project_id
            },
            async: true,
            success: function (data)
            {
            	$("div#project-detail").scrollTop(0);
                $('div#project-detail').css('z-index', '3');
                $('div#project-detail').css('opacity', '1');
                $('h3#project-title').html(data.title);
                $('span#project-name').html(data.name);
                $('p#project-description').html(data.description);
                $('p#project-text').html(data.text);
                $('#project-image').attr("src", 'img/'+data.image);
            }
        });
    return false;

});

$(document).on('click', '#project-close', function(){
    $('div#project-detail').css('opacity', '0');
    setTimeout (function(){
    	$('div#project-detail').css('z-index', '-1');
    }, 200); 
    
});