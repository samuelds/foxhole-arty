let mapData = {};

/*
*  Popup manager
*/
function forceClosePopups(e)
{
    $("#target-popup").hide();
    $("#action-popup").hide();
    mapData = {};
}

map.on('click', function(e)
{
    const element = $(e.originalEvent.target).attr('class');
    if (element !== 'leaflet-interactive' || map.getZoom() !== 5)
    {
        return false;
    }
    $('#target-popup').hide();

    const toolbox = $('#action-popup');
    toolbox.css({left: e.containerPoint.x});
    toolbox.css({top: e.containerPoint.y});
    toolbox.show();
    mapData = {
        latlng: e.latlng,
        layerPoint: e.layerPoint
    };

});

// Foce close pop on zoom or move
map.on('zoom', forceClosePopups);
map.on('move', forceClosePopups);

// Action click
$('#actions .btn').click(function(e)
{
    const action = $(this).attr('action');
    if(action == 'cible')
    {
        removeClible(artyColor);
        addCible(artyColor, mapData.latlng, mapData.layerPoint);
    }
    else
    {
        const name = $(this).attr('name');

        // Remove after
        removeArty(artyColor);
        addArty(artyColor, name, artyColor, mapData.latlng, mapData.layerPoint);
    }

    forceClosePopups();

});

$('#colors .color').click(function(e)
{
    $('#colors .color').removeClass('current');

    const element = $(this);
    element.addClass('current');

    const color = element.attr('color');
    artyColor = color;
});
