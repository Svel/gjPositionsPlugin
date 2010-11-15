// tryout: melanie mitchel - complexity a guided tour

$.composition = {
  sortableOptions:{
    axis:'y', 
    placeholder:'ui-state-highlight',
    forcePlaceholderSize:true,
    over:function(event, ui){rm=false},
    out:function(event, ui){rm=true},
    beforeStop:function(event, ui){if(true==rm) ui.item.remove()}
  },
  update:function(field, context, id, pos)
  {
    id_key  = context == 'contents' ? 'x' : '(?:\d|x)';
    pos_key = context == 'contents' ? '\d' : '(?:\d|x)';

    field.name  = field.name.replace(new RegExp('/\['+context+'\]\['+id_key+'\]/'), '['+context+']['+id+']');
    field.id    = field.id.replace(new RegExp('/'+context+'_'+id_key+'_/'), context+'_'+id+'_');
    field.value = (-1 != field.name.search(new RegExp('/\['+context+'\]\['+pos_key+'\]\[position\]/'))) ? position : field.value;
  }
}

$.fn.canvas = function()
{
  return this.each(function(){
    this.designcontainers = function(){return $(this).find('.content > .positions_container')};
    $(this).submit(function(event){this.designcontainers().each(function(){this.update()});return false;});
    this.designcontainers().designcontainer();
  });
}

$.fn.designcontainer = function()
{
  return this.each(function(i){
    this.contentcontainers = function(){return $(this).find('.positions_container')};
    this.receive = function(event, ui){this.contentcontainers().contentcontainer()};
    this.update = function()
    {
      num = this.num;
      $(this).find('input, select, textarea').each(function(j, field)
      {
        field.name = field.name.replace(/\[design_elements\]\[(?:\d|x)\]/, '[design_elements]['+i+']');
        field.id = field.id.replace(/design_elements_(?:\d|x)_/, 'design_elements_'+i+'_');
        field.value = (-1 != field.name.search(/\[design_elements\]\[(?:\d|x)\]\[position\]/)) ? i : field.value;
        console.log(field.name+' - '+field.id);
      });
      num = this.contentcontainers().length;
      this.contentcontainers().each(function(){this.update(num)});
    }

    $(this).sortable($.extend({receive:this.receive}, $.composition.sortableOptions));
    this.contentcontainers().contentcontainer();
  });
}

$.fn.contentcontainer = function(designelements)
{
  return this.each(function(i){
    this.receive = function(event, ui){};
    this.update = function(total)
    {
      $(this).find('input, select, textarea').each(function(j, field, total)
      {
        field.name = field.name.replace(/\[contents\]\[x]/, '[contents]['+total+']');
        field.id = field.id.replace(/contents_x/, 'contents_'+total+'_');
        field.value = (-1 != field.name.search(/\[contents\]\[\d\]\[position\]/)) ? j : field.value;
      });
    total++;
    };

    $(this).sortable($.extend({receive:this.receive}, $.composition.sortableOptions));
  });
}

$.fn.designelement = function(canvas)
{
  return this.draggable({connectToSortable:$(canvas).find('.content > .positions_container'), helper: 'clone'});
}

$.fn.contentelement = function(designelements)
{
  return this.draggable({connectToSortable:$(designelements).find('.positions_container'), helper: 'clone'});
}

// -------------------

$(document).ready(function(){
  var canvas = $('.sf_admin_form > form').canvas();
  var designelements = $('#design_element_source_list > li').designelement(canvas);
  $('#content_element_source_list .contents > li').contentelement(designelements);
});

