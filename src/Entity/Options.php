<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OptionsRepository")
 */
class Options
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $keyname;

    /**
     * @ORM\Column(type="text")
     */
    private $value;

    public function getId() //: ?int
    {
        return $this->id;
    }

    public function getKeyname() //: ?string
    {
        return $this->keyname;
    }

    public function setKeyname(string $keyname) //: self
    {
        $this->keyname = $keyname;

        return $this;
    }

    public function getValue() //: ?string
    {
        return $this->value;
    }

    public function setValue(string $value) //: self
    {
        $this->value = $value;

        return $this;
    }
}
