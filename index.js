// import prebid from 'prebid.js';
// import 'prebid.js/modules/districtmDMXBidAdapter';
import './styles.scss';
import {adSlots} from './src/config';
import {addDefaultClasses} from './src/utils';
import {initGPT} from './src/google';
import initPrebid from './src/pbjs';

initGPT();

function init(){
    addDefaultClasses(adSlots);
    initPrebid();

    // setTimeout(function(){
    //     console.log(prebid.getBidResponses());
    //     googletag.openConsole();
    // },2000);
}



document.addEventListener("DOMContentLoaded", init);
