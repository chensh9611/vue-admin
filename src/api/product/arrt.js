import request from '@/utils/request.js'

// 获取一级分类数据
export const reqGetCategoryOne = () =>
  request({ url: '/admin/product/getCategory1', method: 'get' })
// 获取二级分类数据
export const reqGetCategoryTwo = (category1Id) =>
  request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })
// 获取三级分类数据
export const reqGetCategoryThree = (category2Id) =>
  request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })

// 获取平台属性
export const reqGetAttrInf = (category1Id, category2Id, category3Id) =>
  request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

// 添加属性与属性值
export const reqAddOrUpdateAttrInfo = (data) =>
  request({ url: '/admin/product/saveAttrInfo', method: 'post', data })
// 删除属性
export const reqDeleteAttrInfo = (attrId) =>
  request({ url: `/admin/product/deleteAttr/${attrId}`, method: 'delete' })
