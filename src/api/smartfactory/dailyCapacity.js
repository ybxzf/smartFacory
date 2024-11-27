import request from '@/utils/request'

// 查询日产能列表
export function listDailyCapacity(query) {
  return request({
    url: '/smartfactory/dailyCapacity/list',
    method: 'get',
    params: query
  })
}

// 查询日产能详细
export function getDailyCapacity(id) {
  return request({
    url: '/smartfactory/dailyCapacity/' + id,
    method: 'get'
  })
}

// 新增日产能
export function addDailyCapacity(data) {
  return request({
    url: '/smartfactory/dailyCapacity',
    method: 'post',
    data: data
  })
}

// 修改日产能
export function updateDailyCapacity(data) {
  return request({
    url: '/smartfactory/dailyCapacity',
    method: 'put',
    data: data
  })
}

// 删除日产能
export function delDailyCapacity(id) {
  return request({
    url: '/smartfactory/dailyCapacity/' + id,
    method: 'delete'
  })
}
