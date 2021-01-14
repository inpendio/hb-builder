const DISTRICTM_MEMBER_ID = 100556;

export default [{
    name: '/147751541/maxportalHR_leader_top',
    sizes: 'leader',
    default: [728, 90],
    div: 'div-gpt-ad-1481198789654-0',
    class: 'mfAdLeader',
    collapsable: false,
    bidders: [{
        bidder: 'districtmDMX',
        params: {
            // placementId: '10073048',
            dmxid: 136641,
            memberid: DISTRICTM_MEMBER_ID
        }
    }, ]
}, {
    name: '/147751541/maxportalHR_MUP_sidebar_top',
    sizes: 'mpuSmall',
    default: [300, 250],
    div: 'div-gpt-ad-1481198789654-2',
    class: 'mfAdSidebar',
    collapsable: false,
    bidders: [{
        bidder: 'districtmDMX',
        params: {
            // placementId: '10073052',
            dmxid: 136642,
            memberid: DISTRICTM_MEMBER_ID
        }
    }, ]
}, {
    name: '/147751541/maxportalHR_MUP_sidebar_bottom',
    sizes: 'mpu',
    default: [300, 600],
    div: 'div-gpt-ad-1481198789654-4',
    class: 'mfAdSidebar',
    collapsable: true,
    bidders: [{
        desktopOnly: true,
        bidder: 'districtmDMX',
        params: {
            // placementId: '10073053',
            dmxid: 136643,
            memberid: DISTRICTM_MEMBER_ID
        }
    }, ]
}, {
    name: '/147751541/maxportal_MUP_article_top',
    sizes: 'artTop',
    default: [728, 90],
    div: 'div-gpt-ad-1491386037674-0',
    class: 'mfAdArticleTop',
    collapsable: false,
    bidders: [{
        bidder: 'districtmDMX',
        params: {
            // placementId: '10073055',
            dmxid: 136644,
            memberid: DISTRICTM_MEMBER_ID
        }
    }, ]
}, {
    name: '/147751541/maxportal_MUP_article_bottom_2',
    sizes: 'artBottom',
    default: [336, 280],
    div: 'div-gpt-ad-1543332085450-0',
    class: 'mfAdArticleBottom',
    collapsable: true,
    bidders: []
}, {
    name: '/147751541/maxportalHR_MUP_article_bottom',
    sizes: 'artBottom',
    default: [336, 280],
    div: 'div-gpt-ad-1543332292573-0',
    class: 'mfAdArticleBottom',
    collapsable: true,
    bidders: [{
        mobileOnly: true,
        bidder: 'districtmDMX',
        params: {
            // placementId: '10073053',
            dmxid: 136643,
            memberid: DISTRICTM_MEMBER_ID
        }
    }, ]
}, ];
