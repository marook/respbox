var respbox = function(window, document){
    var layerElement, imageElement, imagePadding, originalImageSize;

    imagePadding = 10;

    function onCloseLayerClick(){
        originalImageSize = undefined;
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

    function updateLayout(){
        if(!originalImageSize){
            /* should only be set if an image is visible */
            return;
        }

        var aspectRation = originalImageSize.height / originalImageSize.width;

        var scale = Math.min(1, Math.min((window.innerWidth - 2 * imagePadding) / originalImageSize.width, (window.innerHeight - 2 * imagePadding) / originalImageSize.height));

        imageElement.setAttribute('style', 'width:' + originalImageSize.width * scale + 'px');
    }

    function onOpenLayerClick(){
        prepareLayer();

        imageElement.setAttribute('src', this.getAttribute('href'));

        originalImageSize = {width: this.getAttribute('targetWidth'), height: this.getAttribute('targetHeight')};

        updateLayout();

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

        applyBySelector: applyBySelector,

        updateLayout: updateLayout

    };
}(window, document);
