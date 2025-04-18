import request from "@/utils/ldRequest";

// 查询公共信息列表
export function GetPubCode(query) {
  return request({
    url: '/boardApi/NqiProduct/GetPubCode',
    method: 'get',
    params: query
  })
}

// 查询元器件信息
export function GetPubComponentInfo(query) {
  return request({
    url: '/boardApi/NqiProduct/GetPubComponentInfo',
    method: 'get',
    params: query
  })
}

// 查询生产计划
export function GetProductionPlan(query) {
  return request({
    url: '/boardApi/NqiProduct/GetProductionPlan',
    method: 'get',
    params: query
  })
}

// 查询产品信息列表
export function GetProductInfo(query) {
  return request({
    url: '/boardApi/NqiProduct/GetProductInfo',
    method: 'get',
    params: query
  })
}

//添加产品信息
export function AddProductInfo(data) {
  return request({
    url: '/boardApi/NqiProduct/AddProductInfo',
    method: 'post',
    data: data
  })
}

//编辑产品信息
export function UpdateProductInfo(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateProductInfo',
    method: 'post',
    data: data
  })
}

// 删除产品信息
export function DeleteProductInfo(id) {
  return request({
    url: '/boardApi/NqiProduct/DeleteProductInfo?id='+id,
    method: 'delete'
  })
}

// 查询产品详细信息列表
export function GetProductDetail(query) {
  return request({
    url: '/boardApi/NqiProduct/GetProductDetail',
    method: 'get',
    params: query
  })
}

//添加产品详细信息
export function AddProductDetail(data) {
  return request({
    url: '/boardApi/NqiProduct/AddProductDetail',
    method: 'post',
    data: data
  })
}

//编辑产品详细信息
export function UpdateProductDetail(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateProductDetail',
    method: 'post',
    data: data
  })
}

// 删除产品详细信息
export function DeleteProductDetail(data) {
  return request({
    url: '/boardApi/NqiProduct/DeleteProductDetail',
    method: 'delete',
    data: data
  })
}

// 查询产品详细信息列表
export function GetProductTestReport(query) {
  return request({
    url: '/boardApi/NqiProduct/GetProductTestReport',
    method: 'get',
    params: query
  })
}

//添加产品详细信息
export function AddProductTestReport(data) {
  return request({
    url: '/boardApi/NqiProduct/AddProductTestReport',
    method: 'post',
    data: data
  })
}

//编辑产品详细信息
export function UpdateProductTestReport(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateProductTestReport',
    method: 'post',
    data: data
  })
}
// 删除产品详细信息
export function DeleteProductTestReport(data) {
  return request({
    url: '/boardApi/NqiProduct/DeleteProductTestReport',
    method: 'delete',
    data: data
  })
}

// 查询产品研发方案列表
export function GetProductProject(query) {
  return request({
    url: '/boardApi/NqiProduct/GetProductProject',
    method: 'get',
    params: query
  })
}

//添加产品研发方案
export function AddProductProject(data) {
  return request({
    url: '/boardApi/NqiProduct/AddProductProject',
    method: 'post',
    data: data
  })
}

//编辑产品研发方案
export function UpdateProductProject(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateProductProject',
    method: 'post',
    data: data
  })
}

// 删除产品研发方案
export function DeleteProductProject(data) {
  return request({
    url: '/boardApi/NqiProduct/DeleteProductProject',
    method: 'delete',
    data: data
  })}

// 查询产品研发方案列表
export function GetProjectDetail(query) {
  return request({
    url: '/boardApi/NqiProduct/GetProjectDetail',
    method: 'get',
    params: query
  })
}

//添加产品研发方案
export function AddProjectDetail(data) {
  return request({
    url: '/boardApi/NqiProduct/AddProjectDetail',
    method: 'post',
    data: data
  })
}

//编辑产品研发方案
export function UpdateProjectDetail(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateProjectDetail',
    method: 'post',
    data: data
  })
}

// 删除产品研发方案
export function DeleteProjectDetail(id) {
  return request({
    url: '/boardApi/NqiProduct/DeleteProjectDetail?id='+id,
    method: 'delete',
  })
}

// 查询产品元器件清单列表
export function GetComponentDetailList(query) {
  return request({
    url: '/boardApi/NqiProduct/GetComponentDetailList',
    method: 'get',
    params: query
  })
}

// 查询产品元器件清单详情列表
export function GetComponentDetailLists(query) {
  return request({
    url: '/boardApi/NqiProduct/GetComponentDetailLists',
    method: 'get',
    params: query
  })
}

