import request from '@/utils/request'

// 查询月度产能统计列表
export function listMonthlyStatistics(query) {
  return request({
    url: '/smartfactory/monthlyStatistics/list',
    method: 'get',
    params: query
  })
}

// 查询月度产能统计详细
export function getMonthlyStatistics(id) {
  return request({
    url: '/smartfactory/monthlyStatistics/' + id,
    method: 'get'
  })
}

// 新增月度产能统计
export function addMonthlyStatistics(data) {
  return request({
    url: '/smartfactory/monthlyStatistics',
    method: 'post',
    data: data
  })
}

// 修改月度产能统计
export function updateMonthlyStatistics(data) {
  return request({
    url: '/smartfactory/monthlyStatistics',
    method: 'put',
    data: data
  })
}

// 删除月度产能统计
export function delMonthlyStatistics(id) {
  return request({
    url: '/smartfactory/monthlyStatistics/' + id,
    method: 'delete'
  })
}
