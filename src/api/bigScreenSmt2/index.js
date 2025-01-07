import request from "@/utils/ldRequest";

// 查询订单计划表
export function getPlanTable(query) {
  return request({
    url: "/smartfactory/orderSchedulePlan/list",
    method: "get",
    params: query,
  });
}

// 获取当日产能统计
export function getDailyStatistics() {
  return request({
    url: "/smartfactory/dailyStatistics/getTjList",
    method: "get",
  });
}
// 获取月度产能计划
export function getMonthStatistics() {
  return request({
    url: "/smartfactory/monthlyStatistics/selectTjByMonth",
    method: "get",
  });
}

/**
 * @description 获取SMT基础信息
 * @returns
 */
export function getAttendanceData() {
  return request({
    url: "/smartfactory/attendance/selectLastAttend",
    method: "get",
  });
}

/**
 * @description 获取产能数据
 * @returns
 */
export function getCapacityData() {
  return request({
    url: "/smartfactory/dailyCapacity/selectLastAttend",
    method: "get",
  });
}

/**
 * @description 获取成品检验数据
 * @returns
 */
export function getFinishedPassRateData() {
  return request({
    url: "/smartfactory/finishedPassRate/selectTjByMonth",
    method: "get",
  });
}

/**
 * @description 获取线体状态
 * @returns
 */
export function getLineBodyData() {
  return request({
    url: "/smartfactory/lineBody/selectLastLineInfo",
    method: "get",
  });
}
export function GetFinishSinglePhaseMoData() {
  return request({
    url: "/api/GetMesData/GetFinishSinglePhaseMoData",
    method: "get",
  });
}

  /**
 * @description 获取线体状态
 * @returns
 */
export function GetSmt_basic_infoData() {
  return request({
    url: "/boardApi/GetBoardData/GetSmt_basic_infoData",
    method: "get",
  });
}

 /**
 * @description 获取SMT各工序详情
 * @returns
 */
 export function GetSmt02_processData() {
  return request({
    url: "/boardApi/GetBoardData/GetSmt02_processData",
    method: "get",
  });
}

/**
 * @description 获取AOI不良项目列表
 * @returns
 */
export function GetSmt02_aoi_defect_statsData(data,limit) {
  return request({
    url: '/boardApi/GetBoardData/GetSmt02_aoi_defect_statsData?StartDate=' + data+'&limit='+limit,
    method: "get",
  });
}

/**
 * @description 获取SMT每小时产能
 * @returns
 */
export function GetSmt02_hourly_capacityData(data) {
  return request({
    url: '/boardApi/GetBoardData/GetSmt02_hourly_capacityData?StartDate=' + data,
    method: "get",
  });
}

/**
 * @description 获取SMT贴片统计
 * @returns
 */
export function GetSmt02_patch_infoData() {
  return request({
    url: '/boardApi/GetBoardData/GetSmt02_patch_infoData',
    method: "get",
  });
}


/**
 * @description 获取SMT贴片统计
 * @returns
 */
export function GetSmt02_date_patch_infoData() {
  return request({
    url: '/boardApi/GetBoardData/GetSmt02_date_patch_infoData',
    method: "get",
  });
}
/**
 * @description 获取SMT贴片明细
 * @returns
 */
export function Getsmt03_patch_infoData(work_order) {
  return request({
    url: '/boardApi/GetBoardData/Getsmt03_patch_infoData?work_order='+work_order,
    method: "get",
  });
}


/**
 * @description 获取SMT不良明细
 * @returns
 */
export function GetSmt03_mo_defect_projectData(work_order,date) {
  return request({
    url: '/boardApi/GetBoardData/GetSmt03_mo_defect_projectData?work_order='+work_order+'&date='+date,
    method: "get",
  });
}
