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
