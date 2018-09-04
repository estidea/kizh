<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (!empty($_POST['uname']) && (!empty($_POST['connect-method']) || !empty($_POST['message']))){
  	if (isset($_POST['uname'])) {
  		if (!empty($_POST['uname'])){
	      $uname = strip_tags($_POST['uname']) . "<br>";
	      $unameFieldset = "<b>Имя пославшего:</b>";
	     }
    }
    if (isset($_POST['connect-method'])) {
    	if (!empty($_POST['connect-method'])){
	      $connect_method = strip_tags($_POST['connect-method']) . "<br>";
	      $connect_methodFieldset = "<b>Метод связи:</b>";
	 	}
    }
    if (isset($_POST['message'])) {
    	if (!empty($_POST['message'])){
	      $message = strip_tags($_POST['message']) . "<br>";
	      $messageFieldset = "<b>О проекте:</b>";
	    }
    }
    if (isset($_POST['formInfo'])) {
	    if (!empty($_POST['formInfo'])){
	      $formInfo = strip_tags($_POST['formInfo']);
	      $formInfoFieldset = "<b>Тема:</b>";
	    }
    }

    $to = "nick.whatsoever@gmail.com"; /*Укажите адрес, на который должно приходить письмо*/
    $sendfrom = "vlastelin@kizh.tk"; /*Укажите адрес, с которого будет приходить письмо */
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $headers .= "Content-Transfer-Encoding: 8bit \r\n";
    $subject = "$formInfo";
    $message = "$unameFieldset $uname
                $connect_methodFieldset $connect_method
                $messageFieldset $message
                $formInfoFieldset $formInfo";

    $send = mail ($to, $subject, $message, $headers);
        if ($send == 'true') {
            echo '<p class="success">Спасибо за отправку вашего сообщения!</p>';
        } else {
          echo '<p class="fail"><b>Ошибка. Сообщение не отправлено!</b></p>';
        }
  } else {
  	echo '<p class="fail">Ошибка. Вы заполнили не все обязательные поля!</p>';
  }
} else {
  header ("Location: http://kizh.tk"); // главная страница вашего лендинга
}
