import request from '@/utils/request.js'

const api_name = '/admin/acl/user'
// 获取列表数据
export const getUser = (page, limit, searchObj) =>
  request({ url: `/admin/acl/user/${page}/${limit}`, method: 'get', params: searchObj })
/*
获取当前用户的菜单权限列表
*/
export function getMenu() {
  return request('/admin/acl/index/menu')
}

/*
根据ID获取某个后台用户
*/
export function getById(id) {
  return request({
    url: `${api_name}/get/${id}`,
    method: 'get'
  })
}

// 保存或更新用户
export const addOrUpdate = (user) => {
  if (user.id) {
    console.log('csh')
    return request({ url: `/admin/acl/user/update`, method: 'put', data: user })
  } else {
    return request({ url: `/admin/acl/user/save`, method: 'post', data: user })
  }
}

/*
获取某个用户的所有角色
*/
export function getRoles(userId) {
  return request({
    url: `${api_name}/toAssign/${userId}`,
    method: 'get'
  })
}

/*
给某个用户分配角色
roleId的结构: 字符串, 'rId1,rId2,rId3'
*/
export function assignRoles(userId, roleId) {
  return request({
    url: `${api_name}/doAssign`,
    method: 'post',
    params: {
      userId,
      roleId
    }
  })
}

/*
删除某个用户
*/
export const removeById = (id) => {
  return request({
    url: `${api_name}/remove/${id}`,
    method: 'delete'
  })
}

/*
批量删除多个用户
ids的结构: ids是包含n个id的数组
*/
export function removeUsers(ids) {
  return request({
    url: `${api_name}/batchRemove`,
    method: 'delete',
    data: ids
  })
}
