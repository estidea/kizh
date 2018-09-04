<?php

namespace App\Controller;

use App\Entity\Options;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

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
        return $this->render('main/portfolio.html.twig', [
            'controller_name' => 'MainController',
        ]);
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
