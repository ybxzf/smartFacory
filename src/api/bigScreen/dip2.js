import request from "@/utils/request";

export function getDip2BaseInfo() {
  return request({
    url: "/bigSreen/dip/dipBasicInfo",
    method: "get",
  });
}

export function getDip2ProcessList() {
  return request({
    url: "/bigSreen/dip/dip02ProcessList",
    method: "get",
  });
}

export function getDip2ParamInfoList() {
  return request({
    url: "/bigSreen/dip/dip02ParamInfoList",
    method: "get",
  });
}

export function getDip2FctDefectStatsList() {
  return request({
    url: "/bigSreen/dip/dip02FctDefectStatsList",
    method: "get",
  });
}

export function getDip2DailyCapacityAnalysisList() {
  return request({
    url: "/bigSreen/dip/dip03DailyCapacityAnalysisList",
    method: "get",
  });
}

export function getDip2LastLineInfo() {
  return request({
    url: "/smartfactory/lineBody/selectLastLineInfo",
    method: "get",
  });
}

export function getDip2Picture(imgName) {
  return request({
    url: "/bigSreen/dip/getImageByName",
    params:{
      name: imgName,
    },
    method: "get",
    responseType: 'blob',
  });
}
