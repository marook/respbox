var respbox = function(){

    function onOpenLayerClick(){
        alert('x');

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
}();
