import request from '@/utils/request'

// 查询成品合格率列表
export function listFinishedPassRate(query) {
  return request({
    url: '/smartfactory/finishedPassRate/list',
    method: 'get',
    params: query
  })
}

// 查询成品合格率详细
export function getFinishedPassRate(id) {
  return request({
    url: '/smartfactory/finishedPassRate/' + id,
    method: 'get'
  })
}

// 新增成品合格率
export function addFinishedPassRate(data) {
  return request({
    url: '/smartfactory/finishedPassRate',
    method: 'post',
    data: data
  })
}

// 修改成品合格率
export function updateFinishedPassRate(data) {
  return request({
    url: '/smartfactory/finishedPassRate',
    method: 'put',
    data: data
  })
}

// 删除成品合格率
export function delFinishedPassRate(id) {
  return request({
    url: '/smartfactory/finishedPassRate/' + id,
    method: 'delete'
  })
}
