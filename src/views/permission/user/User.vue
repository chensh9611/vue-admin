<template>
  <div class="user-container">
    <header class="header">
      <el-card>
        <el-form inline>
          <el-form-item>
            <el-input
              v-model="tempSearchObj.username"
              size="small"
              class="input"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="default" size="small" icon="el-icon-refresh" :disabled="!tempSearchObj.username" @click="resetSearch">清空</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </header>
    <main class="main">
      <el-card>
        <div class="button">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addUser">添加</el-button>
          <el-button type="danger" size="small" :disabled="selectedId.length === 0" @click="deleteUsers">批量删除</el-button>
        </div>
        <div class="table">
          <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="userData"
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
              label="用户名"
              prop="username"
              width="120"
            />
            <el-table-column
              prop="nickName"
              label="用户昵称"
              width="120"
            />
            <el-table-column
              prop="roleName"
              label="权限列表"
            />
            <el-table-column
              prop="gmtCreate"
              label="创建时间"
            />
            <el-table-column
              prop="gmtModified"
              label="更新时间"
            />
            <el-table-column
              prop="address"
              label="操作"
            >
              <template slot-scope="{row}">
                <el-tooltip class="item" effect="dark" content="设置角色" placement="top">
                  <el-button type="info" icon="el-icon-user" size="mini" @click="setRole(row)" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="修改用户" placement="top">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateUser(row)" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除用户" placement="top">
                  <el-popconfirm
                    style="padding-left: 8px"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    icon="el-icon-info"
                    icon-color="red"
                    :title="`是否删除【${row.username}】`"
                    @confirm="deleteUser(row)"
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
        @current-change="getUserList"
      />
    </footer>
    <article class="add-update-user">
      <el-dialog :title="user.id ? '修改用户' : '添加用户'" :visible.sync="dialogFormVisible">
        <el-form ref="userForm" :model="user" :rules="userRules" label-width="120px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="user.nickName" placeholder="请输入用户昵称" />
          </el-form-item>
          <el-form-item v-if="!user.id" label="密码" prop="password">
            <el-input v-model="user.password" placeholder="请输入密码" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="addOrUpdateUser">确定</el-button>
            <el-button type="default" size="small" @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </article>
    <article class="set-role">
      <el-dialog title="设置角色" :visible.sync="dialogRoleVisible">
        <el-form ref="userForm" :model="user" :rules="userRules" label-width="120px">
          <el-form-item label="用户名" prop="username">
            <el-input :value="user.username" disabled />
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;" />
            <el-checkbox-group v-model="userRoleIds" @change="handleCheckedChange">
              <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id">{{ role.roleName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button :loading="loading" type="primary" @click="assignRole">保存</el-button>
          <el-button @click="resetRoleData">取消</el-button>
        </div>
      </el-dialog>
    </article>
  </div>
</template>

<script>

