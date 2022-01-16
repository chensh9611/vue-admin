import request from '@/utils/request.js'

// 显示sku列表的数据
export const reqSkuList = (page, limit) =>
  request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })
// 上架
export const reqOnSale = (skuId) =>
  request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })
// 下架
export const reqCancelSale = (skuId) =>
  request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })
// 删除sku
export const reqDeleteSku = (skuId) =>
  request({ url: `/admin/product/deleteSku/${skuId}`, method: 'delete' })
// 获取sku详情
export const reqGetSku = (skuId) =>
  request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })
// 更新SKU信息
export const reqUpdateSkuInfo = (skuInfo) =>
  request({ url: '/admin/product/updateSkuInfo', data: skuInfo, method: 'post' })
// 获取spu
