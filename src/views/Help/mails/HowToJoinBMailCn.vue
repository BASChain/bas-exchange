<template>
  <div class="bas-gray-bg">
    <h6 class="help-outline-6">
      一、注册邮箱域名
    </h6>
    <div class="section">
      <p>
        需要注意的是，目前只有根域名能开启邮箱服务，其中只有顶级根域名能对外提供邮箱服务，普通根域名只允许域名所有者注册邮箱
      </p>
      <img src="static/img/domains/apply_domain_endpoint.png" class="img-fluid">

      <h6 class="bas-text-green pt-2 pb-2">
        ##关于域名的类型
      </h6>
      <p>
        顶级根域名：长度为6个字符以内，只允许数字0～9，小写字母a～z
      </p>
      <p>
        普通根域名：长度超过6个字符，或者包含短横线“-”、下划线“_”的根域名
      </p>
      <p>
         二级/多级域名：通过“.”分割的多段域名
      </p>
    </div>
    <h6 class="help-outline-6">
      二、开启邮箱服务
    </h6>
    <div class="section">
      <img src="static/img/domains/open_domain_service.png"  class="img-fluid">
    </div>

    <h6 class="help-outline-6 pt-2">
      三、下载邮箱服务器程序并部署在邮箱服务器上，通过命令行生成密钥对
    </h6>
    <h6 class="help-outline-6">
      四、在“我的钱包>邮箱域名”下面把服务器的IP和公钥注册上去
    </h6>
    <h6 class="help-outline-6">
      五、注册这个域名下面的邮箱，就可以发送邮件了
    </h6>
  </div>
</template>

<script>
export default {
  name:"HowToJoinBMail",
  data() {
    return {

    }
  },
  mounted() {

  },
}
</script>
<style>

</style>
