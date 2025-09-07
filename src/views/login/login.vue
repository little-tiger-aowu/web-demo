<template>
<div class="flex h-screen bg-gray-100">
  <!-- 左侧登录表单 -->
  <div class="flex-1 p-8 bg-white shadow-lg max-w-2xl">
    <h2 class="text-2xl font-bold mb-8 text-gray-800">用户登录</h2>
    
    <el-card class="login-card">
      <el-form>
        <!-- 登录方式切换 -->
        <div class="flex gap-4 mb-8">
          <button 
            class="px-4 py-2 rounded-lg"
            :class="[activeTab === 'phone' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600']"
            @click="activeTab = 'phone'"
          >
            手机登录
          </button>
          <button
            class="px-4 py-2 rounded-lg"
            :class="[activeTab === 'account' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600']"
            @click="activeTab = 'account'"
          >
            账号密码
          </button>
        </div>

        <!-- 手机登录表单 -->
        <div v-if="activeTab === 'phone'">
          <!-- 原有手机登录表单内容 -->
        </div>

        <!-- 账号密码登录表单 -->
        <div v-if="activeTab === 'account'">
          <!-- 原有账号密码登录表单内容 -->
        </div>

        <el-button
          type="primary"
          class="w-full mt-8"
          size="large"
          :loading="loading"
          @click="handleSubmit"
        >
          立即登录
        </el-button>
      </el-form>
    </el-card>
    
    <div class="mt-4 text-sm text-gray-500 text-center">
      <a href="#" class="text-blue-500 hover:underline">忘记密码？</a>
    </div>
  </div>

  <!-- 右侧二维码登录 -->
  <div class="flex-1 p-8 hidden md:flex items-center justify-center bg-gray-50">
    <!-- 原有二维码登录内容 -->
  </div>
</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('phone')
const form = reactive({
  phone: '',
  code: '',
  username: '',
  password: ''
})

const rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ]
}

const loading = ref(false)
const canGetCode = ref(true)

const handleSubmit = async () => {
  try {
    loading.value = true
    // 这里添加登录逻辑
    ElMessage.success('登录成功')
  } finally {
    loading.value = false
  }
}

const handleGetCode = () => {
  if (!form.phone) {
    ElMessage.warning('请先输入手机号')
    return
  }
  canGetCode.value = false
  // 这里添加获取验证码逻辑
  setTimeout(() => {
    canGetCode.value = true
  }, 60000)
}
</script>

<style scoped>
.login-card {
  width: 400px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

:deep(.el-card__body) {
  padding: 40px;
}

@media (max-width: 768px) {
  .login-card {
    width: 90%;
    margin: 0 auto;
  }
}
</style>