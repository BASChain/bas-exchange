<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-9 pt-2">
        <div class="nav-breadcrumbs" @click="goback">
          <span class="breadcrumbs"><span>{{$t('l.GoBackPrevPage')}}</span></span>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-3">
      <div class="col-9 mail-box-wrapper ">
        <div class="inner-box">
          <div class="mail-info--base">
            <div class="mail-info-primary">
              <label>{{$t('l.MailLabel')}}</label> <span>{{fulltext}}</span>
            </div>
            <div class="bas-hash-container">
              <div>
                <label class="bas-info-label" >
                  {{$t('l.MailHashLabel')}}
                </label>
              </div>

              <el-input type="textarea" :disabled="true"
                class="bas-hash-show"
                v-model="mailInfo.hash" autosize>
              </el-input>

              <!-- <el-tooltip class="item" effect="light" :content="mailInfo.hash" placement="right">
                <span class="mail-info-text">
                  {{shortHash}}
                </span>
              </el-tooltip> -->

            </div>
            <div>
              <label class="bas-info-label"> {{$t('l.Domain')}}</label>
              <a @click="gotoDomainDetail"
               class="mail-info-text bas-link">{{mailInfo.domaintext}}</a>
            </div>
            <div>
              <label  class="bas-info-label">{{$t('l.ExpiredDate')}}</label>
              <span class="mail-info-text">{{expirationDate}}</span>
            </div>
          </div>
          <div class="mail-conf-nav">
            <label class="conf-label">{{$t('l.ConfigurationLabel')}}</label>
            <span v-if="!ctrl.editEnabled && Boolean(mailInfo.hash)"
              class="breadcrumbs" @click="enableEditConf">
              <i class="fa fa-edit"></i>
              <span>{{$t('l.UpdateTagLabel')}}</span>
            </span>
          </div>

          <el-form label-width="120px" class="mail-conf-container">
            <el-form-item :label="$t('l.MailAliasLabel')">
              <el-input  :disabled="!ctrl.editEnabled && !ctrl.loading"
                type="text"
                :placeholder="$t('l.RefNoDataPlaceholder')"
                v-model="mailInfo.aliasName">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('l.BMailBCALabel')">
              <!-- <div v-if="!ctrl.editEnabled" class="">
                {{ refdata.MXBCA ? refdata.MXBCA : $t('l.RefNoDataPlaceholder')}}
              </div> -->
              <el-input v-if="!ctrl.editEnabled && !ctrl.loading" disabled="true"
                type="textarea" autosize="{minRows:1,maxRows:5}"
                :placeholder="$t('l.RefNoDataPlaceholder')"
                v-model="mailInfo.bca">
              </el-input>

              <el-input v-if="ctrl.editEnabled || ctrl.loading"
                type="textarea" autosize="{minRows:2,maxRows:5}"
                :placeholder="$t('l.RefNoDataPlaceholder')"
                v-model="mailInfo.bca">
              </el-input>
            </el-form-item>

            <el-form-item v-if="ctrl.editEnabled">
              <el-button type="primary" class="bas-w-68 bas-btn-primary"
                :disabled="ctrl.loading"
                @click="SubmitMailConfig">
                <div style="position:relative;">
                  <LoadingDot v-if="ctrl.loading"/>
                </div>
                {{ ctrl.loading ? $t('l.Transactioning')  : $t('g.Confirm')}}
              </el-button>
              <el-button type="default" class="w-25"
                :disabled="ctrl.loading"
                @click="disableEditConf">
                {{$t('g.Cancel')}}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <el-dialog  width="25%"
      :close-on-click-modal="false"
      :show-close="false"
      :visible.sync="maskDialog.visible">
      <div slot="title" >
        <span style="margin-left:10px;">
          {{$t('p.MailUpdateConfigDialog',{text:fulltext})}}
        </span>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-10 text-center">
            <h5>
              {{maskDialog.loading ?  $t('l.TransactionTip') : $t('p.MailUpdateConfigContirmTip')}}
            </h5>
          </div>
        </div>
      </div>
      <div class="dialog-footer" slot="footer">
        <el-button size="mini" :disabled="maskDialog.loading"
          @click="CancelConfirm">
          {{  $t('g.Cancel') }}
        </el-button>
        <el-button type="primary" class="bas-btn-primary"
          size="mini" :disabled="maskDialog.loading"
          @click="SubmitMailConfig">
          {{ $t('g.Confirm') }}
        </el-button>
        <loading-dot v-if="maskDialog.loading" style="float:left;"/>
      </div>
    </el-dialog>
  </div>

