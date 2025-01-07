import request from '@/utils/request'

// 查询工厂小组信息列表
export function listWorkGroupInfo(query) {
  return request({
    url: '/smartfactory/workGroupInfo/list',
    method: 'get',
    params: query
  })
}

// 查询工厂小组信息详细
export function getWorkGroupInfo(id) {
  return request({
    url: '/smartfactory/workGroupInfo/' + id,
    method: 'get'
  })
}

// 新增工厂小组信息
export function addWorkGroupInfo(data) {
  return request({
    url: '/smartfactory/workGroupInfo',
    method: 'post',
    data: data
  })
}

// 修改工厂小组信息
export function updateWorkGroupInfo(data) {
  return request({
    url: '/smartfactory/workGroupInfo',
    method: 'put',
    data: data
  })
}

// 删除工厂小组信息
export function delWorkGroupInfo(id) {
  return request({
    url: '/smartfactory/workGroupInfo/' + id,
    method: 'delete'
  })
}
