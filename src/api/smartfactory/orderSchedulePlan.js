import request from '@/utils/request'

// 查询订单排产计划列表
export function listOrderSchedulePlan(query) {
  return request({
    url: '/smartfactory/orderSchedulePlan/list',
    method: 'get',
    params: query
  })
}

// 查询订单排产计划详细
export function getOrderSchedulePlan(id) {
  return request({
    url: '/smartfactory/orderSchedulePlan/' + id,
    method: 'get'
  })
}

// 新增订单排产计划
export function addOrderSchedulePlan(data) {
  return request({
    url: '/smartfactory/orderSchedulePlan',
    method: 'post',
    data: data
  })
}

// 修改订单排产计划
export function updateOrderSchedulePlan(data) {
  return request({
    url: '/smartfactory/orderSchedulePlan',
    method: 'put',
    data: data
  })
}

// 删除订单排产计划
export function delOrderSchedulePlan(id) {
  return request({
    url: '/smartfactory/orderSchedulePlan/' + id,
    method: 'delete'
  })
}
