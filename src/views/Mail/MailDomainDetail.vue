<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9 col-sm-12 pt-2">
        <div class="nav-breadcrumbs" @click="goback">
          <span class="breadcrumbs"><span>{{$t('l.GoBackPrevPage')}}</span></span>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-3">
      <div class="col-md-10 col-sm-12 mail-box-wrapper ">
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
            <!-- <span v-if="!ctrl.editEnabled"
              class="breadcrumbs" @click="enableEditConf">
              <i class="fa fa-edit"></i>
              <span>{{$t('l.UpdateTagLabel')}}</span>
            </span> -->
          </div>

          <el-form label-width="160px" class="mail-conf-container">
            <!-- <el-form-item :label="$t('l.RefDataMXBCA')">
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
            </el-form-item> -->

            <el-form-item :label="$t('l.RefDataMX')">
              <div class="refdata-container">
                <el-input v-model="refdata.MX"
                  :placeholder="$t('l.RefNoDataPlaceholder')"
                  :disabled="true"
                  type="textarea"
                  size="mini"
                  autosize
                  />
                <div class="refdata-btns">
                  <el-button
                    @click="updateRefData('MX')"
                    :disabled="commDisabled"
                    type="primary" size="mini" class="bas-btn-primary">
                    {{ refdata.MX ? $t('l.RefUpdateDataBtn') : $t('l.RefAddDataBtn') }}
                  </el-button>
                  <el-button v-if="Boolean(refdata.MX)"
                    @click="showCleanConfirmDialog('MX')"
                    :disabled="commDisabled"
                    size="mini" plain>
                    {{$t('l.RefClearDataBtn')}}
                  </el-button>
                </div>
              </div>
            </el-form-item>

            <el-form-item :label="$t('l.RefDataMXBCA')">
              <div class="refdata-container">
                <el-input v-model="refdata.MXBCA"
                  :placeholder="$t('l.RefNoDataPlaceholder')"
                  :disabled="true"
                  size="mini"
                  type="textarea"
                  autosize
                />
                <div class="refdata-btns">
                  <el-button
                    @click="updateRefData('MXBCA')"
                    :disabled="commDisabled"
                    type="primary" size="mini" class="bas-btn-primary">
                    {{refdata.MXBCA ? $t('l.RefUpdateDataBtn') : $t('l.RefAddDataBtn') }}
                  </el-button>
                  <el-button v-if="Boolean(refdata.MXBCA)"
                    @click="showCleanConfirmDialog('MXBCA')"
                    :disabled="commDisabled"
                    size="mini" plain>
                    {{$t('l.RefClearDataBtn')}}
                  </el-button>
                </div>
              </div>
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


    <el-dialog :visible.sync="mulDialog.visible"
      :close-on-click-modal="false"
      :show-close="false"
      width="55%">
      <div slot="title">
        {{$t('p.UpdateDomainRefDataDialogTitle',{domain:mailInfo.domaintext,typ:this.$t('l.RefData'+mulDialog.typDict)})}}
      </div>
      <div class="container refdata-dialog--body">
        <el-table type="index" :data="mulDialog.items"
          stripe style="width: 100%">
          <el-table-column type="index" width="50"/>

          <el-table-column :label="multiLabel"
            width="375px">
            <template slot-scope="scope">
              <el-form :model="scope.row"  ref="scope.row" @submit.native.prevent>
                <el-input v-model="scope.row.val"
                  :disabled="mulDialog.loading"
                  size="mini"
                  :ref="mulDialog.typDict+'_'+scope.row.length"
                  @keyup.enter.native="InputEnterHandle"
                  :placeholder="multiInputPlaceholder"
                  class=""/>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('l.Operating')"
            width="260px">
            <template slot-scope="scope">
              <el-button size="mini"
                :disabled="mulDialog.loading"
                type="default"
                icon="el-icon-plus" circle
                @click="addMultiItem">
              </el-button>
              <el-button size="mini" type="default"
                :disabled="mulDialog.loading"
                icon="el-icon-minus" circle
                @click="removeItem( scope.row.val,scope.$index)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="dialog-footer" slot="footer">
        <el-button size="mini" :disabled="mulDialog.loading"
          @click="cancelMulti">
          {{  $t('g.Cancel') }}
        </el-button>
        <el-button size="mini" :disabled="mulDialog.loading"
          @click="addMultiItem">
          {{  $t('g.AddOneRecord') }}
        </el-button>
        <el-button type="primary" class="bas-btn-primary"
          size="mini" :disabled="mulDialog.loading"
          @click="submmitMultiConfData">
          {{  $t('g.Confirm') }}
        </el-button>
        <loading-dot v-if="mulDialog.loading" style="float:left;"/>
      </div>
    </el-dialog>

    <el-dialog  width="25%"
      :close-on-click-modal="false"
      :show-close="!cleanConfirm.loading"
      :before-close="hideCleanConfirmDialog"
      :visible.sync="cleanConfirm.visible"
      top="35vh"
      custom-class="bas-dialog">
      <div class="bas-dg-header" slot="title">
      </div>
      <div class="bas-dg-body">
        <div class="abandon-title">
          <span>{{$t('p.RefDataCleanDialogConfirmContents',{text:$t('l.RefData'+cleanConfirm.typDict)})}}</span>
        </div>

        <div class="text-center">
          <span class="bas-dg-gray-tips">
          </span>
        </div>

        <div class="text-center">
          <el-button :disabled="cleanConfirm.loading"
            type="primary"
            @click="submitCleanData" class="bas-w-60 bas-btn-primary btn-abandon">
            <div>
              <LoadingDot v-if="cleanConfirm.loading" />
            </div>
            {{cleanConfirm.loading ? $t('l.Transactioning') : $t('l.Confirm')}}
          </el-button>
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
  PARAM_ILLEGAL,USER_REJECTED_REQUEST,UNSUPPORT_NETWORK ,
}from '@/web3-lib/api-errors'

