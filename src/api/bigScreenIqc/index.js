import request from "@/utils/ldRequest";

/**
 * @description 获取IQC检验明细
 * @returns
 */
export function GetIqc_checkitemData() {
  return request({
    url: '/boardApi/GetBoardData/GetIqc_checkitemData',
    method: "get",
  });
}

/**
 * @description 获取IQC不良情况
 * @returns
 */
export function GetIqc_defect_infoData() {
  return request({
    url: '/boardApi/GetBoardData/GetIqc_defect_infoData',
    method: "get",
  });
}


/**
 * @description 获取IQC批合格情况
 * @returns
 */
export function GetIqc_pass_infoData(producttype) {
  return request({
    url: '/boardApi/GetBoardData/GetIqc_pass_infoData?producttype='+producttype,
    method: "get",
  });
}


/**
 * @description 获取IQC时合格情况
 * @returns
 */
export function GetIqc_pass_sum_infoData(producttype) {
  return request({
    url: '/boardApi/GetBoardData/GetIqc_pass_sum_infoData?producttype='+producttype,
    method: "get",
  });
}