</template>
<style lang="css">
.bas-hash-container {
  width: 100%;
  display: inline-flex;
  align-items: center;
}

.bas-hash-container label.bas-info-label {
  width:108px;
}


.bas-hash-container div.bas-hash-show {
  width: calc( 100% - 108px );
}
.bas-hash-show textarea.el-textarea__inner{
  font-weight: 400;
  color: rgba(4,6,46,1) !important;
  background: transparent;
  border: none;
  cursor: none;
}

.bas-hash-show textarea.el-textarea__inner:hover{
  cursor: text;
}

</style>

<script>
import {
  PARAM_ILLEGAL,UNSUPPORT_NETWORK,USER_REJECTED_REQUEST,
  MAIL_HASH_INVALID,ACCOUNT_NOT_MATCHED,MAIL_HASH_EXPIRED
} from '@/web3-lib/api-errors'

import { dateFormat,isOwner,compressAddr } from '@/utils'
import {
  dataShowDelimiter,
  str2ConfDatas,
  confDatas2Str,
} from '@/web3-lib/utils'

import {
  validIPv4,
  assertEmpty,
  assertEmptyOrNotHex,
  assertNotBCA,
} from '@/utils/refdata-utils.js'

import {updateMailInfo} from '@/web3-lib/apis/mail-manager-api'
import {getMailInfo} from '@/web3-lib/apis/view-api'

import LoadingDot from '@/components/LoadingDot.vue'
export default {
  name:"MailDetailInfo",
  components:{
    LoadingDot
  },
  computed: {
    fulltext(){
      const aliasName = this.mailInfo.aliasName
      const hash = this.mailInfo.hash
      const hashName = compressAddr(hash)
      const domaintext = this.mailInfo.domaintext ||''
      return aliasName ? `${aliasName}` : `${hashName}`
    },
    shortHash(){
      return this.mailInfo.hash ? compressAddr(this.mailInfo.hash) : this.mailInfo.hash
    },
    expirationDate(){
      if(!this.mailInfo.expiration) return ''
      return dateFormat(this.mailInfo.expiration)
    }
  },
  data() {
    return {
      mailInfo:{
        hash:'',
        domainhash:'',
        aliasName:'',
        domaintext:'',
        expiration:0,
        owner:'',
        bca:'',
        abandoned:true
      },
      refdata:{
        MXBCA:''
      },
      origin:{
        MXBCA:''
      },
      ctrl:{
        editEnabled:false,
        loading:false
      },
      maskDialog:{
        visible:false,
        loading:false,
      }
    }
  },
  methods: {
    enableEditConf(){
      this.ctrl.editEnabled = true
    },
    disableEditConf(){
      this.ctrl.editEnabled = false
    },
    ShowMaskDialog(){
      this.maskDialog = Object.assign({},this.maskDialog,{visible:true,loading:false})
    },
    CancelConfirm(){
      this.maskDialog = Object.assign({},this.maskDialog,{visible:false,loading:false})
    },
    async SubmitMailConfig(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const web3State = this.$store.getters['web3State']
      const owner = this.mailInfo.owner;
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const hash = this.mailInfo.hash
      const fulltext = this.fulltext

      let msg = '';

      if(!hash){
        msg = this.$t('code.200004',{domaintext:this.fulltext})
        this.$message(this.$basTip.error(msg))
        return
      }
      if(!isOwner(owner,wallet)){
        msg = this.$t('code.110110',{wallet,owner})
        this.$message(this.$basTip.error(msg))
        return
      }

      const mxcbaStr = this.mailInfo.bca
      if(mxcbaStr && assertNotBCA(mxcbaStr)){
        msg = this.$t('p.DomainRefDataValidIPIllegal',{
          typ:this.$t(`l.RefDataMXBCA`),
          val:mxcbaStr
        })

        this.$message(this.$basTip.error(msg))
        return
      }

      try{
        this.ctrl.loading = true
        const aliasName = this.mailInfo.aliasName
        const result = await updateMailInfo(hash,mxcbaStr,aliasName,chainId,wallet)
        console.log(result)
        this.mailInfo = Object.assign({},this.mailInfo,result)
        //this.maskDialog.visible = false
        this.ctrl.loading = false
        this.ctrl.editEnabled = false
      }catch(ex){
        //this.maskDialog.visible = false
        this.ctrl.loading = false
        let msg = ''
        switch (ex) {
          case ACCOUNT_NOT_MATCHED:
            msg = this.$t(`code.ex`,{wallet,owner})
            this.$message(this.$basTip.error(msg))
            return
          case UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return;
          case MAIL_HASH_INVALID:
          case MAIL_HASH_EXPIRED:
            console.log(ex)
            msg = this.$t(`code.${ex}`,{text:fulltext})
            this.$message(this.$basTip.error(msg))
            return;
          case PARAM_ILLEGAL:
            console.error(ex)
            return;
          default:
            break;
        }
        if(ex.code === USER_REJECTED_REQUEST){
          msg = this.$t(`code.${USER_REJECTED_REQUEST}`)
          this.$message(this.$basTip.error(msg))
          return ;
        }
        console.error(ex)
      }
    },
    goback(){
      this.$router.go(-1)
    },
    gotoDomainDetail(){
      const domaintext = this.mailInfo.domaintext
      if((domaintext+'')){
        this.$router.push({
          path:`/domain/detail/${domaintext}`
        })
      }
    }
  },
  async mounted() {
    const hash = this.$route.params.hash
    const domaintext = this.$route.params.domaintext
    this.mailInfo.hash = hash
    this.mailInfo.domaintext = domaintext

    const web3State = this.$store.getters['web3State']
    const chainId = web3State.chainId
    const resp = await getMailInfo(hash,chainId)
    console.log(resp)
    if(resp.state){
      this.mailInfo = Object.assign({},this.mailInfo,resp.mail)
      // if(resp.refdata)this.refdata = Object.assign(this.refdata,resp.refdata)
    }else{
      console.error('Unfound in ',chainId)
    }
  },
}
</script>
<style>
.mail-info--base label {
  font-size:18px;
  font-weight: 400;
  line-height: 25px;
}

