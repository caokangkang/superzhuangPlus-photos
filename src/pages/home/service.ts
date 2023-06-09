import request from "@/uitls/request";
import { plusDecorationContentParam } from "./data";

// 获取字典
export async function getMater(): Promise<any> {
  return request("api/stayUser/getMaterialSceneTagList", {
    method: "POST",
  });
}

// 获取列表
export function plusDecorationContentList(
  data: plusDecorationContentParam
): Promise<any> {
  return request("api/stayUser/plusDecorationContentList", {
    method: "POST",
    data: data,
  });
}

// 获取详情
export function getDecorationContentDetails(data: string): Promise<any> {
  console.log('123', data)
  return request(
    `api/stayUser/getApiDecorationContentDetails?contentId=${data.}`,
    {
      method: "GET",
    }
  );
}
