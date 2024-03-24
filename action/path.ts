"use server";

import { getPathResult, updatePathProgress } from "@/mock/path_data";

// TODO: Implement the actual API call updateRecentlyPath

export const updateRecentlyPath = async (id: string) => {
    if (!id) {
        return;
    }
    const resp = await updatePathProgress(id, 100); // Marked as completed only
    return resp;
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