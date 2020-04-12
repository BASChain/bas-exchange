<template>
  <el-collapse :value="activeName"
    accordion
    class="bas-el-collapse">

    <el-collapse-item title="如何手动安装BAS浏览器插件?"
      name="Issue_How_Install_BasExt_offline"
      class="bas-el-collapse-item">
      <h3 class="text-center">手动安装BAS浏览器(Chrome)插件</h3>
      <div class="bas-issue-section">
        如果你无法透过谷歌扩展商店安装，你可以选择手动下载压缩包方式来安装，这篇教程适用于 Chrome、FireFox。
      </div>
      <div class="bas-issue-section">
        <h5>步骤一、下载安装文件</h5>
        <p>
          点击下方按钮下载 zip 文件，等待下载完成后，将文件解压缩。
        </p>
        <el-button @click="downloadExtHandle" class="bas-btn-primary">
          Download Chrome extensions
        </el-button>
      </div>
      <div class="bas-issue-section">
        <h5>步骤二、打开“扩展程序”页面</h5>
        <p>
         点击 Chrome 浏览器右上角菜单栏，从“更多工具”中打开“扩展程序”。
        </p>
        <img src="static/icons/help_basext_01.png" class="img-fluid">
      </div>
      <div class="bas-issue-section">
        <h5>步骤三、在右上角打开“开发者模式</h5>
        <p>
          点击下方按钮下载 zip 文件，等待下载完成后，将文件解压缩。在右上角找到开发者模式按钮，点击开启
        </p>
        <img src="static/icons/help_basext_02.png" class="img-fluid">
      </div>
      <div class="bas-issue-section">
        <h5>步骤四、安装扩展程序</h5>
        <p>
          在右上角找到开发者模式按钮，点击开启
        </p>
        <img src="static/icons/help_basext_03.png" class="img-fluid">
        <p>将下载的BAS插件.zip直接拖入Chrome插件管理界面安装.</p>
        <img src="static/icons/help_chrome_drop_install.png" class="img-fluid">
        <p>也可以解压(推荐用winrar)插件后,点击左侧“加载以解压的扩展程序”，选择刚才解压缩后的文件夹，点击“选择”，完成安装</p>
        <img src="static/icons/help_basext_04.png" class="img-fluid">
      </div>
    </el-collapse-item>
    <el-collapse-item title="为什么需要Metamask插件?"
      name="Issue_How2"
      class="bas-el-collapse-item">
      <div class="bas-issue-section">
        <h3 class="text-center">为什么需要Metamask插件?</h3>
        <p>
          MetaMask是一款在浏览器上使用的区块链帐户管理插件，该插件不需要独立安装，只需要在谷歌或火狐浏览器添加对应的扩展程序即可，非常轻量级，
          使用起来也非常方便,并且安全.
          <br>
          您所购买的域名都存在您自己的帐户下,未经您的授权,任何人或机构都无法侵吞或通过技术手段占有您私有的域名资产.因此你需要通过Metamask管理您的帐户.
        </p>
        <img src="/static/icons/metamask-account-01.png" class="img-fluid">
      </div>
    </el-collapse-item>

    <el-collapse-item title="如何安装MetaMask并创建账号?"
      name="Issue_How_Install_MetaMask"
      class="bas-el-collapse-item">
      <div class="bas-issue-section pt-3">
        <h3 class="text-center">安装Metamask</h3>
        <p class="pt-2">
          如果您使用的是谷歌(Chrome)浏览器,你可以搜索 "MetaMask" 或点击链接
          <a href="https://metamask.io/" target="metamask" class="bas-link">去官网 https://metamask.io/ </a>
          下载扩展程序,也可以点击下面按钮到浏览器扩展商店下载.
        </p>
      </div>
      <div class="bas-issue-section">
        <span>
          <el-button class="bas-btn-primary">Chrome Extension Download</el-button>
          <el-button class="bas-btn-primary">Firefox Extension Download</el-button>
        </span>
      </div>
      <div class="bas-issue-section pt-3">
        <p style="font-size:18px;font-weight:400;">下面介绍如何安装Metamask</p>
        <li>请在Chrome网页版商店点击 'Add to Chrome' 按钮</li>
        <img src="/static/img/mm-install-store-1.png" alt="Metamask" class="img-fluid">
        <li>将弹出一个窗口，询问是否要添加MetaMask，确认内容后请点击'ADD EXTENSION'。</li>
        <img src="/static/img/mm-install-store-2.png" class="img-fluid">
        <li>完成安装后请点击 'Get Started'。</li>
        <img src="/static/img/mm-createacc-3.png" class="img-fluid">
        <li>您将看到两个选项。为创建新的账户，请点击右侧'Create a Wallet'选项。</li>
        <img src="/static/img/mm-createacc-4.png" class="img-fluid">
        <li>接下来，将会提供帮助改善 MetaMask的选项。这不是必填选项,阅读信息选择完成后请进入下一步骤。</li>
        <img src="/static/img/mm-createacc-5.png" class="img-fluid">
        <li>请设置密码，密码最少为8位数。</li>
        <img src="/static/img/mm-createacc-6.png" class="img-fluid">
        <li>您需要在下一步中确认您的秘密备份短语。请按照顺序点击短语中的单词</li>
        <img src="/static/img/mm-createacc-7.png" class="img-fluid">
        <li>确认秘密备份短语后，创建账户的过程就完成了。阅读内容后请点击 'All Done'。</li>
        <img src="/static/img/mm-createacc-8.png" class="img-fluid">
        <li>创建成功</li>
        <img src="/static/img/mm-createacc-9.png" class="img-fluid">
      </div>
    </el-collapse-item>

    <el-collapse-item title="如何免费在测试网申请域名,并试用体验?"
      name="Issue_How_Test_WF"
      class="bas-el-collapse-item">
      <h3 class="text-center">免费申请域名,并在测试网试用</h3>
      <div class="bas-issue-section">
        <p>试用BAS域名需要以下几项准备工作:</p>
        <ul>
          <li>您需要使用谷歌(Chrome)或火狐(Firefox)浏览器操作本网站(http://www.ppn.one)</li>
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
      <div class="bas-issue-section">
        <h4>接下来注册域名</h4>
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

      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<style>



</style>

<script>
import {ChromeExtensionStore,FirefoxExtensionStore,
  getOfflineExtFile
} from '@/bizlib/apps'
export default {
  name:"HelpIssueNav",
  computed: {
    getActiveName(){
      return this.activeName
    },
    installOfflinePluginTitle(){
      return this.$t('p.HelpPopInstallExtensionOfflineTitle')
    }
  },
  data(){
    return {
      activeName:'Issue_How_Install_BasExt_offline',
      list:[
      ]
    }
  },
  mounted(){

  },
  methods:{
    handleChange(val) {
      console.log(val)
    },
    downloadExtHandle(){
      let url = getOfflineExtFile(BasRuntime.browser)
      window.open(url)
    },
    HowInstallMetaMask(){
      this.activeName="Issue_How_Install_MetaMask"
    },
    HowInstallBasOffline(){
      this.activeName="Issue_How_Install_BasExt_offline"
    }
  }
}
</script>
