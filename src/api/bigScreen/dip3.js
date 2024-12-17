import request from "@/utils/request";
/**
 * @description 获取Dip3的基础信息
 * @returns
 */
export function getDip3BasicInfo() {
  return request({
    url: "/bigSreen/dip/dipBasicInfo",
    method: "get",
  });
}

export const getImageUrl = (query) => {
  return request({
    url: "/bigSreen/dip/getImageByName",
    method: "get",
		responseType:'blob',
    params: query,
  });
};

export const getListData = () => {
  return request({
    url: "/bigSreen/dip/dip03DefectProjectList",
    method: "get",
  });
};

export const getGroupInfo = () => {
  return request({
    url: "/bigSreen/dip/dip03GroupInfoList",
    method: "get",
  });
};

export const getHourData = () => {
  return request({
    url: "/bigSreen/dip/dip03HourlyCapacityAnalysisList",
    method: "get",
  });
};

export const getBadData = () => {
  return request({
    url: "/bigSreen/dip/dip03ProjectInfoList",
    method: "get",
  });
};

export const getPieData = () => {
  return request({
    url: "/bigSreen/dip/dip03LossTimeList",
    method: "get",
  });
};

export const getCompareData = () => {
  return request({
    url: "/bigSreen/dip/dip03Capacity",
    method: "get",
  });
};
