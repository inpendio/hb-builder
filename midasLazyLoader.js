

function mf_midas_load() {
    var gads = document.createElement("script");
    gads.async = true;
    gads.type = "text/javascript";
    var useSSL = "https:" == document.location.protocol;
    gads.src = (useSSL ? "https:" : "http:") +
      "//cdn.midas-network.com/Widget/IndexAsync/"+mf_midas_cat+"?portalWidgetId=230&portalWidgetId=1201";
    var node = document.getElementsByTagName("script")[0];
    node.parentNode.insertBefore(gads, node);
  };

function mfLazyLoadMidas(){

    
    
    function mf_onVisibilityChange(el, callback) {
        var old_visible;
        return function () {
            var visible = mf_isElementInViewport(el);
            if (visible ) {
                if(visible !== old_visible){
                    old_visible = visible;
                if (typeof callback == 'function') {
                    callback(visible);
                }
                }
                
            }
        }
    }
    function addListeners(handler){
        if (window.addEventListener) {
            addEventListener('DOMContentLoaded', handler, false);
            addEventListener('load', handler, false);
            addEventListener('scroll', handler, false);
            addEventListener('resize', handler, false);
        } else if (window.attachEvent)  {
            attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
            attachEvent('onload', handler);
            attachEvent('onscroll', handler);
            attachEvent('onresize', handler);
        }
    }
    function removeListeners(handler){
        if (window.addEventListener) {
            addEventListener('DOMContentLoaded', handler, false);
            addEventListener('load', handler, false);
            addEventListener('scroll', handler, false);
            addEventListener('resize', handler, false);
        } else if (window.attachEvent)  {
            detachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
            detachEvent('onload', handler);
            detachEvent('onscroll', handler);
            detachEvent('onresize', handler);
        }
    }
    var handler = mf_onVisibilityChange(document.getElementById('mf_bottom_ad_wrapper'), function() {
        console.log('------------VISIBLE__________________');
        mf_midas_load();
        removeListeners(handler);
    });
    addListeners(handler);
}


setTimeout(mfLazyLoadMidas, 500);