import {
  validIPv4,
  assertEmpty,
  assertEmptyOrNotHex,
  assertNotBCA,
} from '@/utils/refdata-utils.js'
import {getDomainMailDetail} from '@/web3-lib/apis/mail-manager-api'
import {updateConfData,cleanConfData} from '@/web3-lib/apis/domain-conf-api'

import LoadingDot from '@/components/LoadingDot.vue'
export default {
  name:"MailDomainDetail",
  components:{
    LoadingDot,
  },
  computed: {
    expiration(){
      if(!this.mailInfo.expire) return ''
      return dateFormat(this.mailInfo.expire)
    },
    commDisabled(){
      return !this.mailInfo.domainHash || this.ctrl.inprogress
    },
    multiLabel(){
      if(!this.mulDialog.typDict) return ''
      const typ = this.mulDialog.typDict
      return this.$t(`l.RefData${typ}`)
    },
    multiInputPlaceholder(){
      const typ = this.mulDialog.typDict
      return this.$t('l.RefDataInputPlaceHolder',{typ:this.$t(`l.RefData${typ}`)})
    },
  },
  data() {
    return {
      mailInfo:{
        domainHash:'',
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
        editEnabled:false,
        inprogress:false,
      },
      mulDialog:{
        visible:false,
        items:[{typ:'MX',val:''}],
        typDict:'MX',
        loading:false
      },
      maskDialog:{
        visible:false,
      },
      cleanConfirm:{
        visible:false,
        loading:false,
        typDict:'MX',
        domaintext:''
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
    updateRefData(typName){
      this.openMulDialog(typName)
    },
    showCleanConfirmDialog(type){
      this.cleanConfirm = Object.assign({},this.cleanConfirm,{
        visible:true,
        loading:false,
        typDict:type,
      })
    },
    hideCleanConfirmDialog(){
      this.cleanConfirm = Object.assign({},this.cleanConfirm,{
        visible:false,
        loading:false,
        typDict:'',
      })
    },
    submitCleanData(){
      this.clearRefData()
    },
    clearRefData(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const type = this.cleanConfirm.typDict
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const hash = this.mailInfo.domainHash
      const owner = this.mailInfo.owner
      if(!type){
        console.error('lost parameter.')
        return;
      }

      if(!isOwner(owner,wallet)){
        this.$message(this.$basTip.error(this.$t(`code.${NO_UPDATE_PERMISSIONS}`,{
          wallet:wallet,
          owner:owner
        })))
        return
      }

      this.ctrl.inprogress = true
      this.cleanConfirm.loading =true
      cleanConfData(type,hash,chainId,wallet).then(receipt=>{
        console.log(receipt)
        this.refdata[type] = ''
        this.ctrl.inprogress = false
        this.hideCleanConfirmDialog()
      }).catch(ex=>{
        console.log(ex)
        this.ctrl.inprogress = false
        this.cleanConfirm.loading =false
      })
    },
    openMulDialog(typ){
      let items = str2ConfDatas(this.refdata[typ]).map(item=>{
        return {
          typ:typ,
          val:item
        }
      })
      if(!items||!items.length) items = [{typ,val:''}]
      const dialog = {
        visible:true,
        items,
        typDict:typ,
        loading:false
      }
      this.mulDialog = Object.assign({},dialog)
    },
    cancelMulti(){
      const dialog = {
        visible:false,
        items:[],
        typDict:null,
        loading:false
      }

      this.mulDialog = Object.assign({},dialog)
    },
    submmitMultiConfData(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      try{
        this.validDatas()
      }catch(ex){
        this.$message(this.$basTip.error(ex))
        return;
      }
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet

      const datas = this.mulDialog.items.map(it=>it.val)
      const typName = this.mulDialog.typDict
      const hash = this.mailInfo.domainHash
      //console.log(datas)
      this.mulDialog.loading =true
      const datastr = confDatas2Str(datas)
      updateConfData(typName,hash,datas,chainId,wallet).then(receipt=>{
        //console.log(receipt)
        this.mulDialog.visible = false
        this.refdata[typName] = datastr
        this.mulDialog.loading = false
      }).catch(ex=>{
        console.log(ex)
        this.mulDialog.loading =false
      })
    },
    validDatas(){
      const datas = this.mulDialog.items
      const typ = this.mulDialog.typDict
      let msg = ''
      if(!datas ||!datas.length){
        console.error('mulDialog.items error')
        return false;
      }

      switch (typ) {
        case 'MX':
          const mxitem = datas.find(it=> validIPv4(it.val) ==false)
          if(mxitem){
            msg = this.$t('p.DomainRefDataValidIPIllegal',{
              typ:this.$t('l.RefDataMX'),
              val:mxitem.val
            })

            throw msg
          }
          break;
        case 'MXBCA':
          const bcaItem = datas.find(it => assertNotBCA(it.val))
          if(bcaItem){
            msg = this.$t('p.DomainRefDataValidBCAIllegal',{
              typ:this.$t(`l.RefData${typ}`),
              val:bcaItem.val
            })
            throw msg
          }
          break;
        default:
          break;
      }
    },
    InputEnterHandle(e){
      //console.log(e)
      this.addMultiItem()
    },
    addMultiItem(){
      const typ = this.mulDialog.typDict
      this.mulDialog.items.push({typ:typ,val:''})
    },
    removeItem(val,index){
      const items = this.mulDialog.items
      this.mulDialog.items.splice(index,1)
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
      console.log(resp)
      if(resp.refdata)this.refdata = Object.assign(this.refdata,resp.refdata)
    }
  },
}
</script>
<style scope>
.abandon-title {
  width: 100%;
  text-align: center;
  height:28px;
  font-size:20px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:28px;
  letter-spacing:1px;
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

@media screen and (min-width: 600px) {
  .mail-box-wrapper div.inner-box{
    width: 100%;
    margin: 24px auto;
  }
}

@media screen and (min-width: 900px) {
  .mail-box-wrapper div.inner-box{
    width: 80%;
    margin: 24px auto;
  }
}

@media screen and (min-width: 1920px) {
  .mail-box-wrapper div.inner-box{
    width: 60%;
    margin: 24px auto;
  }
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

.mail-conf-container textarea.el-textarea__inner {
  color:rgba(4, 6, 46, .85);
  cursor: copy;
  background-color: rgba(245,246,246,1);
  border:none;
}

.mail-conf-container label.el-form-item__label {
  color:rgba(4, 6, 46, .95);
}

.refdata-container {
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}

/* .refdata-container div.el-textarea,.refdata-container div.el-input {
  width: 55%;
} */

.refdata-container div.refdata-btns {
  width: 280px;
  margin-left: .25rem;
}
.refdata-container div.el-textarea.is-disabled>textarea.el-textarea__inner {
  color:rgba(4, 6, 46, .85);
  cursor: copy;
  background-color: rgba(255,255,255,.95);
  border: 1px solid rgba(235,237,237,.65);
}

.refdata-container label.el-form-item__label {
  color:rgba(4, 6, 46, .95);
}
div.refdata-btns button {
  margin: auto .25rem;
}
</style>
