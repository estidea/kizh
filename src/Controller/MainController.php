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
}
