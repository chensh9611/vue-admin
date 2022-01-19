<template>
  <div class="role-container">
    <header class="header">
      <el-card>
        <el-form inline>
          <el-form-item>
            <el-input
              v-model="tempSearchObj.roleName"
              size="small"
              class="input"
              placeholder="请输入角色名"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="default" size="small" icon="el-icon-refresh" :disabled="!tempSearchObj.roleName" @click="resetSearch">清空</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </header>
    <main class="main">
      <el-card>
        <div class="button">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addRole">添加</el-button>
          <el-button type="danger" size="small" :disabled="selectedRoles.length === 0" @click="deleteRoles">批量删除</el-button>
        </div>
        <div class="table">
          <el-table
            ref="multipleTable"
            v-loading="listLoading"
            :data="roles"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              label="序号"
              type="index"
              width="80"
              align="center"
            />
            <el-table-column
              prop="roleName"
              label="角色名称"
              align="center"
            />
            <el-table-column
              prop="address"
              label="操作"
              width="300px"
              align="center"
            >
              <template slot-scope="{row}">
                <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
                  <el-button type="info" icon="el-icon-user" size="mini" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Top Center 修改角色" placement="top">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateRole(row)" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Top Center 删除角色" placement="top">
                  <el-popconfirm
                    style="padding-left: 8px"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    icon="el-icon-info"
                    icon-color="red"
                    :title="`是否删除【${row.roleName}】`"
                    @confirm="deleteRoleInfo(row)"
                  >
                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
                  </el-popconfirm>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </main>
    <footer class="footer">
      <el-pagination
        :current-page="page"
        :page-sizes="[5, 10, 20, 100]"
        :page-size="limit"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getRoleList"
      />
    </footer>
  </div>
</template>

<script>

export default {
  name: 'Role',
  data() {
    return {
      roleName: '',
      listLoading: true, // 数据是否正在加载
      roles: [], // 角色列表
      total: 0, // 总记录数
      page: 1, // 当前页码
      limit: 5, // 每页记录数
      tempSearchObj: { // 收集搜索条件数据
        roleName: ''
      },
      searchObj: { // 发送请求的条件参数数据
        roleName: ''
      },
      selectedRoles: [] // 所有选中的角色列表
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    // 删除某个角色
    async deleteRoleInfo(row) {
      console.log(row)
      const result = await this.$API.role.removeById(row.id)
      if (result.code === 20000) {
        this.$message.success('删除成功')
        await this.getRoleList()
      } else {
        this.$message.error(result.message)
      }
    },
    // 批量删除角色
    deleteRoles() {
      this.$confirm('是否删除选中的角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async() => {
        const result = await this.$API.role.removeRoles(this.selectedRoles)
        console.log(result)
        if (result.code === 20000) {
          this.$message.success('删除成功')
          await this.getRoleList()
        } else {
          this.$message.error(result.message)
        }
      })
    },
    // 更新角色
    updateRole(row) {
      console.log(row)
      this.$prompt('请输入新的角色名称', '修改角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async({ value }) => {
        row.roleName = value
        const result = await this.$API.role.updateById(row)
        if (result.code === 20000) {
          this.$message.success('修改角色成功')
          await this.getRoleList()
        } else {
          this.$message.error(result.message)
        }
      })
    },
    // 添加角色
    addRole() {
      this.$prompt('请输入角色名称', '添加角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async({ value }) => {
        this.roleName = value
        const result = await this.$API.role.addRole({ roleName: this.roleName })
        if (result.code === 20000) {
          this.$message.success('添加角色成功')
          await this.getRoleList()
        } else {
          this.$message.error(result.message)
        }
      })
    },
    // 查询角色名
    search() {
      this.searchObj = { ...this.tempSearchObj }
      this.getRoleList()
    },
    // 重置查询
    resetSearch() {
      this.searchObj = {}
      this.tempSearchObj = {}
      this.getRoleList()
    },
    // 获取角色数据
    async getRoleList(pager = 1) {
      this.listLoading = true
      this.page = pager
      const { page, limit, searchObj } = this
      const result = await this.$API.role.getPageList(page, limit, searchObj)
      if (result.code === 20000) {
        const { items, total } = result.data
        this.roles = items
        this.total = total
        this.listLoading = false
      }
    },
    /*
    * 触发回调
    * */
    // 分页limit触发
    handleSizeChange(value) {
      this.limit = value
      this.getRoleList()
    },
    // 复选框触发
    handleSelectionChange(value) {
      this.selectedRoles = value.map(item => item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.role-container {
  .header {
  }
  .main {
    padding-top: 20px;
    .table {
      padding: 10px 0;
    }
  }
}
</style>
