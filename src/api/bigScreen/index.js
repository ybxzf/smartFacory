/*
 * @Author: mujinzjh
 * @Description: 
 * @Date: 2024-11-18 20:16:50
 * @LastEditTime: 2024-12-17 22:24:14
 * @FilePath: \smartFacory\src\api\bigScreen\index.js
 */
import request from "@/utils/request";

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
 * @description 获取出勤数据
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

/**
 * @description 获取监控信息
 * @returns
 */
export function getCameraData(lineBody) {
  return request({
    url: "/smartfactory/camera/list",
    method: "get",
    params: {
      lineBody,
    },
  });
}