//添加产品元器件清单
export function AddComponentDetailList(data) {
  return request({
    url: '/boardApi/NqiProduct/AddComponentDetailList',
    method: 'post',
    data: data
  })
}

//编辑产品元器件清单
export function UpdateComponentDetailList(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateComponentDetailList',
    method: 'post',
    data: data
  })
}

// 删除产品元器件清单
export function DeleteComponentDetailList(data) {
  return request({
    url: '/boardApi/NqiProduct/DeleteComponentDetailList',
    method: 'delete',
    data: data
  })
}

// 查询研发方案变更列表
export function GetProjectChangeRecond(query) {
  return request({
    url: '/boardApi/NqiProduct/GetProjectChangeRecond',
    method: 'get',
    params: query
  })
}

//添加研发方案变更
export function AddProjectChangeRecond(data) {
  return request({
    url: '/boardApi/NqiProduct/AddProjectChangeRecond',
    method: 'post',
    data: data
  })
}

//编辑研发方案变更
export function UpdateProjectChangeRecond(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateProjectChangeRecond',
    method: 'post',
    data: data
  })
}

// 删除研发方案变更
export function DeleteProjectChangeRecond(query) {
  return request({
    url: '/boardApi/NqiProduct/DeleteProjectChangeRecond',
    method: 'delete',
    params: query
  })
}

// 查询 元器件变更记录列表
export function GetComponentChangeRecord(query) {
  return request({
    url: '/boardApi/NqiProduct/GetComponentChangeRecord',
    method: 'get',
    params: query
  })
}

//添加 元器件变更记录
export function AddComponentChangeRecord(data) {
  return request({
    url: '/boardApi/NqiProduct/AddComponentChangeRecord',
    method: 'post',
    data: data
  })
}

//编辑 元器件变更记录
export function UpdateComponentChangeRecord(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateComponentChangeRecord',
    method: 'post',
    data: data
  })
}

// 删除 元器件变更记录
export function DeleteComponentChangeRecord(query) {
  return request({
    url: '/boardApi/NqiProduct/DeleteComponentChangeRecord',
    method: 'delete',
    params: query
  })
}

// 查询中标/合同信息
export function GetBiddingInfo(query) {
  return request({
    url: '/boardApi/NqiProduct/GetBiddingInfo',
    method: 'get',
    params: query
  })
}

//添加中标/合同信息
export function AddBiddingInfo(data) {
  return request({
    url: '/boardApi/NqiProduct/AddBiddingInfo',
    method: 'post',
    data: data
  })
}

//编辑中标/合同信息
export function UpdateBiddingInfo(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateBiddingInfo',
    method: 'post',
    data: data
  })
}

// 删除中标/合同信息
export function DeleteBiddingInfo(query) {
  return request({
    url: '/boardApi/NqiProduct/DeleteBiddingInfo',
    method: 'delete',
    params: query
  })
}

// 查询元器件采购计划
export function GetComponentPurchasePlanInfo(query) {
  return request({
    url: '/boardApi/NqiProduct/GetComponentPurchasePlanInfo',
    method: 'get',
    params: query
  })
}

//添加元器件采购计划
export function AddComponentPurchasePlanInfo(data) {
  return request({
    url: '/boardApi/NqiProduct/AddComponentPurchasePlanInfo',
    method: 'post',
    data: data
  })
}

//编辑元器件采购计划
export function UpdateComponentPurchasePlanInfo(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateComponentPurchasePlanInfo',
    method: 'post',
    data: data
  })
}

// 删除元器件采购计划
export function DeleteComponentPurchasePlanInfo(query) {
  return request({
    url: '/boardApi/NqiProduct/DeleteComponentPurchasePlanInfo',
    method: 'delete',
    params: query
  })
}

// 查询中标合同信息变更
export function GetBiddingChangeRecond(query) {
  return request({
    url: '/boardApi/NqiProduct/GetBiddingChangeRecond',
    method: 'get',
    params: query
  })
}

//添加中标合同信息变更
export function AddBiddingChangeRecond(data) {
  return request({
    url: '/boardApi/NqiProduct/AddBiddingChangeRecond',
    method: 'post',
    data: data
  })
}

//编辑中标合同信息变更
export function UpdateBiddingChangeRecond(data) {
  return request({
    url: '/boardApi/NqiProduct/UpdateBiddingChangeRecond',
    method: 'post',
    data: data
  })
}

// 删除中标合同信息变更
export function DeleteBiddingChangeRecond(query) {
  return request({
    url: '/boardApi/NqiProduct/DeleteBiddingChangeRecond',
    method: 'delete',
    params: query
  })
}
