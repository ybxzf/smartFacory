import request from '@/utils/request'

// 查询摄像头列表
export function listCamera(query) {
  return request({
    url: '/smartfactory/camera/list',
    method: 'get',
    params: query
  })
}

// 查询摄像头详细
export function getCamera(id) {
  return request({
    url: '/smartfactory/camera/' + id,
    method: 'get'
  })
}

// 新增摄像头
export function addCamera(data) {
  return request({
    url: '/smartfactory/camera',
    method: 'post',
    data: data
  })
}

// 修改摄像头
export function updateCamera(data) {
  return request({
    url: '/smartfactory/camera',
    method: 'put',
    data: data
  })
}

// 删除摄像头
export function delCamera(id) {
  return request({
    url: '/smartfactory/camera/' + id,
    method: 'delete'
  })
}
