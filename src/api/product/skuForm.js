import request from '@/utils/request.js'

// 获取图片
export const reqGetSpuImageList = (spuId) =>
  request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// 获取spu属性
export const reqGetSpuSaleAttrList = (spuId) =>
  request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
// 获取平台属性数据
export const reqGetAttrList = (category1Id, category2Id, category3Id) =>
  request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
// 保存skuInfo
export const reqSaveSkuInfo = (skuInfo) => {
  if (skuInfo.id) {
    return request({ url: `/admin/product/updateSkuInfo`, data: skuInfo, method: 'post' })
  } else {
    return request({ url: `/admin/product/saveSkuInfo`, data: skuInfo, method: 'post' })
  }
}
// 获取SKU列表数据
export const reqFindBySpuId = (spuId) =>
  request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })
