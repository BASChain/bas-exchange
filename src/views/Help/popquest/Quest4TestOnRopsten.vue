<template>
  <div>
    <h4 class="text-center">
      {{$t('p.HelpPopHowTestOnRopstenTitle')}}
    </h4>
    <div class="bas-issue-section">
      <p>{{$t('p.HelpQuest4UsedBASDescP1')}}</p>
      <ul>
        <li>您需要使用谷歌(Chrome)或火狐(Firefox)浏览器操作本网站(http://www.baschain.org)</li>
        <li>您需要在浏览器上安装MetaMask扩展程序,通过MetaMask来注册并管理您的域名资产</li>
        <li>安装BAS浏览器插件或BAS浏览器,体验域名映射服务</li>
      </ul>
    </div>
    <h4>下面分步骤操作:</h4>
    <div class="bas-issue-section">
      <h5>安装Metamask</h5>
      <p>
        参见上面:如何安装MetaMask并创建账号?
        <!-- <a class="bas-link" @click="activeHowInstallMetaMask">参见:如何安装MetaMask并创建账号?</a> -->
      </p>

      <h5>安装BAS插件</h5>
      <p>
        参见上面:手动安装BAS浏览器(Chrome)插件
        <!-- <a class="bas-link" @click="HowInstallBasOffline">参见:手动安装BAS浏览器(Chrome)插件</a> -->
      </p>
    </div>
    <!-- <div class="bas-issue-section">
      <h5>接下来注册域名</h5>
      <p>在域名申请菜单下,查询你想要注册的域名,确认是否已经被注册:</p>
      <img src="/static/img/bas_test_wf_01.png" class="img-fluid">
      <p>选择购买期限,点击注册</p>
      <img src="/static/img/bas_test_wf_02.png" class="img-fluid">
      <p>
        此时会弹出MetaMask授权交易窗口,点击确认后,出现正在授权信息
        <span class="text-danger">,注意此时不要关闭或刷新页面,否则注册取消</span>
      </p>
      <img src="/static/img/bas_test_wf_03.png" class="img-fluid">
      <p>
        授权成功后,再次弹出MetaMask确认交易界面,此时点击确认,提交域名到BAS链上.
      </p>
      <img src="/static/img/bas_test_wf_04.png" class="img-fluid">
      <p>当注册信息显示已成功时,代表此域名已经成为你的个人域名资产,在
        [
        <a class="bas-link" @click="goWallet">我的钱包</a>
        ]
        里可以查看与管理.
      </p>
      <img src="/static/img/bas_test_wf_05.png" class="img-fluid">
      <p>接下来将您已经部署的网站或服务IP地址配置到此上域名</p>
      <img src="/static/img/bas_test_wf_06.png" class="img-fluid">
      <p>
        配置完成后,您就可以通过已安装BAS插件的浏览器(Chrome ,Firefox)或BAS浏览器在地址栏输入:
        <a class="bas-link">
          <span style="font-weight:600;"> httpb</span>://ai.cn
        </a>
        访问你的网站后服务.
      </p>
      <img src="/static/img/bas_dl_ext1.png" class="img-fluid">
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {ChromeExtensionStore,FirefoxExtensionStore,
  getOfflineExtFile
} from '@/bizlib/apps'
export default {
  name:"PopluarQuestInner4",
  computed: {
    ...mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  methods: {

  },
}
</script>
<style>

</style>
