import request from '@/utils/request'

// 查询线体字典列表
export function listLineBody(query) {
  return request({
    url: '/smartfactory/lineBody/list',
    method: 'get',
    params: query
  })
}

// 查询线体字典详细
export function getLineBody(lineNumber) {
  return request({
    url: '/smartfactory/lineBody/' + lineNumber,
    method: 'get'
  })
}

// 新增线体字典
export function addLineBody(data) {
  return request({
    url: '/smartfactory/lineBody',
    method: 'post',
    data: data
  })
}

// 修改线体字典
export function updateLineBody(data) {
  return request({
    url: '/smartfactory/lineBody',
    method: 'put',
    data: data
  })
}

// 删除线体字典
export function delLineBody(lineNumber) {
  return request({
    url: '/smartfactory/lineBody/' + lineNumber,
    method: 'delete'
  })
}
