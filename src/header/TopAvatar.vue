<template>
  <div>
    <div v-if="unconnected" @click="login"
      class="bas-avatar-btn">
      <span>Login</span>
    </div>
    <div v-if="hasConnected">
    <el-dropdown trigger="click"
      placement="bottom-start"
      @command="handleCommand"
      size="medium">
      <div class="bas-avatar-btn">
        <span >{{  showNetwork }}</span>
      </div>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item command="connectMetaMask">
          <span v-if="hasConnected" class="bas-avatar-btn-hash">
            当前:{{ network }}
          </span>
          <span v-if="unconnected">
            <i class="fa fa-chain"></i>
            Connect MetaMask
          </span>
        </el-dropdown-item>
        <el-dropdown-item command="myWallet"
          :disabled="supportNetwork"
          divided>
          我的钱包
        </el-dropdown-item>
        <el-dropdown-item :disabled="supportNetwork"
          command="changeNetwork">
          {{ showChangeNetwork }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </div>


</template>
<style>
.bas-avatar-btn {
  cursor: pointer;
  display: inline-flex;
  margin: auto 2.5rem auto 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  font-size: .85rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: rgba(0,202,155,.85);
}

.bas-avatar-btn-hash {
  width: 80px !important;
  word-break: break-all !important;
  font-size: 14px !important;
}
</style>
<script>
export default {
  name:"TopAvatar",
  data() {
    return {
      wallet:'',
      network:''
    }
  },
  computed:{
    hasConnected(){
      return this.network !='' && this.wallet !='';
    },
    unconnected() {
      return this.network =='' || this.wallet =='';
    },
    getHashClass(){
      return this.wallet != '' ? 'bas-avatar-btn-hash' :'';
    },
    showNetwork(){
      if(!this.wallet || !this.network){
        return 'Login'
      }else {
        return this.network.charAt(0).toLocaleUpperCase()
      }
    },
    supportNetwork(){
      return !(this.network == 'mainnet' || this.network == 'ropsten');
    },
    showChangeNetwork(){
      return this.network == 'mainnet' ? "Change to Ropsten" : "Change to Mainnet"
    }
  },
  methods:{
    showDowndrop(){
      return false;
    },
    handleCommand(cmd){
      switch(cmd){
        case 'connectMetaMask':
          this.login();
          break;
        case 'myWallet':
          if(this.hasConnected){
            this.gotoWalletInfo(this.wallet)
          }else{
            alert('please connect MetaMask First!')
          }
          break;
        case 'changeNetwork':
            this.changeNetwork()
            break;
        default:
          break;
      }
      return false;
      console.log('>>>>>>>COMMAND>>>>>>',cmd)
    },

    changeNetwork(){
      if(this.network == 'ropsten'){
        this.network = 'mainnet'
      }else if(this.network=='mainnet'){
        this.network = 'ropsten'
      }else {
        this.network = 'ropsten'
      }
    },
    login(){
      if(this.network && this.wallet)return;
      //connect MetaMask
      this.wallet = '0x08970FEd061E7747CD9a38d680A601510CB659FB'
      this.network = 'ropsten'
    },
    logout(){
      this.wallet = ''
    },
    gotoWalletInfo(wallet){
      this.$router.push({
        name:'user.layout',
        params:{
          wallet:wallet
        }
      })
    }
  }
}
</script>

