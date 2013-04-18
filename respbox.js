var respbox = function(window, document){
    var layerElement, imageElement, imagePadding, originalImageSize, imageContainer;

    imagePadding = 10;

    function onCloseLayerClick(){
        originalImageSize = undefined;
        layerElement.parentElement.removeChild(layerElement);

        return false;
    }

    function prepareLayer(){
        var closeButton;

        if(!layerElement){
            layerElement = document.createElement('div');
            layerElement.setAttribute('class', 'rbLayer');
            layerElement.onclick = onCloseLayerClick;

            imageContainer = document.createElement('div');
            layerElement.appendChild(imageContainer);

            closeButton = document.createElement('a');
            closeButton.setAttribute('class', 'rbLayerClose');
            closeButton.onclick = onCloseLayerClick;
            layerElement.appendChild(closeButton);
        }

        if(imageElement){
            imageElement.parentElement.removeChild(imageElement);
        }

        imageElement = document.createElement('img');
        imageElement.setAttribute('class', 'rbImage');
        imageContainer.appendChild(imageElement);

        document.getElementsByTagName('body')[0].appendChild(layerElement);
    }

    function updateLayout(){
        if(!originalImageSize){
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
