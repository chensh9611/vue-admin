// 将4个模块的api统一暴露

import * as trademark from '../api/product/tradeMark.js'
import * as attr from '../api/product/arrt.js'
import * as skuForm from './product/skuForm.js'
import * as spu from '../api/product/spu.js'
import * as sku from '../api/product/sku.js'

export default {
  trademark,
  attr,
  skuForm,
  spu,
  sku
}
