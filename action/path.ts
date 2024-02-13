"use server";

import { getPathResult } from "@/mock/path_data";

// TODO: Implement the actual API call updateRecentlyPath

export const updateRecentlyPath = async (id: string) => {
    if (!id) {
        return;
    }
    console.log("Update Recently Path: ", id);
}

export const fetchPath = async (id: string) => {
    if (!id) {
        return {
            status: 400,
            message: "Invalid path id",
            data: {
                path: null
            }
        }
    }
    const resp = await getPathResult(id);
    return resp;
}