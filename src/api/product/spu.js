import request from '@/utils/request.js'

// 获取spu列表数据
export const reqgetSpuList = (page, limit, category3Id) =>
  request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id }})
