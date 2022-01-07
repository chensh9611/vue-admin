import request from '@/utils/request.js'
// 获取品牌数据
export const reqGetTradeMarkList = (page, limit) =>
  request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

export const reqAddOrTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    // 修改品牌
    return request({ url: '/admin/product/baseTrademark/update', data: tradeMark, method: 'put' })
  } else {
    // 新增品牌
    return request({ url: '/admin/product/baseTrademark/save', data: tradeMark, method: 'post' })
  }
}

// 删除品牌
export const reqDeleteTradeMark = (id) =>
  request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
