<template>
  <div class="bas-gray-bg bas-mobil-mail">
    <h6 class="help-outline-6">
      一、创建账号
    </h6>
    <div class="section">
      <img src="static/img/mails/mobile_mail/create_account.png">
    </div>
    <h6 class="help-outline-6">
      二、输入密码
    </h6>
    <div class="section">
      <img src="static/img/mails/mobile_mail/intput_password.png">
    </div>
    <h6 class="help-outline-6">
      三、复制邮箱客户端公钥地址
    </h6>
    <div class="section">
      <img src="static/img/mails/mobile_mail/copy_address.png">
    </div>
    <h6 class="help-outline-6">
      四、打开BAS官网: 我的钱包->我的邮箱->修改，粘贴公钥地址
    </h6>
    <div class="section">
      <img src="static/img/mails/mobile_mail/copy_to_bas.png" class="bas-pc-mail">
    </div>
    <p>如果没有邮箱，请查看
			<!-- <router-link :to="{name:'help.dmail', query:{activeId:'GetBMailAccount'}}"> -->
        <span class="bas-jump" @click="openGetMail">如何注册邮箱</span>
      <!-- </router-link> -->
		</p>
    <h6 class="help-outline-6">
      五、输入邮箱账号
    </h6>
    <div class="section">
      <img src="static/img/mails/mobile_mail/input_mail_account.png">
    </div>
    <h6 class="help-outline-6">
      六、保存邮箱二维码或密文
    </h6>
    <div class="section" id="bas_row_img">
      <img src="static/img/mails/mobile_mail/save_qr.png">
      <img src="static/img/mails/mobile_mail/copy_cipher.png">
    </div>
    <h6 class="help-outline-6">
      七、成功生成客户端账号
    </h6>
    <div class="section">
      <img src="static/img/mails/mobile_mail/mail_success.png">
    </div>
  </div>
</template>

<script>
export default {
  name:"CreateMobilBMail",
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
		openGetMail() {
			let isActive = true
			this.$emit('toGetMail', isActive)
		}
  }
}
</script>
<style scoped>
.bas-jump {
	color: #00CA9B;
}
#bas_row_img {
	display: flex;
}
#bas_row_img > img {
	margin-right: 20px;
}
.bas-pc-mail {
	max-width: 92%;
}
img {
	max-width: 40%;
}
h6 {
	margin: 15px 0px;
}
.help-domain-wrapper p {
	text-align: left;
	margin: 15px 0px;
	font-size: 15px;
}
</style>
