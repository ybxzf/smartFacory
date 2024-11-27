import request from '@/utils/request'

// 查询当日产能统计列表
export function listDailyStatistics(query) {
  return request({
    url: '/smartfactory/dailyStatistics/list',
    method: 'get',
    params: query
  })
}

// 查询当日产能统计详细
export function getDailyStatistics(id) {
  return request({
    url: '/smartfactory/dailyStatistics/' + id,
    method: 'get'
  })
}

// 新增当日产能统计
export function addDailyStatistics(data) {
  return request({
    url: '/smartfactory/dailyStatistics',
    method: 'post',
    data: data
  })
}

// 修改当日产能统计
export function updateDailyStatistics(data) {
  return request({
    url: '/smartfactory/dailyStatistics',
    method: 'put',
    data: data
  })
}

// 删除当日产能统计
export function delDailyStatistics(id) {
  return request({
    url: '/smartfactory/dailyStatistics/' + id,
    method: 'delete'
  })
}
