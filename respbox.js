var respbox = function(document){
    var layerElement, imageElement;

    function onCloseLayerClick(){
        layerElement.setAttribute('style', 'display:none;');

        return false;
    }

    function prepareLayer(){
        if(layerElement){
            return;
        }

        layerElement = document.createElement('div');
        layerElement.setAttribute('class', 'rbLayer');
        layerElement.onclick = onCloseLayerClick;

        imageElement = document.createElement('img');
        imageElement.setAttribute('class', 'rbImage');
        layerElement.appendChild(imageElement);

        document.getElementsByTagName('body')[0].appendChild(layerElement);
    }

    function onOpenLayerClick(){
        prepareLayer();

        imageElement.setAttribute('src', 'leaf.jpg');
        imageElement.setAttribute('style', 'width:900px');

        layerElement.setAttribute('style', 'display:block;');

        return false;
    }

    function apply(e){
        e.onclick = onOpenLayerClick;
    }

    function applyBySelector(sel){
        var es, i, esLen;

        es = document.querySelectorAll(sel);
        esLen = es.length;

        for(i = 0; i < esLen; ++i){
            apply(es[i]);
        }
    }

    return {

        apply: apply,

        applyBySelector: applyBySelector

    };
}(document);
