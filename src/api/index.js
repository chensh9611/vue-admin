// 将4个模块的api统一暴露

import * as trademark from '../api/product/tradeMark.js'
import * as attr from '../api/product/arrt.js'
import * as sku from '../api/product/sku.js'
import * as spu from '../api/product/spu.js'

export default {
  trademark,
  attr,
  sku,
  spu
}