export default {
  name: 'User',
  data() {
    return {
      userRoleIds: [],
      allRoles: [],
      checkAll: false,
      isIndeterminate: false,
      dialogRoleVisible: false, // 设置角色页面开关
      selectedId: [], // 选中的用户ID
      user: {
        deleted: false,
        nickName: '',
        password: '',
        roleNam: '',
        salt: '',
        token: '',
        username: ''
      }, // 用户信息
      dialogFormVisible: false,
      loading: true,
      searchObj: { // 包含请求搜索条件数据的对象
        username: ''
      },
      tempSearchObj: {
        username: ''
      },
      value: '',
      page: 1,
      limit: 5,
      total: 0,
      userData: [],
      // 校验
      userRules: {
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: this.validatePassword, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: this.validateUserName, trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          { validator: this.validateNickName, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    // 重置用户角色的数据
    resetRoleData() {
      this.dialogRoleVisible = false
      this.allRoles = []
      this.userRoleIds = []
      this.isIndeterminate = false
      this.checkAll = false
    },
    // 保存用户觉得的设置
    async assignRole() {
      const userId = this.user.id
      const roleIds = this.userRoleIds.join(',')
      this.loading = true
      const result = await this.$API.username.assignRoles(userId, roleIds)
      if (result.code === 20000) {
        this.$message.success('分配角色成功')
        this.loading = false
        this.dialogRoleVisible = false
        await this.getUserList()
      } else {
        this.$message.error(result.message)
      }
      if (this.$store.getters.name === this.user.username) {
        window.location.reload()
      }
      console.log(roleIds)
    },
    // 角色列表中选项发生改变的监听
    handleCheckedChange(value) {
      const { userRoleIds, allRoles } = this
      this.checkAll = userRoleIds.length === allRoles.length && allRoles.length > 0
      this.isIndeterminate = userRoleIds.length > 0 && userRoleIds.length < allRoles.length
    },
    // 全选回调
    handleCheckAllChange(value) {
      this.userRoleIds = value ? this.allRoles.map(item => item.id) : []
      this.isIndeterminate = false
    },
    // 设置角色
    async setRole(row) {
      this.user = row
      this.dialogRoleVisible = true
      const result = await this.$API.username.getRoles(row.id)
      const { allRolesList, assignRoles } = result.data
      this.allRoles = allRolesList
      this.userRoleIds = assignRoles.map(item => item.id)
      this.checkAll = allRolesList.length === assignRoles.length
      this.isIndeterminate = assignRoles.length > 0 && assignRoles.length < allRolesList.length
      console.log(result)
    },
    // 更新用户信息
    updateUser(row) {
      console.log(row)
      this.user = row
      this.dialogFormVisible = true
      console.log(this.user)
    },
    // 批量删除用户
    deleteUsers() {
      this.$confirm('确定是否删除？', '提示', {
        confirmButtonText: '确定',
        confirmButtonClass: '取消',
        type: 'error'
      }).then(async() => {
        const { selectedId } = this
        const result = await this.$API.username.removeUsers(selectedId)
        if (result.code === 20000) {
          this.$message.success('删除成功')
          await this.getUserList()
        }
      }).catch(() => {
      })
    },
    // 选中数据回调
    handleSelectionChange(value) {
      console.log(value)
      this.selectedId = value.map(item => item.id)
    },
    // 删除用户名
    async  deleteUser(row) {
      const result = await this.$API.username.removeById(row.id)
      if (result.code === 20000) {
        this.$message.success('删除成功')
        await this.getUserList()
      }
    },
    // 添加或者修改用户名
    addOrUpdateUser() {
      this.$refs.userForm.validate(async success => {
        if (success) {
          const { user } = this
          const result = await this.$API.username.addOrUpdate(user)
          if (result.code === 20000) {
            this.$message.success('保存成功')
            this.dialogFormVisible = false
            // Object.assign(this._data, this.$options.data())
            this.user = {}
            await this.getUserList(user.id ? this.page : 1)
          }
        }
      })
    },
    // 取消回调
    cancel() {
      this.dialogFormVisible = false
      // Object.assign(this._data, this.$options.data())
      this.user = {}
      this.getUserList()
    },
    // 添加用户
    addUser() {
      this.dialogFormVisible = true
    },
    // 清空搜索
    resetSearch() {
      this.searchObj = {
        username: ''
      }
      this.tempSearchObj = {
        username: ''
      }
      this.getUserList()
    },
    // 根据用户名查找
    search() {
      this.searchObj = { ...this.tempSearchObj }
      this.getUserList()
    },
    // 获取用户列表数据
    async getUserList(pager = 1) {
      this.page = pager
      const { page, limit, searchObj } = this
      this.loading = true
      const result = await this.$API.username.getUser(page, limit, searchObj)
      if (result.code === 20000) {
        this.userData = result.data.items
        this.total = result.data.total
        this.selectedId = []
      }
      this.loading = false
    },
    handleSizeChange(value) {
      this.limit = value
      this.getUserList()
    },
    /*
    * 自定义校验
    * */
    validatePassword(rule, value, callback) {
      if (value.trim() === '') {
        callback('密码不能为空')
      } else if (value.length < 6) {
        callback('密码不能小于6位')
      } else {
        callback()
      }
    },
    validateUserName(rule, value, callback) {
      if (value.trim() === '') {
        callback('用户名不能为空')
      } else {
        callback()
      }
    },
    validateNickName(rule, value, callback) {
      if (value.trim() === '') {
        callback('昵称不能为空')
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
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
