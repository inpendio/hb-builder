import prebid from 'prebid.js';
import 'prebid.js/modules/districtmDMXBidAdapter';
import {mfBuckets, PREBID_TIMEOUT,MAX_REQUESTS,ADD_TARGETING,TARGET_VAR,ALIASES,sizeMap,adSlots} from './config';
import {getAllSizesFromMap,bidOnDevice} from './utils';
import {refreshGPT} from './google';


function prebidAddUnits(){

    const pbjsAdUnits=[];
        adSlots.filter(unit=>!!unit.bidders && unit.bidders.length>0).forEach(unit=>{
                const sizes = unit.sizes ? getAllSizesFromMap(sizeMap[unit.sizes]) : unit.default;
                const parsedUnit = ({
                    code:unit.div,
                    sizes,
                    mediaTypes:{
                        banner:{
                            sizes,
                        }
                    },
                    bids:unit.bidders.filter(bidder=>!!bidder && bidOnDevice(bidder)).map((bidder)=>({
                        ...bidder,sizes
                    }))
                });
                if(parsedUnit.bids && parsedUnit.bids.length>0)pbjsAdUnits.push(parsedUnit);
    });
    prebid.addAdUnits(pbjsAdUnits);
}

function prebidSetConfig(){
    prebid.setConfig({
        bidderTimeout: PREBID_TIMEOUT,
        maxRequestsPerOrigin: MAX_REQUESTS,
        priceGranularity: mfBuckets,
        debug: __DEV__,
        "currency": {
            "adServerCurrency": "EUR",
        },
    });
}
function prebidSetAliases(){
    ALIASES.forEach(al=>prebid.aliasBidder(al[0],al[1]));
}

function prebidBidResponseHandler(a){
    if(prebid.adserverRequestSent)return;
    prebid.adserverRequestSent = true;
    prebid.setTargetingForGPTAsync();
    googletag.cmd.push(refreshGPT);
}

function prebidBidAdjustmants(){

}

export default function initPrebid(){
    prebid.processQueue();
    prebidAddUnits();
    prebidSetConfig();
    // prebidSetAliases();

    prebid.requestBids({
        bidsBackHandler: prebidBidResponseHandler,
		timeout: PREBID_TIMEOUT,
		labels: ['tesLocalhost']
    })
    
    window.pbjs = prebid;

    
    
}
