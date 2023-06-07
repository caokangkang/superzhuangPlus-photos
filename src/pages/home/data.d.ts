export type dictionariesData = {
  createBy?: string;
  createTime: Date;
  delFlag: number;
  id: string;
  isChoices: number;
  level: number;
  parentId: number;
  secondTagList: { text: string; value: number }[];
  sortOrder: number;
  status: number;
  tagName: "风格";
  tagNumber: number;
  tagScene: string;
  tagSceneName: string;
  tagType: string;
  tagTypeName: string;
  updateBy: string;
  updateTime: Date;
};

// 列表接口入参
export type plusDecorationContentParam = {
  currentPage: number;
  pageSize: number;
  contentTemplate: string; // 固定传9500005，代表图片库类的文章
  contentTemplateSecond?: string; //  不用传
  secondTagNumbers: number[]; // 标签、筛选条件。如风格、空间等
  typeCode?: string; //  不用传
  tfcode: string; // -- 页面渠道投放编码，一般是链接携带的参数
  ownedIp: string; // -- 所属IP，原先怎么传的就怎么传
  sortType: number; // -- 排序规则：0推荐排序  1浏览数倒序排
};

export type listDataType = {
  clickShow: number;
  contentTitle: string;
  firstImg: string;
  id: string;
  [propName?: string]: any
};

declare module "antd-mobile";
