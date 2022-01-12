import request from '@/utils/request.js'

// 获取spu列表数据
export const reqgetSpuList = (page, limit, category3Id) =>
  request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id }})
// 获取spu基本信息
export const reqGetSpuInfo = (spuId) =>
  request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })
// 获取品牌信息
export const reqGetTradeMarkList = () =>
  request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })
// 获取spu图标
export const reqGetSpuImageList = (spuId) =>
  request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// 获取平台销售属性
export const reqGetBaseSaleAttrList = () =>
  request({ url: `/admin/product/baseSaleAttrList`, method: 'get' })
// 添加或者更新spu
export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    // 修改Spu
    return request({ url: '/admin/product/updateSpuInfo', data: spuInfo, method: 'post' })
  } else {
    // 新增Spu
    return request({ url: '/admin/product/saveSpuInfo', data: spuInfo, method: 'post' })
  }
}
// 删除Spu
export const reqDeleteSpu = (spuId) =>
  request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })
