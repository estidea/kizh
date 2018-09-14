<?php
// src/Admin/PortfolioAdmin.php
namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use FOS\CKEditorBundle\Form\Type\CKEditorType;

class ProjectsAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('title', TextType::class);
        $formMapper->add('description', TextType::class);
        $formMapper->add('maincolor', TextType::class);
        $formMapper->add('name', TextType::class);
        $formMapper->add('image_url', TextType::class);
        $formMapper->add('text', CKEditorType::class);
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('title');
        $datagridMapper->add('description');
        $datagridMapper->add('maincolor');
        $datagridMapper->add('name');
        $datagridMapper->add('image_url');
        $datagridMapper->add('text');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('title');
        $listMapper->addIdentifier('description');
        $listMapper->addIdentifier('maincolor');
        $listMapper->addIdentifier('name');
        $listMapper->addIdentifier('image_url');
        $listMapper->addIdentifier('text');
    }
}