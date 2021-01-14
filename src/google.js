import {getAllSizesFromMap,loadScript,addClass,addStyle,getSizeForScreenFromSizes} from './utils';
import {ADD_TARGETING,adSlots,sizeMap,TARGET_VAR, }from './config';


function disableInitLoad(){
    // console.log('gpt loaded');
    googletag.pubads().disableInitialLoad();
}



export function refreshGPT(){
    // console.log("refreshGPT");
    googletag.pubads().refresh();
}

function defineSlots(sizeMappings){
    // console.groupCollapsed('@defineSlots');
    adSlots.forEach(slot=>{
        // console.groupCollapsed(slot.name);
        const exist = document.getElementById(slot.div);
        if(exist){
            const _defSizes = slot.sizes ? getAllSizesFromMap(sizeMap[slot.sizes]) : slot.default;
            const unit = googletag.defineSlot(slot.name,_defSizes, slot.div);
            if(slot.sizes){
                // console.log('@if/slot.sizes',{slotName:slot.name,_defSizes,mappingsForSlot:sizeMappings[slot.sizes]})
                unit.defineSizeMapping(sizeMappings[slot.sizes].build());
            }
            if(ADD_TARGETING, window[TARGET_VAR]){
                unit.setTargeting(ADD_TARGETING,window[TARGET_VAR]);
            }
            unit.originalConfig=Object.assign({},slot, {sizes:sizeMap[slot.sizes]});
            // console.log('@unit',unit);
            unit.addService(googletag.pubads());
            // console.log('unit:',{
            //     unit,
            //     sizes:unit.getSizes(),
            //     html:unit.getHtml(),
            //     name:unit.getAdUnitPath(),
            //     elementId:unit.getSlotElementId()
            // });
            // console.groupEnd();
        }
    });
    // console.groupEnd();
}


function generateAdUnits(){
    // console.groupCollapsed('sizeMappings');
    const sizeMappings = Object.keys(sizeMap).reduce((acc,key)=>{
        // console.groupCollapsed(key);
        // console.log(key, acc);
        acc[key]=googletag.sizeMapping();
        
        sizeMap[key].forEach(size => {
            // console.log([size.width,size.height], size.sizes);
            acc[key].addSize([size.width,size.height], size.sizes);
        });
        // acc[key].build();
        // console.log(acc);
        // console.log(acc[key].values());
        // console.groupEnd();
        return acc;
    },{});

    // console.log(sizeMappings);
    // console.groupEnd();

    defineSlots(sizeMappings);

}

function finishGPT(){
    // console.log('@finishGPT',googletag)
    googletag.pubads().enableSingleRequest();
    // googletag.pubads().collapseEmptyDivs();
    googletag.enableServices();
}

function renderListener(event){
    // console.log('@renderListener',event.slot.getSlotElementId(),event);
    const id = event.slot.getSlotElementId();
    const adConf = adSlots.find((s)=>s.div === id);
   
        
    if(!event.size){
        

        const isCollapsable = adConf ? adConf.collapsable : true;
        if(isCollapsable){
            addStyle(id,{
                // width: '',
                height:'',
                padding:0,

            })
            addClass(id, "mfAdCollapsed");
        }
    }else{
        const shouldBe = getSizeForScreenFromSizes(event.slot.originalConfig.sizes);
        // console.log({shouldBe,origSizes:event.slot.originalConfig.sizes})
        let maxWidth = Array.isArray(shouldBe.sizes[0])?shouldBe.sizes.reduce((acc,v)=>{
            // console.log({acc,v})
            if(v[0]>acc)acc=v[0];
            return acc;
        },0):shouldBe.sizes[0];
        if(!maxWidth)maxWidth=320;
        addStyle(id,{
            width: event.size[0] + 'px',
            height:event.size[1] + 'px',
            'max-width':maxWidth + 'px',
            'min-width':''
        })
    }
}

function addRenderListener(){
    googletag.pubads().addEventListener('slotRenderEnded', renderListener);

    // googletag.pubads().addEventListener('slotRequested', function(event) {
    //     var slot = event.slot;
    //     console.log('Slot', slot.getSlotElementId(), 'has been requested.',event);
    //   });
}

export async function initGPT(){
    // after gpt is loaded
googletag.cmd.push(disableInitLoad);
googletag.cmd.push(generateAdUnits);
googletag.cmd.push(addRenderListener);
googletag.cmd.push(finishGPT);
    loadScript('https://securepubads.g.doubleclick.net/tag/js/gpt.js');
    window.googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];



}
