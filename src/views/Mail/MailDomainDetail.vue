<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8 pt-2">
        <div class="nav-breadcrumbs" @click="goback">
          <span class="breadcrumbs"><span>{{$t('l.GoBackPrevPage')}}</span></span>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-3">
      <div class="col-8 mail-box-wrapper ">
        <div class="inner-box">
          <div class="mail-info--base">
            <div class="mail-info-primary">
              <label>{{$t('l.MailLabel')}}</label> <span>{{'@'+mailInfo.domaintext}}</span>
            </div>
            <div>
              <label class="bas-info-label"> {{$t('l.Domain')}}</label>
              <a class="bas-link">{{mailInfo.domaintext}}</a>
            </div>
            <div>
              <label  class="bas-info-label">{{$t('l.ExpiredDate')}}</label>
              <span>{{expiration}}</span>
            </div>
          </div>
          <div class="mail-conf-nav">
            <label class="conf-label">{{$t('l.ConfigurationLabel')}}</label>
            <span v-if="!ctrl.editEnabled"
              class="breadcrumbs" @click="enableEditConf">
              <i class="fa fa-edit"></i>
              <span>{{$t('l.UpdateTagLabel')}}</span>
            </span>
          </div>

          <el-form label-width="100px" class="mail-conf-container">
            <el-form-item :label="$t('l.RefDataMXBCA')">
              <!-- <div v-if="!ctrl.editEnabled" class="">
                {{ refdata.MXBCA ? refdata.MXBCA : $t('l.RefNoDataPlaceholder')}}
              </div> -->
              <el-input v-if="!ctrl.editEnabled" disabled="true"
                type="textarea" autosize="{minRows:1,maxRows:5}"
                :placeholder="$t('l.RefNoDataPlaceholder')"
                v-model="refdata.MXBCA">
              </el-input>

              <el-input v-if="ctrl.editEnabled"
                type="textarea" autosize="{minRows:1,maxRows:5}"
                :placeholder="$t('l.RefNoDataPlaceholder')"
                v-model="refdata.MXBCA">
              </el-input>
            </el-form-item>

            <el-form-item v-if="ctrl.editEnabled">
              <el-button type="primary" class="bas-w-68 bas-btn-primary"
                @click="SubmitPublicKey">
                {{$t('g.Confirm')}}
              </el-button>
              <el-button type="default" class="w-25"
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
        <loading-dot v-if="maskDialog.visible && Boolean(mailInfo.domainHash)" style="float:left;"/>
        <span style="margin-left:10px;">
          {{maskDialog.title}}
        </span>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-10 text-center">
            <h5>
              {{$t('l.TransactionTip')}}
            </h5>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat,isOwner } from '@/utils'
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
import {getDomainMailDetail} from '@/web3-lib/apis/mail-manager-api'
import {updateConfData} from '@/web3-lib/apis/domain-conf-api'
import LoadingDot from '@/components/LoadingDot.vue'
export default {
  name:"MailDomainDetail",
  computed: {
    expiration(){
      if(!this.mailInfo.expire) return ''
      return dateFormat(this.mailInfo.expire)
    }
  },
  data() {
    return {
      mailInfo:{
        domainHash:'',
        hash:'',
        name:'',
        domaintext:'',
        expire:0,
      },
      refdata:{
        MXBCA:''
      },
      origin:{
        MXBCA:''
      },
      ctrl:{
        editEnabled:false
      },
      maskDialog:{
        visible:false,
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
    SubmitPublicKey(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const web3State = this.$store.getters['web3State']
      const owner = this.mailInfo.owner;
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const hash = this.mailInfo.domainHash

      let msg = '';

      if(!hash){
        msg = this.$t('code.200004',{domaintext:this.mailInfo.domaintext})
        this.$message(this.$basTip.error(msg))
        return
      }
      if(!isOwner(owner,wallet)){
        msg = this.$t('code.110110',{wallet,owner})
        this.$message(this.$basTip.error(msg))
        return
      }

      const mxcbaStr = this.refdata.MXBCA
      if(assertNotBCA(mxcbaStr)){
        msg = this.$t('p.DomainRefDataValidIPIllegal',{
          typ:this.$t(`l.RefDataMXBCA`),
          val:mxcbaStr
        })

        this.$message(this.$basTip.error(msg))
        return
      }
      const datas = str2ConfDatas(mxcbaStr)
      this.maskDialog.visible = true
      updateConfData("MXBCA",hash,datas,chainId,wallet).then(ex=>{
        this.maskDialog.visible = false
        this.ctrl.editEnabled = false
        this.$message(this.$basTip.warn(this.$t('g.OperateTipSuccess')))
      }).catch(ex=>{
        console.log(ex)
        this.maskDialog.visible = false
        this.$message(this.$basTip.error(this.$t('g.OperateTipFail')))
      })
    },
    goback(){
      this.$router.go(-1)
    }
  },
  async mounted() {
    const domaintext = this.$route.params.domaintext
    this.mailInfo.domaintext = domaintext
    const web3State = this.$store.getters['web3State']
    const chainId = web3State.chainId
    const resp = await getDomainMailDetail(domaintext,chainId)
    if(resp.state){
      this.mailInfo = Object.assign({},this.mailInfo,resp.mailInfo)
      if(resp.refdata)this.refdata = Object.assign(this.refdata,resp.refdata)
    }
  },
}
</script>
<style>
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
  background:rgba(245,246,246,1);
  border-radius:1px;
  opacity:0.6;
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

.mail-conf-container div.el-textarea.is-disabled>textarea.el-textarea__inner {
  color:rgba(4, 6, 46, .85);
  cursor: copy;
  background-color: rgba(245,246,246,1);
  border:none;
}

.mail-conf-container label.el-form-item__label {
  color:rgba(4, 6, 46, .95);
}
</style>
