import request from '@/utils/request'

// 查询出勤统计列表
export function listAttendance(query) {
  return request({
    url: '/smartfactory/attendance/list',
    method: 'get',
    params: query
  })
}

// 查询出勤统计详细
export function getAttendance(id) {
  return request({
    url: '/smartfactory/attendance/' + id,
    method: 'get'
  })
}

// 新增出勤统计
export function addAttendance(data) {
  return request({
    url: '/smartfactory/attendance',
    method: 'post',
    data: data
  })
}

// 修改出勤统计
export function updateAttendance(data) {
  return request({
    url: '/smartfactory/attendance',
    method: 'put',
    data: data
  })
}

// 删除出勤统计
export function delAttendance(id) {
  return request({
    url: '/smartfactory/attendance/' + id,
    method: 'delete'
  })
}
