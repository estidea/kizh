$(document).ready(function () {
    $("form").submit(function () {
        // Получение ID формы
        var formID = $(this).attr('id');
        // Добавление решётки к имени ID
        var formNm = $('#' + formID);
        var message = $(formNm).find(".msgs"); // Ищес класс .msgs в текущей форме  и записываем в переменную
        var formTitle = $(formNm).find(".formTitle"); // Ищес класс .formtitle в текущей форме и записываем в переменную
        $.ajax({
            type: "POST",
            url: 'modalform/mail.php',
            data: formNm.serialize(),
            success: function (data) {
              // Вывод сообщения об успешной отправке
              message.html(data);
              formTitle.css("display","none");
              setTimeout(function(){
                //$(formNm).css("display","block");
                $('.formTitle').css("display","block");
                $('.success').css("visibility","hidden");
                $('.success').css("opacity","0");
                
                setTimeout(function(){
                  $('.msgs').html('');
                },1000);

                $('textarea').val('');
                $('input').not(':input[type=submit], :input[type=hidden]').val('');
              }, 3000);
            },
            error: function (jqXHR, text, error) {
                // Вывод сообщения об ошибке отправки
                message.html(error);
                formTitle.css("display","none");
                // $(formNm).css("display","none");
                setTimeout(function(){
                  //$(formNm).css("display","block");
                  $('.fail').css("visibility","hidden");
                  $('.fail').css("opacity","0");
                  setTimeout(function(){
                    $('.msgs').html('');
                  },1000);
                  $('.formTitle').css("display","block");
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
