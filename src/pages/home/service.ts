import request from "@/uitls/request";
import { plusDecorationContentParam } from "./data";

export async function getMater(): Promise<any> {
  return request("api/stayUser/getMaterialSceneTagList", {
    method: "POST",
  });
}
export function plusDecorationContentList(
  data: plusDecorationContentParam
): Promise<any> {
  return request("api/stayUser/plusDecorationContentList", {
    method: "POST",
    data: data,
  });
}