.mail-info--base span.mail-info-text{
  font-weight: 400;
  color: rgba(4,6,46,1);
}
.bas-hash-inline {
  width: 100%;
  display: inline-flex;
  justify-self: start;
  align-items: center;
}
.nav-breadcrumbs {
  margin: 10px auto 10 0;
}
.breadcrumbs {
  cursor: pointer;
  background-color: rgba(235,237,237,1);
  border-radius: 12px;
  padding: 4px 12px;
}

.breadcrumbs span{
  margin: auto .25rem;
  color:rgba(139,139,158,1);
  line-height: 20px;
}

.mail-box-wrapper {
  background:rgba(255,255,255,1);
  border-radius:1px;
}

.mail-box-wrapper div.inner-box{
  width: 60%;
  margin: 24px auto;
}

.mail-info--base {
  width: 100%;
  background:rgba(245,246,246,.6);
  border-radius:1px;
  border:1px solid rgba(235,237,237,1);
  padding: 12px 12px;
}
.mail-info-primary {
  font-size:22px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(4,6,46,1);
  line-height:30px;
  letter-spacing:1px;
}
.mail-conf-nav {
  margin: 12px auto;
}

.mail-conf-nav i.fa {
  font-size: 10px;
}
.mail-conf-nav span {
  font-size:14px;
}
.conf-label {
  line-height: 25px;
  font-size: 16px;
}

.mail-conf-container div.el-input.is-disabled>input.el-input__inner {
  color:rgba(4, 6, 46, .85);
  cursor: copy;
  background-color: rgba(255,255,255,1);
  border:none;
}


.mail-conf-container div.el-textarea.is-disabled>textarea.el-textarea__inner {
  color:rgba(4, 6, 46, .85);
  cursor: copy;
  background-color: rgba(255,255,255,1);
  border:none;
}

.mail-conf-container label.el-form-item__label {
  color:rgba(4, 6, 46, .95);
}


</style>
