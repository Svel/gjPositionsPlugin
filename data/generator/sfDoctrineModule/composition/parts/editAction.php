  public function executeEdit(sfWebRequest $request)
  {
    $this-><?php echo $this->getSingularName() ?> = $this->getRoute()->getObject();
    $this->form = $this->configuration->getForm($this-><?php echo $this->getSingularName() ?>);

    if($this->getUser()->hasFlash('preview_form_values'))
    {
      $this->form->bind($this->getUser()->getFlash('preview_form_values'));
      $this-><?php echo $this->getSingularName() ?> = $this->form->updateObject();
    }
  }
