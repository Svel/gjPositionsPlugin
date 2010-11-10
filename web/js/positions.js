gjCompositionCanvas = function(form)
{
  this.form = form;

  /**
   * updates all positions of embedded design and content elements
   */
  this.updatePositions = function(event)
  {
    form = $(event.currentTarget);
    form.find('.content > ol > li').each(function(i, designelement)
    {
      $(designelement).find('input, select, textarea').each(function(j, field)
      {
        field.name = field.name
          .replace(/\[design_elements\]\[(?:\d|x)\]/, '[design_elements]['+i+']')
          .replace(/\[contents\]\[(?:\d|x)\]/, '[contents]['+j+']');
        field.id = field.id
          .replace(/design_elements_(?:\d|x)_/, 'design_elements_'+i+'_')
          .replace(/contents_(?:\d|x)_/, 'contents_'+j+'_');
      });
    });
  };

  this.form.find('.content > .positions_container')
    .sortable(
    {
      items:'li:not(.placeholder,.content_element_item)',
      axis:'y',
      sort:function(){$(this).removeClass('ui-state-default');},
      update:function(){$(this).find('input[name$=\[position\]]').not('input[name*=\[contents\]]').each(function(i,element){$(element).val(i);});}
    });

  // bind events
  this.form.submit(this.updatePositions);
}


gjDesignElements = {
  initDesignElements:function()
  {
    jQuery('.design-elements-head a').click(gjDesignElements.toggleDesignElement);
  },
  toggleDesignElement:function()
  {
    src = jQuery(this).children('img').attr('src');
    src = src.match(/more/) ? src.replace(/more/, 'less') : src.replace(/less/, 'more');
    jQuery(this).children('img').attr('src', src);
    jQuery(this).parent().next('.design-element-include').slideToggle();
  },
  init:function()
  {
    gjDesignElements.initDesignElements();
  }
}

gjContentElements = {
  init:function()
  {
    $('#design_element_items .positions_container')
      .sortable(
      {
        items:'li:.content_element_item',
        axis:'y',
        sort:function(){$(this).removeClass('ui-state-default');},
        update:function(){$(this).find('input[name$=\[position\]][name*=\[contents\]]').each(function(i,element){$(element).val(i);});}
      });
  }
}

jQuery(document).ready(function(){new gjCompositionCanvas($('.sf_admin_form > form'))});
//jQuery(document).ready(gjDesignElements.init);
//jQuery(document).ready(gjContentElements.init);
