<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon name="cross" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="moblie"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxLength="11"
      >
        <!-- 添加自己的字体图标 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxLength="6"
      >
        <!-- 添加自己的字体图标 -->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            type="default"
            class="send-sms-btn"
            round
            size="small"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 表单的验证规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3578]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      // 倒计时的显示与隐藏
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 表单提交函数
    async onSubmit() {
      // 1、获取表单数据
      // const user = this.user
      // 2、进行表单验证
      // 3、向后台发送登录的请求
      // 在组件中必须通过 this.$toast 来调用 toast 组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认是2000，为0 则持续展示
      })
      try {
        const res = await login(this.user)
        console.log(res)
        // 4、登录成功，存储token，跳转页面
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')

        // 登录成功，退回原页面（不严谨）
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    // 发送验证码
    async onSendSms() {
      // 1、校验手机号
      try {
        await this.$refs.loginForm.validate('moblie')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2、验证通过，显示倒计时组件
      this.isCountDownShow = true
      // 3、请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
