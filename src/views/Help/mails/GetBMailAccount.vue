<template>
  <div>
    <h6 class="help-outline-6">
      一、点击邮箱注册，选择想要注册的根域名
    </h6>
    <div class="section">
      <img src="static/img/mails/apply_mail_account.png"  class="img-fluid">
    </div>
    <h6 class="help-outline-6">
      二、输入邮箱名称和别名，注册邮箱
    </h6>
    <div class="section">
      <img src="static/img/mails/apply_mail_inpput_alias.png"  class="img-fluid">
    </div>
    <h6 class="help-outline-6">
      三、下载安装邮箱（iOS/Android）客户端，生成邮箱公钥
    </h6>
    <div class="section">
      <p>
        客户端安装可通过网站下载链接扫描二维码，或在app store中下载
      </p>
      <img src="static/img/mails/footer_download_bmail.png"  class="img-fluid">
    </div>
    <h6 class="help-outline-6">
      四、在“我的钱包->我的邮箱”中点击去配置绑定客户端生成的邮箱公钥
    </h6>
    <div class="section">
      <p>
        由于“我的邮箱"中不显示邮箱名称，取而代之的显示别名或者邮箱的Hash，请注意绑定到正确的邮箱上
      </p>
      <img src="static/img/domains/open_domain_service.png"  class="img-fluid">
      <img src="static/img/mails/update_mail_publickey.png"  class="img-fluid">
    </div>
    <p>
      完成以上操作即可使用邮箱客户端发送邮件了
    </p>
  </div>
</template>

<script>
export default {
  name:"GetBMailAccount"
}
</script>
<style>

</style>
