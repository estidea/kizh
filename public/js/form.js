$(document).ready(function () {
  autosize($('textarea'));

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
        $(".loader-1").css('display','block');
        $.ajax({
            type: "POST",
            url: '/mail',
            data: formNm.serialize(),
            success: function (data) {
              $(".loader-1").css('display','none');
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

                $('textarea').val(' ');
                $('input').not(':input[type=submit], :input[type=hidden]').val(' ');
                $(".form-input").parent().removeClass("is-completed");
                $(".form-input").parent().removeClass("is-active");
                $(".form-textarea").parent().removeClass("is-completed");
                $(".form-textarea").parent().removeClass("is-active");
              }, 3000);
            },
            error: function (jqXHR, text, error) {
                $(".loader-1").css('display','none');
                // Вывод сообщения об ошибке отправки
                message.css('display','flex');
                message.html('К сожалению, на сервере возникла проблема =( С нас 10% скидка');
                setTimeout(function(){
                  //$(formNm).css("display","block");
                    $('.msgs').html('');
                    $('.msgs').css('display','none');
                    setTimeout(function(){
                      $('.msgs').html('');
                  },1000);
                  // $('.formTitle').css("display","block");
                  // $('input').not(':input[type=submit], :input[type=hidden]').val(' ');
                }, 5000);
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