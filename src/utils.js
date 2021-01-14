export const getBodyWidth=()=>document.getElementsByTagName('body')[0].clientWidth;

export const isMobile =()=>  getBodyWidth()< 576;

export function getSizeForScreenFromSizes(sizes){
    const _w = getBodyWidth();
    for(let i=0;i<sizes.length;i++){
        // console.log({_w, s:sizes[i], is:_w > sizes[i].width});
        if(_w > sizes[i].width)return sizes[i]
    }
    return sizes[sizes.length-1];
}

export function getAllSizesFromMap(sizes){
    // console.groupCollapsed('@getAllSizesFromMap')
    const out =  sizes.reduce((acc,v)=>{
        const _v = Array.isArray(v.sizes[0]) ? v.sizes : [v.sizes];
        // console.log('value:',_v);
        _v.forEach(size=>{
           if(size.length > 0 && acc.findIndex(s=>s[0]===size[0] && s[1]===size[1]) ===-1){
            //    console.log('doesnt exist', size);
               acc.push(size);
           } 
        })
        return acc;
    },[]);
    // console.log(out);
    // console.groupEnd();
    return out;
}

export function bidOnDevice(bidder){
    let out = true;
    if(bidder.mobileOnly){
        if(!isMobile())out = false;
    }
    if(bidder.desktopOnly){
        if(isMobile())out = false;
    }
    return out;
}

export function addStyle(id,obj){
    const element = document.getElementById(id);
    // console.groupCollapsed('@addStyle', id);
    if(element){
        Object.keys(obj).forEach(key=>{
            // console.log('adding', key, obj[key],{id,obj,element});
            element.style[key] = obj[key];
        })
    }
    // console.groupEnd();
}

export function addClass(id, className){
    const element = document.getElementById(id);
    if(element)element.classList.add(className);
}

export function addDefaultClasses(adSlots){
    adSlots.forEach(slot=>{
        addClass(slot.div, slot.class);
    })
}

export function loadScript(scriptSrc) {
    var script = document.createElement('script');
    script.async=true;
    script.type = 'text/javascript';
    script.src = scriptSrc;
    var node = document.getElementsByTagName('head')[0];
    node.appendChild(script);
  }
