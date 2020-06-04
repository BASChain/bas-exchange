<template>
  <div class=" mail-regist-wrapper">
    <div class="container inner-center-container">
        <div class="row justify-content-center pt-5 pb-5">
          <div class="col-md-5 col-sm-10 mail-content-card">
            <div class="header-logo">
              <img src="/static/icons/logo_header_blk.png" class="img-fluid">
            </div>
            <div class="header-title">
              <h5 class="mail-regist-title">
               {{$t('l.ApplyMailNameLabel')}}
              </h5>
            </div>

            <div class="mail-regist-form-wrapper">
              <el-form label-position="top" label-width="120px" class="mail-regist-form">
                <!-- 输入 -->
                <div class="mail-input-container">
                  <el-form-item class="w-100"
                    show-message="false">
                    <div class="bas-mail-apply">
                      <el-input class="mail-input" v-model="mailName"
                        :placeholder="$t('p.MailRegistInputPlaceholder')"
                        type="text">
                      </el-input>
                      <div slot="suffix" class="mail-domain--suffix-wrapper">
                        <div class="mail-domaintext-show">
                          <span>{{showMailtext}}</span>
                        </div>
                        <div class="mail-toggle-icon" @click="mailPoperToggle">
                          <i class="fa" :class="toggleIconClass"></i>
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                  <div v-if="mailPoper.visible" class="mail-domain--poper">
                    <div class="row row-container">
                      <div v-if="!Boolean(domainMails) || !domainMails.length"
                        style="font-size:14px;padding:.25rem .5rem;">
                        <span >{{$t('p.DomainSearchNoResultTip')}}</span>
                      </div>
                      <div v-for="(m,index) in domainMails"
                        @click="SelectedMailDomainHandle(m.domaintext,m.hash)"
                        :key="index"
                        class="bas-col-20">
                          <p class="mailtext">{{'@'+m.domaintext}}</p>
                      </div>
                    </div>
                    <hr />
                    <!-- mail domain footbar -->
                    <div class="mail-domain--poper-footbar">
                      <el-input
                        v-model="mailPoper.filterkey"
                        :placeholder="$t('p.MailPublicFilterKeyTips')"
                        :disabled="mailPoper.loading"

                        class="sub-filter-input">
                          <div slot="suffix" class="mail-search">
                             <i class="fa fa-search" ></i>
                          </div>
                      </el-input>
                      <el-button
                        :disabled="mailPoper.loading"
                        @click="reloadMailAssets"
                        type="default" class="border-right">
                        刷新
                      </el-button>
                      <div></div>
                      <el-button
                        @click="hideMailAssetPoper"
                        type="default">
                        {{$t('l.ChevronUp')}}
                      </el-button>
                    </div>

                  </div>
                  <div class="mailname-wrapper"
                    :class="Boolean(inputctrl.message) ? 'bas-warn-box' : 'bas-grass-box'"
                    v-if="Boolean(inputctrl.message) || Boolean(mailName)">
                    <div>
                      {{
                        inputctrl.message ? inputctrl.message : $t('p.MailRegistNameWarnTip')
                      }}
                    </div>
                  </div>
                </div>
                <!-- 别名 -->
                <el-form-item :label="$t('l.MailAlias')">
                  <el-input v-model="mailAlias"
                    :placeholder="$t('p.MailRegistAliasPlaceholder')"
                    class="mail-alias">
                  </el-input>
                </el-form-item>
                <!-- 购买期限 -->
                <div>
                <!-- <el-form-item :label="$t('l.PurchaseYears')" > -->
                  <div class="bas-label2">{{$t('l.PurchaseYears')}}</div>
                  <div class="years-select-container">
                    <div v-for="idx in maxMailRegYears"
                      :key="idx"
                      class="mail-year-selector">
                      <div class="year-inner-box"
                        @click="selectYearsHandle(idx)"
                        :class="idx == years ? 'year-active' : ''">
                        <div v-if="idx == years">
                          <div class="year-active-icon">
                          </div>
                        </div>
                        <div class="bas-total">
                          {{(idx)* parseFloat(unitBas)}}
                        </div>
                        <div class="mail-years">
                          <span>{{idx}}</span>
                          <span>{{idx===1 ?$t('l.Year') : $t('l.Years')}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                <!-- </el-form-item> -->
                </div>
              </el-form>
            </div>

            <div class="mail-regist-btns">
              <el-button type="primary"
                @click="submitMailName"
                class="bas-btn-primary w-100">
                {{$t('l.RegistBtn')}}
              </el-button>
            </div>
          </div>
        </div>
    </div>
    <div class="row">
      <div style="height:1.5rem;"></div>
    </div>
  </div>
</template>

<style>
hr {
  width: 96%;
  margin: 8px 2px 7px 7px;
  color: rgba(235,237,237,1);
}
.border-right {
  border-right: solid #EBEDED 1px;
}
.mail-search > i {
  margin-top: 8px;
}
.mail-search {
  height: 100%;
  width: 35px;
  margin-right: 4px;
}
.bas-mail-apply,
.mail-alias {
  display: flex;
  width: 100%;
  height: 50px;
  background:rgba(245,246,246,1);
  border-radius: 4px;
  border:1px solid rgba(225,229,229,0.5);
}
.mail-regist-btns {
  margin-top: 24px;
}
.el-form-item__content {
  height: 50px;
}
.bas-label2 {
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:50px;
  padding-bottom: 0px !important;
}

.mailname-wrapper {
  margin: .5rem auto;
  padding: .5rem .75rem;
  width: 100%;
  border-radius:4px;
}

.mailname-wrapper div {
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  line-height:20px;
}

.mail-domain--suffix-wrapper {
  position: relative;
  width: 26%;
  height: 50px;
  display: inline-flex;
  direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
  border-left: 1px solid rgba(225,229,229,0.5);
}
.mail-input {
  width: 74%;
}
.mail-alias > .el-input__inner,
.mail-input > .el-input__inner {
  width: 100%;
  height: 100%;
  background:rgba(245,246,246,1);
  border: 0px;
  padding-left: 10px;
  font-size:16px;
  font-family:PingFangSC-Light,PingFang SC;
  font-weight:300;
  /* color:rgba(4,6,46,1); */
}
.mail-domaintext-show {
  margin-right: .25rem;
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:25px;
}
.mail-input i.fa{
  cursor: pointer;
  color:rgba(4,6,46,.75);
  font-size:16px;
  font-weight: 500;
}

.mail-input input.el-input__inner {
  color:rgba(4,6,46,.75);

  font-size:16px;
}
.mail-domain--poper-footbar > .el-input.is-active, .el-input__inner, .el-input__inner:focus {
  border: 0;
}
.mail-domain--poper-footbar > .el-button:focus,
.mail-domain--poper-footbar > .el-button:hover {
  color: #00CA9B;
  border-color: rgba(0,202,155,0.1);
  background-color: rgba(0,202,155,0.1);
}
.mail-domain--poper-footbar > .el-input--suffix .el-input__inner {
  height: 31px;
  margin-left: 7px;
  width: 95%;
  background:rgba(245,246,246,1);
}
.mail-domain--poper-footbar > .el-button {
  height: 31px;
  margin-right: 2px;
  margin-left: 2px;
  padding: 0px 10px;

  border: 0px;
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(150,150,166,1);
  line-height:22px;
  /* background:rgba(0,202,155,0.1); */
  border-radius:2px;
  /* opacity:0.1; */
}
.mail-regist-form input.el-input__inner {
  height: 100%;
  caret-color: rgba(0,202,155,1);
}
.bas-mail-apply:hover,
.bas-mail-apply:focus,
.mail-alias:hover,
.mail-alias:focus{
  border: 1px solid rgba(0,202,155,1);
}
.mail-alias > .el-input__inner:focus,
.mail-alias > .el-input__inner:hover {
  border: 0px;
}

.mail-input input.el-input__inner::-webkit-input-placeholder,
.mail-input input.el-input__inner::-moz-placeholder,
.mail-input input.el-input__inner:-ms-input-placeholder {
  font-size: 14px;
}

.el-form-item {
  margin-bottom: 0px;
}
.mail-domain--poper {
  /* position: absolute;
  float: right; */
  width: 100%;
  /* top:42px; */
  /* left: 50%;
  transform: translateX(-50%); */
  z-index: 9999;
  background: #fff;
  border-collapse:collapse;
  color:rgba(4,6,46,1);
  box-shadow: 0 1px 14px 0 rgba(0,0,0,.1);
  box-sizing: border-box;
  transition:ease-in-out .3s;
}

.row-container {
  margin: 0;
  max-height: 202px;
  min-height: 32px;
  overflow-x: hidden;
  overflow-y: auto;
}
.mail-domain--poper-footbar > .sub-filter-input {
  width: 72%;
}

.sub-filter-input span.el-input__suffix div {
  cursor: pointer;
  line-height: 28px;
}

.mail-domain--poper div.bas-col-20 {
  cursor: pointer;
  width: 20%;
  height: 50px;
  /* margin-right:-1px; */
  margin-bottom:-1px;
  background:rgba(255,255,255,1);
  text-align: center;
  transition:ease-in-out .2s;
  font-weight: 400;
}

.mail-domain--poper div.bas-col-20 > p:hover {
  color: rgba(255,255,255,1);
  background: rgba(0,202,155,1);
}

.bas-col-20 > p {
  border: 1px solid rgba(235,237,237,1);
  height: 35px;
  border-radius: 4px;
  width: 85%;
  text-align: center;
  line-height: 35px;
  margin: 10px 0px 0px 8px
}
.mail-domain--poper-footbar {
  width: 100%;
  height: 35px;
  display: inline-flex;
  justify-content: space-between;
  border-collapse:collapse;
  margin: 1px;
  padding-right: 4px;
}
</style>
<script>
import {
  dateFormat,  wei2Bas,
  handleDomain,toUnicodeDomain,
} from '@/utils'

import {validPrevRegistMail} from '@/web3-lib/apis/mail-manager-api'
import {
  PARAM_ILLEGAL,USER_REJECTED_REQUEST,UNSUPPORT_NETWORK ,
  DOMAIN_NOT_EXIST,MAILSERVICE_INACTIVED,MAIL_REGIST_BY_OWNER,
  MAIL_HASH_EXIST,MAIL_YEAR_OVER_MAX,LACK_OF_TOKEN
}from '@/web3-lib/api-errors'

import {findMailInfo} from '@/web3-lib/apis/view-api'

export default {
  name:"MailRegistIndex",
  components:{},
  computed: {
    toggleIconClass(){
      return this.mailPoper.visible ? 'fa-chevron-up' : 'fa-chevron-down'
    },
    showMailtext(){
      if(this.mailDomainHash === ''|| this.mailDomainText === null) return ''
      return `@${this.mailDomainText}`
    },
    showErrors(){
      return Boolean(this.inputctrl.message)
    },
    domainMails(){
      const key = this.mailPoper.filterkey
      return key ? this.mailassets.filter(m => m.domaintext.includes(key.trim())) : this.mailassets
    },
    ...Vuex.mapState({
      unitBas:state => wei2Bas(state.dapp.mailRegGas || 2),
      maxMailRegYears:state => state.dapp.maxMailRegYears,
      mailassets:state => state.dapp.mailassets ? state.dapp.mailassets : [],
    })
  },
  data() {
    return {
      years:1,
      mailDomainText:'',
      mailDomainHash:'',
      mailName:'',
      mailAlias:'',
      mailPoper:{
        visible:false,
        loading:false,
        filterkey:''
      },
      inputctrl:{
        message:''
      },
      ctrl:{
        loading:false,
        timeoutId:null
      }
    }
  },
  methods: {
    selectYearsHandle(years){
      console.log('<>>>>>',years)
      this.years = years <=0 || years > this.maxMailRegYears ? this.maxMailRegYears : years
    },
    mailPoperToggle(){
      this.mailPoper.visible = !this.mailPoper.visible
    },
    async reloadMailAssets(){
      this.mailPoper.loading = true
      await  this.$store.dispatch('dapp/loadPublicMailDomains')
      this.mailPoper.loading = false
    },
    hideMailAssetPoper(){
      this.mailPoper.visible = false
    },
    SelectedMailDomainHandle(text,hash){
      this.mailDomainText = text
      this.mailDomainHash = hash
      this.mailPoper.visible = false
    },
    async loadPublicMailDomainOnMount(){
      const mailassets = this.$store.state.dapp.mailassets

      if(mailassets && mailassets.length){
        this.mailDomainText = mailassets[0].domaintext
        this.mailDomainHash = mailassets[0].hash
      }
    },
    async submitMailName(){
      if(this.inputctrl.message) return
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const domaintext = this.mailDomainText
      const domainhash = this.mailDomainHash
      const mailName =this.mailName
      const mailAlias = this.mailAlias


      let msg =''
      if(mailName === ''|| !mailName.trim().length || !domainhash){
        msg = this.$t('code.888888',{text:this.$t('l.ApplyMailNameLabel')})
        this.$message(this.$basTip.error(msg))
        return;
      }

      const years = this.years

      console.log(domaintext,domainhash,mailName,years)
      try{
        this.ctrl.loading = true
        /**
         * return :{domaintext,mailalias,years,chainId,wallet,domainhash,mailhash,costwei,basbal,}
         */
        const commitData = await validPrevRegistMail(domainhash,mailName,years,chainId,wallet)
        console.log(commitData)
        this.ctrl.loading = false

        // route commit page
        //const mailalias = commitData.mailalias
        commitData.mailalias = mailAlias
        const mailhash = commitData.mailhash
        this.$router.push({
          path:`/mail/registing/${domaintext}/${years}/${mailName}`,
          name:"mail.registing",
          params:{
            domaintext,
            years,
            mailname:mailName,
            commitData:commitData
          }
        })

      }catch(ex){
        this.ctrl.loading = false
        switch (ex) {
          case UNSUPPORT_NETWORK:
          case LACK_OF_TOKEN:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return
          case MAIL_HASH_EXIST:
            msg = this.$t(`code.${ex}`,{mailname:mailName})
            this.$message(this.$basTip.error(msg))
            return;
          case MAIL_REGIST_BY_OWNER:
            msg = this.$t(`code.${ex}`,{domaintext})
            this.$message(this.$basTip.error(msg))
            return;
          case PARAM_ILLEGAL:
          case MAILSERVICE_INACTIVED:
          case DOMAIN_NOT_EXIST:
          case MAIL_YEAR_OVER_MAX:
          case PARAM_ILLEGAL:
            console.log('Coding Logic Error:',ex)
            return
          default:
            break;
        }
        if(ex.code === USER_REJECTED_REQUEST){
          msg = this.$t(`code.${ex}`)
          this.$message(this.$basTip.error(msg))
          return;
        }
        console.error("Unknown Error:",ex)
      }
    },
    async validExist(fulltext){

    }

  },
  async beforeMount() {
    await this.$store.dispatch('dapp/fillPublicMailDomains')//
    const mailassets = this.$store.state.dapp.mailassets

    if(mailassets && mailassets.length){
      this.mailDomainText = mailassets[0].domaintext
      this.mailDomainHash = mailassets[0].hash
    }
  },
  async mounted() {

    //load public mail assets

    setTimeout(async () => {
      console.log("pull open mails")
      this.loadPublicMailDomainOnMount()
    }, 1000);
  },
  watch: {
    mailName:function(val,old){
      if(val !=='' && val !== old){
        const fulltext = `${val.trim()}@${this.mailDomainText}`
        const chainId = this.$store.getters["web3State"].chainId
        console.log(fulltext)
        if(this.ctrl.timeoutId){
          clearTimeout(this.ctrl.timeoutId)
        }
        const that = this;
        this.ctrl.timeoutId = setTimeout(async () => {
          console.log("TimeoutId:",that.ctrl.timeoutId,fulltext)
          try{
            const resp = await findMailInfo(fulltext,chainId)
            if(resp.state){
              console.log(resp.mail)
              that.inputctrl.message = that.$t(`code.${MAIL_HASH_EXIST}`,{mailname:fulltext})
            }else{
              that.inputctrl.message = ''
            }
          }catch(ex){
            console.log('lazy valid',ex)
            that.inputctrl.message = ''
          }
        }, 1500);
      }else{
        this.inputctrl.message = ''
      }
    },
    mailDomainText:function(val,old){
      const mailtext = this.mailName
      if(val !=='' && val !== old && mailtext !== ''){
        const fulltext = `${mailtext.trim()}@${val}`
        const chainId = this.$store.getters["web3State"].chainId
        console.log(fulltext)
        if(this.ctrl.timeoutId){
          clearTimeout(this.ctrl.timeoutId)
        }
        const that = this;
        this.ctrl.timeoutId = setTimeout(async () => {
          console.log("TimeoutId:",that.ctrl.timeoutId,fulltext)
          try{
            const resp = await findMailInfo(fulltext,chainId)
            if(resp.state){
              console.log(resp.mail)
              that.inputctrl.message = that.$t(`code.${MAIL_HASH_EXIST}`,{mailname:fulltext})
            }else{
              that.inputctrl.message = ''
            }
          }catch(ex){
            console.log('lazy valid',ex)
            that.inputctrl.message = ''
          }
        }, 1000);
      }else{
        this.inputctrl.message = ''
      }
    },
    mailassets:function(mails,olds) {
      if(mails && mails.length){
        this.mailDomainText = mails[0].domaintext
        this.mailDomainHash = mails[0].hash
      }
    }
  },
}
</script>
<style>
.el-input.is-active .el-input__inner, .el-input__inner:focus {
  border-color: rgba(4, 6, 46, 0.35);
  border-top-color: rgba(4, 6, 46, 0.35);
  border-right-color: rgba(4, 6, 46, 0.35);
  border-bottom-color: rgba(4, 6, 46, 0.35);
  border-left-color: rgba(4, 6, 46, 0.35);
}
.mail-regist-wrapper {
  background-color: rgba(255,255,255,1);
  min-height: calc( 100vh - 425px);
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  direction: column;
}

.mail-content-card {
  display: inline-flexbox;
  direction: column;
  justify-content: flex-start;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  align-items: stretch;
  border-radius:4px;
  border:2px solid rgba(225,229,229,1);
}

.mail-content-card>div {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

.mail-regist-title {
  line-height: 30px;
  font-size: 22px;
  margin: 1.5rem auto;
  width: 100%;
  text-align: left;
}

.years-select-container {
  width: 100%;
  display: inline-flex;
  direction: row;
  justify-content: flex-start;
  align-items: center;
}

.mail-year-selector div.bas-total {
  font-size:20px;
  font-family:Lato-Semibold,Lato;
  font-weight:600;
  color:rgba(4,6,46,1);
  line-height:24px;
  letter-spacing:1px;
}

.mail-year-selector div.bas-total::after{
  content:'BAS';
  font-size: 14px;
  margin-left: -.4rem;
}

.mail-years {
  font-size:1rem;
}

.mail-year-selector .year-active div.bas-total{
  color:#fff;
}

.years-select-container div.mail-year-selector{
  width: 25%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  /* padding: 4px; */
  margin-right: 8px;
}

.year-inner-box {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 62px;
  padding: 7px;
  display: inline-flexbox;
  justify-content: center;
  align-items: center;
  color:rgba(4,6,46,1);
  background:rgba(245,246,246,1);
  border-radius:4px;
  border:1px solid rgba(245,246,246,1);
}

.year-active-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  float:right;
  top: 0px;
  right: 0px;
  background: url('./assets/years-select.png') no-repeat;
  background-size: 100% 100%;
  z-index: 99;
}

.years-select-container div.year-active {
  color:#fff;
  background:rgba(0,202,155,1);
  border-radius:4px;
  border:1px solid rgba(245,246,246,1);
}

.years-select-container div.year-active:focus ,.years-select-container div.year-active:hover{
  opacity: .85;
}

.year-inner-box>div{
  width: 100%;
  text-align: center;
}
</style>
