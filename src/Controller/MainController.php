<?php

namespace App\Controller;

use App\Entity\Options;
use App\Entity\Projects;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class MainController extends Controller
{
    /**
     * @Route("/", name="main")
     */
    public function main()
    {
    	$options = $this->getDoctrine()->getRepository(Options::class);

		$site_name = $options
			->findOneBy(['keyname' => 'site_name'])
			->getValue();
		$site_description = $options->findOneBy(['keyname' => 'site_description'])
			->getValue();

        return $this->render('main/index.html.twig', [
            'site_name' => $site_name,
            'site_description' => $site_description
        ]);
    }

    /**
     * @Route("/index", name="index")
     */
    public function index()
    {
        // redirects to the "main" route
    	return $this->redirectToRoute('main');
    }


    /**
     * @Route("/portfolio", name="portfolio")
     */
    public function portfolio()
    {
        $projects = $this->getDoctrine()->getRepository(Projects::class)->findAll();

        return $this->render('main/portfolio.html.twig', [
            'projects' => $projects,
        ]);
    }

    /**
     * @Route("/getportfolio", name="getportfolio")
     */
    public function getportfolio(Request $request)
    {
        if($request->request->get('project_id')){
            $id = $request->request->get('project_id');
            $project = $this->getDoctrine()->getRepository(Projects::class)->find($id);
            $arrData = ['title' => $project->getTitle(),
                        'description' => $project->getDescription(),
                        'name' => $project->getName(),
                        'image' => $project->getImageUrl(),
                        'text' => $project->getText(),
                        ];
            return new JsonResponse($arrData);
        }
        
        // redirects to the "main" route
        return $this->redirectToRoute('main');
    }


    /**
     * @Route("/contacts", name="contacts")
     */
    public function contacts()
    {
        return $this->render('main/contacts.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    /**
     * @Route("/mail", name="mail")
     */
    public function mail(Request $request, \Swift_Mailer $mailer)
    {   
        if($request->request->get('uname')){
            echo 'first';
            $uname = $request->request->get('uname');
            $connect_method = $request->request->get('connect-method');
            $form_message = $request->request->get('message');
            $form_info = $request->request->get('formInfo');
            echo 'second'.$connect_method;
            $message = (new \Swift_Message('New client'))
                ->setSubject($form_info)
                ->setFrom('vlastelin@kizh.studio')
                ->setTo('nick.whatsoever@gmail.com')
                ->setBody('Name = '.$uname.', message = '.$form_message.', email = '.$connect_method);

            $mailer->send($message);
            return $this->redirectToRoute('contacts');
        }
        else return $this->redirectToRoute('contacts');
    }

          

    //         $to = "nick.whatsoever@gmail.com"; Укажите адрес, на который должно приходить письмо
    //         $sendfrom = "vlastelin@kizh.tk"; /*Укажите адрес, с которого будет приходить письмо */
    //         $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    //         $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    //         $headers .= "MIME-Version: 1.0\r\n";
    //         $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    //         $headers .= "Content-Transfer-Encoding: 8bit \r\n";
    //         $subject = "$formInfo";
    //         $message = "$unameFieldset $uname
    //                     $connect_methodFieldset $connect_method
    //                     $messageFieldset $message
    //                     $formInfoFieldset $formInfo";

    //         $send = mail ($to, $subject, $message, $headers);
    //             if ($send == 'true') {
    //                 echo '<p class="success">Спасибо за отправку вашего сообщения!</p>';
    //             } else {
    //               echo '<p class="fail"><b>Ошибка. Сообщение не отправлено!</b></p>';
    //             }
    //       } else {
    //         echo '<p class="fail">Ошибка. Вы заполнили не все обязательные поля!</p>';
    //       }
    //     } else {
    //       header ("Location: http://kizh.tk"); // главная страница вашего лендинга
    //     }
    // }
}
