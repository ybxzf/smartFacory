import request from "@/utils/request";
/**
 * @description 获取Dip3的基础信息
 * @returns
 */
export const getInfoData = (param) => {
  return request({
    url: "/bigSreen/process/selectProcess4InfoList",
    method: "get",
    params: param,
  });
};

export const getTableData = (param) => {
  return request({
    url: "/bigSreen/process/selectProcess4CapacityList",
    method: "get",
    params: param,
  });
};

export const getGroupInfo = (param) => {
  return request({
    url: "/bigSreen/process/selectProcess4GroupInfoList",
    method: "get",
    params: param,
  });
};

export const getImageUrl = (query) => {
  return request({
    url: "/bigSreen/process/getImageByGroupLeader",
    method: "get",
    responseType:'blob',
    params: query,
  });
};

export const getProjectInfoList = (query) => {
  return request({
    url: "/bigSreen/process/selectProcess4ProjectInfoList",
    method: "get",
    params: query,
  });
};


export const getLossTime = (query) => {
  return request({
    url: "/bigSreen/process/selectProcess4LossTimeList",
    method: "get",
    params: query,
  });
};

export const getCapacityList = (query) => {
  return request({
    url: "/bigSreen/process/selectProcess4CapacityGroup",
    method: "get",
    params: query,
  });
};

export const getHourList = (query) => {
  return request({
    url: "/bigSreen/process/getCurveHourlist",
    method: "get",
    params: query,
  });
};
