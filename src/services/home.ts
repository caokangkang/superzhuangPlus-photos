import request from "../uitls/request";

export async function getMater(): Promise<any> {
  return request("api/stayUser/getMaterialSceneTagList", {
    method: "POST",
  });
}
