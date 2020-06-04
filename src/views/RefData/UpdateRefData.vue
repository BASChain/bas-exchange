<template>
  <div class="container bg-white" >
    <div class="row justify-content-center align-items-center">
      <el-card body-style="backgroup:rgba(245,246,246,1);"
        shadow="never"
        class="col-md-10 col-sm-12 box-card bas-gray-bg">
        <div class="bas-inline-flex" >
          <div class="bas-info-label bas-label-100" style="font-size:1.25rem;color:#04062E;">
            {{$t('l.Domain')}}
          </div>
          <div class="bas-info-text " v-loading="ctrl.loading">
            <span style="font-size:1.45rem;">
              {{ asset.domaintext }}
            </span>
            <span class="domain-type-tager">
              {{ domainType }}
            </span>
          </div>
        </div>
        <div class="bas-inline-flex pt-3">
          <div class="bas-info-label bas-label-100">
            {{$t('l.Owner')}}
          </div>
          <div class="bas-info-text">
            {{asset.owner}}
          </div>
        </div>
        <div class="bas-inline-flex">
          <div class="bas-info-label bas-label-100">
            {{$t('l.ExpiredDate')}}
          </div>
          <div class="bas-info-text">
            {{expireDate}}
          </div>
        </div>
        <div class="bas-inline-flex">
          <div class="bas-info-label bas-label-100">
            {{$t('l.DomainHash')}}
          </div>
          <div class="bas-info-text">
            {{asset.hash}}
          </div>
        </div>
      </el-card>
    </div>

    <div v-if="!!asset.isRoot"
      class="row justify-content-center align-items-center">
      <div class="col-md-10 col-sm-12">
        <div class="pt-4 pb-2">
          <h5>{{$t('l.SubDomainConfiguration')}}</h5>
        </div>
      </div>

      <el-form label-width="220px"
        class="col-md-10 col-sm-12">
        <el-form-item :label="this.$t('l.HasOpenAppliedSubRegistLabel')">
          <el-radio-group @change="openAppliedChanged"
            v-model="asset.openApplied">
            <el-radio :label="false" :disabled="ctrl.opaInprogress">{{$t('l.N')}}</el-radio>
            <el-radio :label="true" :disabled="ctrl.opaInprogress">{{$t('l.Y')}}</el-radio>
          </el-radio-group>
          <loading-dot v-if="ctrl.opaInprogress" style="float:right;"/>
        </el-form-item>
        <el-form-item :label="$t('l.SubDomainPrice')">
          <el-input-number v-model="vstate.subUnitBas" name="subUnitBas"
            :precision="2" :step="1.0"
            :disabled="!asset.openApplied || !asset.isCustomed"
            @change="customedPriceChanged"
            :max="ruleState.maxPriceBas"
            :min="ruleState.minSubBas" class="w-25">
          </el-input-number>
          <el-checkbox v-model="asset.isCustomed"
            @change="customedCheckedChange"
            :disabled="isCustomedCheckDisabled"
            class="bas-domain--setprice-tip">
            <div>
              Notice: {{$t('p.UpdateDomainRefDataNoticeTip',{externalBAS:this.ruleState.externalBas})}}
            </div>
          </el-checkbox>
          <loading-dot v-if="ctrl.cusInprogress" style="float:right;"/>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="submmitCustomed" :disabled="customedBtnDisabled"
            type="primary" class="bas-btn-primary w-25">
            {{  $t('g.Confirm') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="confirmDialog.visible"
      :title="asset.domaintext"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%">
      <h5 class="text-center">
        {{
          confirmDialog.openApplied ?
          $t('p.DnsUpdateOpenAppliedConfirmMsg') : $t('p.DnsUpdateCloseAppliedConfirmMsg')
        }}
      </h5>
      <div class="dialog-footer" slot="footer">
        <el-button size="mini" :disabled="confirmDialog.loading"
          @click="cancelOpenApplied">
          {{  $t('g.Cancel') }}
        </el-button>
        <el-button type="primary" class="bas-btn-primary"
          size="mini" :disabled="confirmDialog.loading"
          @click="confirmOpenApplied">
          {{  $t('g.Confirm') }}
        </el-button>
        <loading-dot v-if="confirmDialog.loading" style="float:left;"/>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="maskDialog.visible"
      :title="asset.domaintext"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%">
      <div>
        <h5 class="text-center">
          {{maskDialog.contents}}
        </h5>
      </div>

      <div class="dialog-footer mb-2" slot="footer">
        <loading-dot v-if="maskDialog.visible" style="float:right;"/>
      </div>
    </el-dialog>


    <div v-if="true"
      class="row justify-content-center align-content-center pt-2 pb-2">
      <div class="" style="width:90%;border-top:1px solid rgba(150,150,166,1);"></div>
    </div>

    <!-- Ref Data Begin -->
    <div class="row justify-content-center align-items-center">
      <div class="col-md-10 col-sm-12">
        <div>
          <div>
            <h5>{{$t('l.DnsMappingData')}}</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center align-items-center">
      <el-form class="col-md-10 col-sm-12" label-width="140px" @submit.native.prevent>
        <el-form-item >
          <div class="dns-demo-wrapper bas-w-70" style="height:32px;">
            <span>
              {{$t('l.DemoIPPrefix')}} 104.238.165.23
            </span>
          </div>
        </el-form-item>

        <el-form-item :label="$t('l.RefDataA')">
          <div class="refdata-container">
            <el-input v-model="refdata.A"
              :placeholder="$t('l.RefNoDataPlaceholder')"
              :disabled="true"
              type="textarea"
              autosize
            />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.A)"
                :disabled="commDisabled"
                @click="updateRefData('A')"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.A)"
                :disabled="commDisabled"
                @click="updateRefData('A')"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.A)"
                :disabled="commDisabled"
                @click="clearRefData('A')"
                size="mini" plain>
                {{$t('l.RefClearDataBtn')}}
              </el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item :label="$t('l.RefDataAAAA')">
          <div class="refdata-container">
            <el-input v-model="refdata.AAAA"
              :placeholder="$t('l.RefNoDataPlaceholder')"
              :disabled="true"
              type="textarea"
              autosize
            />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.AAAA)"
                :disabled="commDisabled"
                @click="updateRefData('AAAA')"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.AAAA)"
                @click="updateRefData('AAAA')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.AAAA)"
                @click="clearRefData('AAAA')"
                :disabled="commDisabled"
                size="mini" plain>
                {{$t('l.RefClearDataBtn')}}
              </el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item :label="$t('l.RefDataMX')">
          <div class="refdata-container">
            <el-input v-model="refdata.MX"
              :placeholder="$t('l.RefNoDataPlaceholder')"
              :disabled="true"
              type="textarea"
              autosize
              />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.MX)"
                @click="updateRefData('MX')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.MX)"
                @click="updateRefData('MX')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.MX)"
                @click="clearRefData('MX')"
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
              type="textarea"
              autosize
            />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.MXBCA)"
                @click="updateRefData('MXBCA')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.MXBCA)"
                @click="updateRefData('MXBCA')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.MXBCA)"
                @click="clearRefData('MXBCA')"
                :disabled="commDisabled"
                size="mini" plain>
                {{$t('l.RefClearDataBtn')}}
              </el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item :label="$t('l.RefDataBlockChain')">
          <div class="refdata-container">
            <el-input v-model="refdata.BlockChain"
              :placeholder="$t('l.RefNoDataPlaceholder')"
              :disabled="true"
              type="textarea"
              autosize
            />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.BlockChain)"
                @click="updateRefData('BlockChain')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.BlockChain)"
                @click="updateRefData('BlockChain')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.BlockChain)"
                @click="clearRefData('BlockChain')"
                :disabled="commDisabled"
                size="mini" plain>
                {{$t('l.RefClearDataBtn')}}
              </el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item :label="$t('l.RefDataCName')">
          <div class="refdata-container">
            <el-input v-model="refdata.CName"
              :placeholder="$t('l.RefNoDataPlaceholder')"
              :disabled="true"
              type="textarea"
              autosize
            />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.CName)"
                @click="updateRefData('CName')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.CName)"
                @click="updateRefData('CName')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.CName)"
                @click="clearRefData('CName')"
                :disabled="commDisabled"
                size="mini" plain>
                {{$t('l.RefClearDataBtn')}}
              </el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item :label="$t('l.RefDataIOTA')">
          <div class="refdata-container">
            <el-input v-model="refdata.IOTA"
              :placeholder="$t('l.RefNoDataPlaceholder')"
              :disabled="true"
              autosize
              type="textarea"
            />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.IOTA)"
                @click="updateRefData('IOTA')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.IOTA)"
                @click="updateRefData('IOTA')"
                :disabled="commDisabled"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.IOTA)"
                @click="clearRefData('IOTA')"
                :disabled="commDisabled"
                size="mini" plain>
                {{$t('l.RefClearDataBtn')}}
              </el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item :label="$t('l.RefDataOptional')">
          <div class="refdata-container">
            <el-input v-model="refdata.Optional"
              :placeholder="$t('l.RefNoDataPlaceholder')"
              :disabled="true"
              autosize
              type="textarea"
            />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.Optional)"
                :disabled="commDisabled"
                @click="updateRefData('Optional')"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.Optional)"
                :disabled="commDisabled"
                @click="updateRefData('Optional')"
                type="primary" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.Optional)"
                :disabled="commDisabled"
                @click="clearRefData('Optional')"
                size="mini" plain>
                {{$t('l.RefClearDataBtn')}}
              </el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="">
          <el-button type="Warning" class="bas-w-70 bas-btn-pink d-none"
            :disabled="ctrl.inprogress || cleanAlldisabled"
            @click="deleteAll">
            {{$t('l.ClearAllConfiguration')}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="mulDialog.visible"
      :close-on-click-modal="false"
      :show-close="false"
      width="55%">
      <div slot="title">
        {{$t('p.UpdateDomainRefDataDialogTitle',{domain:asset.domaintext,typ:this.$t('l.RefData'+mulDialog.typDict)})}}
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

    <!-- Confirm Clean -->
    <el-dialog :visible.sync="cleanDialog.visible"
      :title="$t('l.CleanRefData')"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%">
      <h5 class="text-center">
        {{
          $t('p.RefDataCleanDialogConfirmContents',{text:$t('l.RefData'+cleanDialog.typDict)})
        }}
      </h5>
      <div class="dialog-footer" slot="footer">
        <el-button size="mini" :disabled="cleanDialog.loading"
          @click="cancelCleanDialog">
          {{  $t('g.Cancel') }}
        </el-button>
        <el-button type="primary" class="bas-btn-primary"
          size="mini" :disabled="cleanDialog.loading"
          @click="submitCleanRefData">
          {{  $t('g.Confirm') }}
        </el-button>
        <loading-dot v-if="cleanDialog.loading" style="float:left;"/>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.refdata-dialog--body {
  width: 100%;
  margin: .75rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.refdata-multi-table {
  width: 80%;
  border-collapse: collapse;
}

.refdata-multi-input input.el-input__inner {
  border: 0;
}

.refdata-inline {
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
}

.refdata-row--label {
  min-width: 116px;
}

.refdata-row-btns {
  min-width: 100px;
}


.refdata-row-btns i.bas-el-icon {
  cursor: pointer;
  margin: auto .75rem;
  font-size: 28px;
  transition: color .15s linear;
}

.refdata-row-btns i.bas-el-icon:focus,.refdata-row-btns i.bas-el-icon:hover {
  color:#409eff;
}



.refdata-multi-table td {
  border: 1px solid #DCDFE6;
}

td.refdata-label {
  width: 20%;
  text-align: right;
  padding-right: 1rem;
}

td.refdata-input {
  width: 60%;
}


</style>
<script>
import {
  dateFormat,wei2Bas,bas2Wei,isOwner
} from '@/utils'

import {
  getDomainType,
} from '@/utils/Validator.js'

import {
  validIPv4,
  validIPv6,
  assertEmpty,
  assertEmptyOrNotHex,
  assertNotBCA,
  assertHasRepeatRefData,
} from '@/utils/refdata-utils.js'

import {
  PARAM_ILLEGAL,USER_REJECTED_REQUEST,UNSUPPORT_NETWORK ,
}from '@/web3-lib/api-errors'

/**
 * web3-lib
 */
import {
  dataShowDelimiter,
  str2ConfDatas,
  confDatas2Str,
} from '@/web3-lib/utils'
import * as ApiError from '@/web3-lib/api-errors'
import { getDomainDetail } from '@/web3-lib/apis/domain-api'
import {updateConfData,cleanConfData} from '@/web3-lib/apis/domain-conf-api'
import {
  closeRootDomainPublic,
  openRootDomainPublic,
  setCustomPrice,
  closeCustomPrice
} from '@/web3-lib/apis/oann-api'

import LoadingDot from '@/components/LoadingDot.vue'

export default {
  name:"UpdateRefData",
  components:{
    LoadingDot,
  },
  computed: {
    domainType(){
      if(!this.asset.domaintext)return ''
      const typ = getDomainType(this.asset.domaintext)
      return this.$t(`g.${typ}`)
    },
    expireDate(){
      return this.asset.expire ? dateFormat(this.asset.expire,'YYYY-MM-DD HH:mm:ss') : ''
    },
    isCustomedCheckDisabled(){
      //customed check disabled
      return this.ctrl.inprogress || !this.asset.openApplied
    },
    customedBtnDisabled(){
      const asset = this.asset
      const customBas = wei2Bas(asset.customPrice)
      if(!this.asset.openApplied)return true
      if(this.ctrl.inprogress || this.ctrl.cusInprogress)return true

      if(
        asset.isCustomed == this.origin.isCustomed &&
        parseFloat(customBas) == parseFloat(this.vstate.subUnitBas)
      ) return true;
      return false
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
    commDisabled(){
      return !this.asset.hash || this.ctrl.loading ||this.ctrl.inprogress
    },
    cleanAlldisabled(){
      const refdata = this.refdata

      let f = refdata.A || refdata.AAAA ||refdata.MX||refdata.BlockChain || refdata.MXBCA||
        refdata.CName||refdata.Optional ||refdata.IOTA
     // console.log(">>>>>",refdata)
      return !f
    },
    ...Vuex.mapState({
      externalWei:state=>state.dapp.externalGas
    })
  },
  data() {
    return {
      asset:{
        domaintext:"",
        owner:"",
        expire:0,
        hash:'',
        name:'',
        isRoot:false,
        openApplied:true,
        isCustomed:true,
        customedPrice:0,
      },
      ctrl:{
        loading:false,
        inprogress:false,
        opaInprogress:false,
        cusInprogress:false,
      },
      vstate:{
        subUnitBas:4,
      },
      ruleState:{
        minSubBas:4,
        maxPriceBas:10000000000
      },
      origin:{
        isCustomed:true,
        customedPrice:0,
      },
      refdata:{
        "A":'',
        "AAAA":"",
        "MX":"",
        "BlockChain":"",
        "IOTA":"",
        "MXBCA":"",
        "CName":"",
        "Optional":""
      },
      mulDialog:{
        visible:false,
        items:[{typ:'A',val:''}],
        typDict:'A',
        loading:false
      },
      maskDialog:{
        visible:false,
        contents:'',
      },
      confirmDialog:{
        visible:false,
        openApplied:null,
        originOpenApplied:null,
        loading:false
      },
      cleanDialog:{
        visible:false,
        loading:false,
        typDict:''
      },
      approveWei:0,
      textarea:{
        maxRows:2,
        minRows:1
      }
    }
  },
  methods: {
    setSubUnitBas(openApplied,isCustomed,customPrice){
      const ruleState = this.$store.getters["dapp/ruleState"]
      if(openApplied && isCustomed){
        this.vstate.subUnitBas = wei2Bas(customPrice)
      }else{
        this.vstate.subUnitBas = ruleState.subBas
      }
    },
    openAppliedChanged(val){
      this.confirmDialog.openApplied = val
      this.confirmDialog.originOpenApplied = !val;
      this.confirmDialog.visible =true;
    },
    cancelOpenApplied(){
      this.confirmDialog.openApplied = null
      this.asset.openApplied = this.confirmDialog.originOpenApplied
      this.confirmDialog.originOpenApplied = null;
      this.confirmDialog.visible = false;
    },
    async confirmOpenApplied(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const ruleState = this.$store.getters["dapp/ruleState"]
      const domaintext = this.asset.domaintext
      const hash = this.asset.hash
      const commitOpenApplied = this.confirmDialog.openApplied
      const web3State = this.$store.getters["web3State"]
      const chainId = web3State.chainId
      const wallet = web3State.wallet

      if(!hash)return
      try{
        this.confirmDialog.loading = true
        if(commitOpenApplied === false){
          const rootResp =await closeRootDomainPublic(hash,chainId,wallet)
          console.log(rootResp)
          this.asset = Object.assign({},this.asset,rootResp)
          this.setSubUnitBas(rootResp.openApplied,rootResp.isCustomed,rootResp.customPrice)
          this.confirmDialog = Object.assign({},this.confirmDialog,{
            loading:false,
            visible:false,
            originOpenApplied:null,
            openApplied:null
          })

        }else{
          const root =await openRootDomainPublic(hash,chainId,wallet)
          console.log(root)
          this.asset = Object.assign({},this.asset,root)
          this.setSubUnitBas(root.openApplied,root.isCustomed,root.customPrice)
          this.confirmDialog = Object.assign({},this.confirmDialog,{
            loading:false,
            visible:false,
            originOpenApplied:null,
            openApplied:null
          })

        }
      }catch(ex){
        console.log(ex)
        this.confirmDialog.loading = false
        let msg = ''
        switch(ex){
          case ApiError.UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            break;
          case ApiError.DOMAIN_NOT_EXIST:
            msg = this.$t(`code.${ex}`,{domaintext:domaintext})
            this.$message(this.$basTip.error(msg))
            break;
          case ApiError.ROOT_REGIST_CLOSE:
            break;
          default:

            break;
        }

        if(ex.code === ApiError.USER_REJECTED_REQUEST){
          msg = this.$t(`code.${ex.code}`)
          this.$message(this.$basTip.error(msg))
        }
      }
    },
    toggleMaskDialog(visible,tip){
      const text = tip === undefined ? null : tip
      this.maskDialog = Object.assign({},this.maskDialog,{visible,contents:text})
    },
    customedPriceChanged(){
    },
    customedCheckedChange(){
    },
    async submmitCustomed(){// update Customed
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const web3State = this.$store.getters['web3State']
      const costwei = this.externalWei;
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const hash = this.asset.hash
      const owner = this.asset.owner
      const isCustomed = this.asset.isCustomed

      console.log(">>>",costwei,hash,isCustomed)

      if(!isOwner(owner,wallet)){
        this.$message(this.$basTip.error(this.$t(`code.${NO_UPDATE_PERMISSIONS}`,{
          wallet:wallet,
          owner:owner
        })))
        return
      }

      try{
        this.ctrl.inprogress = true
        this.toggleMaskDialog(true,this.$t('p.DomainConfCustomPriceUpdateTip'))
        if(isCustomed){//open
          const customwei = bas2Wei(this.vstate.subUnitBas)
          const receipt = await setCustomPrice(hash,customwei,costwei,chainId,wallet)

          this.asset.customPrice = customwei
          this.origin.isCustomed = true
          this.ctrl.inprogress = false
          this.toggleMaskDialog(false)
        }else{//close
          const receipt = await closeCustomPrice(hash,chainId,wallet)
          this.origin.isCustomed = false
          this.ctrl.inprogress = false
          this.toggleMaskDialog(false)
        }
      }catch(ex){
        this.ctrl.inprogress = false
        this.toggleMaskDialog(false)
        console.log(ex)
        let msg = ''
        switch (ex) {
          case ApiError.UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            break;
          case ApiError.DOMAIN_NOT_EXIST:
            msg = this.$t(`code.${ex}`,{domaintext:domaintext})
            this.$message(this.$basTip.error(msg))
            break;
          default:
            break;
        }

        if(ex.code === ApiError.USER_REJECTED_REQUEST){
          msg = this.$t(`code.${ex.code}`)
          this.$message(this.$basTip.error(msg))
        }
      }
    },
    clearRefData(type){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      this.cleanDialog = Object.assign({},this.cleanDialog,{
        visible:true,
        loading:false,
        typDict:type
      })
    },
    cancelCleanDialog(){
      this.cleanDialog = Object.assign({},this.cleanDialog,{
        visible:false,
        loading:false
      })
    },
    async submitCleanRefData(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const hash = this.asset.hash
      const owner = this.asset.owner
      const type = this.cleanDialog.typDict
      if(!type){
        console.error('No type')
        return;
      }

      if(!isOwner(owner,wallet)){
        this.$message(this.$basTip.error(this.$t(`code.${NO_UPDATE_PERMISSIONS}`,{
          wallet:wallet,
          owner:owner
        })))
        return
      }
      try{
        this.cleanDialog.loading = true
        const receipt = await cleanConfData(type,hash,chainId,wallet);
        console.log(receipt)
        this.cleanDialog.loading = false
        if(receipt){
          this.refdata[type] = ''
        }
        this.cleanDialog = Object.assign({},this.cleanDialog,{
          visible:false,
          loading:false
        })
      }catch(ex){
        let msg = ''
        this.cleanDialog.loading = false
        if(ex.code === USER_REJECTED_REQUEST){
          msg = this.$t(`code.${USER_REJECTED_REQUEST}`)
          this.$message(this.$basTip.error(msg))
        }else{
          console.error(ex)
        }
      }
    },
    updateRefData(type){
      switch (type) {
        case 'A':
        case 'AAAA':
        case 'MX':
        case 'BlockChain':
        case 'IOTA':
        case 'CName':
        case 'MXBCA':
        case 'Optional':
          this.openMulDialog(type)
          break;
        default:
          break;
      }
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
      const hash = this.asset.hash
     // console.log(datas)
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

      if(assertHasRepeatRefData(datas)){
        msg = this.$t('p.DomainRefDataHasRepeatItem',{
            typ:this.$t('l.RefDataA')
          })
        throw msg;
      }

      switch (typ) {
        case 'A':
          const itemip = datas.find(it=> validIPv4(it.val) ==false)
          if(itemip){
            msg = this.$t('p.DomainRefDataValidIPIllegal',{
              typ:this.$t('l.RefDataA'),
              val:itemip.val
            })

            throw msg
          }
          break;
        case 'AAAA':
          const itemip6 = datas.find(it=> validIPv6(it.val) ==false)
          if(itemip6){
            msg = this.$t('p.DomainRefDataValidIPIllegal',{
              typ:this.$t('l.RefDataAAAA'),
              val:itemip6.val
            })

            throw msg
          }
          break;
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
            msg = this.$t('p.DomainRefDataValidStringIllegal',{
              typ:this.$t(`l.RefData${typ}`),
              val:bcaItem.val
            })
            throw msg
          }
          break;
        case 'CName':
        case 'Optional':
          // valid notnull
          const strItem = datas.find(it => assertEmpty(it.val))
          if(strItem){
            msg = this.$t('p.DomainRefDataValidStringIllegal',{
              typ:this.$t(`l.RefData${typ}`),
              val:strItem.val
            })

            throw msg
          }

          break;
        case 'BlockChain':
        case 'IOTA':
          const hexItem = datas.find(it => assertEmptyOrNotHex(it.val))
          if(hexItem){
            msg = this.$t('p.DomainRefDataValidIPIllegal',{
              typ:this.$t(`l.RefData${typ}`),
              val:hexItem.val
            })
            throw msg
          }

          break;
        default:
          break;
      }
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
    deleteAll(){

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
    async loadDomainAssetInfo(tag){
      console.log("loadTag:",tag)
      const ruleState = this.$store.getters["dapp/ruleState"]
      const domaintext = this.$route.params.domaintext
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId

      this.ruleState = Object.assign({},ruleState)
      this.vstate.subUnitBas = ruleState.subBas
      let that = this
      that.ctrl.loading = true
      try{
        const resp = await getDomainDetail(domaintext,chainId);
        console.log(resp,chainId)
        if(resp.state){
          const asset = resp.assetinfo
          that.asset = Object.assign({},asset)
          that.refdata = Object.assign({},resp.refdata)
          that.origin.isCustomed = asset.isCustomed
          if(asset.openApplied && asset.isCustomed){
            that.vstate = Object.assign({},{subUnitBas:wei2Bas(asset.customPrice)})
          }
        }
        that.ctrl.loading = false
      }catch(ex){
        that.ctrl.loading = false
        console.error(ex)
      }
    }
  },
  async mounted() {

    this.ctrl.loading = true
    // if(window.ethereum){
    //   setTimeout(() => {
    //     this.loadDomainAssetInfo('lazy load')
    //   }, 2000);
    // }else{
    //   await this.loadDomainAssetInfo('Mounted')
    // }
    //
    try{
      await this.loadDomainAssetInfo('Mounted')
    }catch(ex){
      setTimeout(() => {
        this.loadDomainAssetInfo('lazy load')
      }, 2000);
    }


    // getDomainDetail(domaintext,chainId).then(resp=>{
    //   console.log(resp,chainId)
    //   if(resp.state){
    //     const asset = resp.assetinfo
    //     that.asset = Object.assign({},asset)
    //     that.refdata = Object.assign({},resp.refdata)

    //     if(asset.openApplied && asset.isCustomed){
    //       that.vstate = Object.assign({},{subUnitBas:wei2Bas(asset.customPrice)})
    //     }
    //   }
    //    that.ctrl.loading = false
    // }).catch(ex=>{
    //    console.error(ex)
    // })
  },
  updated() {

  },
  watch:{
    approveWei:function (newVal,oldVal){
      //calc need
    }
  }
}
</script>
<style>
.refdata-container {
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}

.refdata-container div.el-textarea,.refdata-container div.el-input {
  width: 70%;
}

.refdata-container div.refdata-btns {
  margin-left: .75rem;
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
