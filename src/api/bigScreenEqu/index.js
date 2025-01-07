import request from "@/utils/ldRequest";

/**
 * @description 获取设备效率
 * @returns
 */
export function GetEquipment_efficiencyData() {
  return request({
    url: "/boardApi/GetBoardData/GetEquipment_efficiencyData",
    method: "get",
  });
}

/**
 * @description 获取设备损失时间
 * @returns
 */
export function GetEquipment_losttimeData() {
  return request({
    url: "/boardApi/GetBoardData/GetEquipment_losttimeData",
    method: "get",
  });
}

/**
 * @description 获取设备状态
 * @returns
 */
export function GetEquipment_statusData() {
  return request({
    url: "/boardApi/GetBoardData/GetEquipment_statusData",
    method: "get",
  });
}
