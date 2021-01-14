import adSlots from './adUnits';
import sizeMap from './sizes';

export const PREBID_TIMEOUT = 10000;
export const MAX_REQUESTS = 8;
export const ADD_TARGETING = 'mf_category';
export const TARGET_VAR= 'kategorija';
export const ALIASES = [
    // ['appnexus','districtm']
];

export const mfBuckets = {
    "buckets": [{
        "precision": 2,
        // "min": 0,
        "max": 3,
        "increment": 0.01
    }, {
        "precision": 2,
        // "min": 3,
        "max": 33,
        "increment": 0.2
    }]
};

export {
    adSlots,sizeMap
}
