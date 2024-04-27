"use server";

import { AuthError } from "@/constants/error";
import { cookies } from "next/headers";

export const updateVideoProgress = async (
  vid: string,
  pathId: string,
  type: string,
  num_tick: number,
  watched_partition: number[]
) => {
  const accessToken = cookies().get("access_token");

  if (!accessToken) {
    throw new Error(AuthError.ERR_ACCESS_TOKEN);
  }
  
  const res = await fetch(
    process.env.MCV_PATH_UPDATE_VIDEO_PROGRESS_URL! +
      vid +
      "/progress/patch?path_id=" +
      pathId +
      "&type=" +
      type +
      "&num_tick=" +
      num_tick +
      "&watched_partition=[" +
      watched_partition +
      "]",
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    }
  );
  if (res.status === 200) {
    const resp = await res.json();
    return {
      status: res.status,
      msg: resp.message
    };
  }
  return {
    status: res.status,
    msg: res.statusText
  };
};

export const updateMaterialProgress = async (
  materialId: string,
  pathId: string
) => {
  const accessToken = cookies().get("access_token");

  if (!accessToken) {
    throw new Error(AuthError.ERR_ACCESS_TOKEN);
  }

  const res = await fetch(
    process.env.MCV_PATH_UPDATE_MATERIAL_PROGRESS_URL! +
      materialId +
      "/progress/patch?path_id=" +
      pathId,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    }
  );
  if (res.status === 200) {
    const resp = await res.json();
    return {
      status: res.status,
      msg: resp.message
    };
  }
  return {
    status: res.status,
    msg: res.statusText
  };
};
