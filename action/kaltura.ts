"use server";

export const fetchKalturaId = async () => {
    return {
        partnerId: process.env.KALTURA_PARTNER_ID,
        uiConfId: process.env.KALTURA_UI_CONF_ID
    }
}