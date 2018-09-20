$(document).ready(function () {
  autosize($('textarea'));
  // var aniLogo = $("#contact-minilogo");
  // aniLogo.css("transition", "all 19.9s linear");
  // aniLogo.css("transform", "translateX(200%)");
  // var x = '200%';
  // setInterval(function() {
  //   if (x == '200%') {
  //     x = '-100%';
  //     aniLogo.css("transition", "all 0s linear");
  //     aniLogo.css("transform", "translateX("+ x +")");
  //     setTimeout(()=>{
  //       x = '200%';
  //       aniLogo.css("transition", "all 19.9s linear");
  //       aniLogo.css("transform", "translateX("+ x +")");
  //     },100)
  //   }
  // },20000);


  /* Elastic textarea */
  // var idNum = 0, data = 'elastic'; 
  // $('body').on('keyup', 'textarea[data^="'+data+'"]', function(){ 
  //   if($(this).attr('data')==''+data+''){$(this).attr({style:'overflow:hidden;'+$(this).attr('style')+'',data:''+$(this).attr('data')+''+idNum+''});idNum++;} 
  //   tData = $(this).attr('data'); 
  //   if($('div[data="'+tData.replace(''+data+'','clone')+'"]').size()==0){ 
  //   attr = 'style="display:none;padding:'+$(this).css('padding')+';width:'+$(this).css('width')+';min-height:'+$(this).css('height')+';font-size:'+$(this).css('font-size')+';line-height:'+$(this).css('line-height')+';font-family:'+$(this).css('font-family')+';white-space:'+$(this).css('white-space')+';word-wrap:'+$(this).css('word-wrap')+';letter-spacing:0.2px;" data="'+tData.replace(''+data+'','clone')+'"'; 
  //   clone = '<div '+attr+'>'+$(this).val()+'</div>'; 
  //   $('body').prepend(clone); 
  //   idNum++; 
  //   }else{ 
  //   $('div[data="'+tData.replace(''+data+'','clone')+'"]').html($(this).val()); 
  //   $(this).css('height',''+$('div[data="'+tData.replace(''+data+'','clone')+'"]').css('height')+''); 
  //   } 
  // });

  /* Material Input */
  $(".form-input, .form-textarea").focus(function(){
    $(this).parent().addClass("is-active is-completed");
  });

  $(".form-input, .form-textarea").focusout(function(){
    if($(this).val() === "")
      $(this).parent().removeClass("is-completed");
    $(this).parent().removeClass("is-active");
  })

  /* Form js */
    $("form").submit(function () {
        // Получение ID формы
        var formID = $(this).attr('id');
        // Добавление решётки к имени ID
        var formNm = $('#' + formID);
        var message = $(formNm).find(".msgs"); // Ищес класс .msgs в текущей форме  и записываем в переменную
        // var formTitle = $(formNm).find(".formTitle"); // Ищес класс .formtitle в текущей форме и записываем в переменную
        $.ajax({
            type: "POST",
            url: '/mail',
            data: formNm.serialize(),
            success: function (data) {
              // Вывод сообщения об успешной отправке
              message.css('display','flex');
              message.html('Письмо успешно отправлено!');
              // formTitle.css("display","none");
              setTimeout(function(){
                //$(formNm).css("display","block");
                $('.formTitle').css("display","block");
                $('.success').css("visibility","hidden");
                $('.success').css("opacity","0");
                
                setTimeout(function(){
                  $('.msgs').html('');
                  $('.msgs').css('display','none');
                },1000);

                $('textarea').val('');
                $('input').not(':input[type=submit], :input[type=hidden]').val('');
                $(".form-input").parent().removeClass("is-completed");
                $(".form-input").parent().removeClass("is-active");
                $(".form-textarea").parent().removeClass("is-completed");
                $(".form-textarea").parent().removeClass("is-active");
              }, 3000);
            },
            error: function (jqXHR, text, error) {
                // Вывод сообщения об ошибке отправки
                message.html(error);
                // formTitle.css("display","none");
                // $(formNm).css("display","none");
                setTimeout(function(){
                  //$(formNm).css("display","block");
                  $('.fail').css("visibility","hidden");
                  $('.fail').css("opacity","0");
                  setTimeout(function(){
                    $('.msgs').html('');
                  },1000);
                  // $('.formTitle').css("display","block");
                  $('input').not(':input[type=submit], :input[type=hidden]').val('');
                }, 3000);
            }
        });
        return false;
    });
    //для стилей формы
      var $input = $('.form-fieldset > input');
      $input.blur(function (e) {
        $(this).toggleClass('filled', !!$(this).val());
      });
});