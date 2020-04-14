<template>
  <div>
    <div class="bas-issue-section">
      <h5 class="text-center">为什么需要Metamask插件?</h5>
      <div class="bas-issue-section">
        <p>
          MetaMask是一款在浏览器上使用的区块链帐户管理插件，该插件不需要独立安装，只需要在谷歌或火狐浏览器添加对应的扩展程序即可，非常轻量级，
          使用起来也非常方便,并且安全.
          <br>
          您所购买的域名都存在您自己的帐户下,未经您的授权,任何人或机构都无法侵吞或通过技术手段占有您私有的域名资产.因此你需要通过Metamask管理您的帐户.
        </p>
        <img src="/static/icons/metamask-account-01.png" class="img-fluid">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {ChromeExtensionStore,FirefoxExtensionStore,
  getOfflineExtFile
} from '@/bizlib/apps'
export default {
  name:"PopluarQuestInner2",
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
