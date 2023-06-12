import request from "@/uitls/request";


// 获取详情
export function getDecorationContentDetails(data: string): Promise<any> {
  return request(
    `api/stayUser/getApiDecorationContentDetails?contentId=${data}`,
    {
      method: "GET",
    }
  );
}