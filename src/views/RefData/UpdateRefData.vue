<template>
  <div class="container bg-white" >
    <div class="row justify-content-center align-items-center">
      <el-card body-style="backgroup:rgba(245,246,246,1);"
        shadow="never"
        class="col-md-8 col-sm-10 box-card bas-gray-bg">
        <div class="bas-inline-flex" >
          <div class="bas-info-label bas-label-100" style="font-size:1.25rem;color:#04062E;">
            {{$t('l.Domain')}}
          </div>
          <div class="bas-info-text ">
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

    <div v-if="!!asset.isRoot" v-loading="ctrl.loading"
      class="row justify-content-center align-items-center">
      <div class="col-md-8 col-sm-10">
        <div class="pt-4 pb-2">
          <h5>{{$t('l.SubDomainConfiguration')}}</h5>
        </div>
      </div>

      <el-form label-width="220px" v-loading="ctrl.loading"
        class="col-md-8 col-sm-10">
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

    <div v-if="true"
      class="row justify-content-center align-content-center pt-2 pb-2">
      <div class="" style="width:90%;border-top:1px solid rgba(150,150,166,1);"></div>
    </div>

    <!-- Ref Data Begin -->
    <div class="row justify-content-center align-items-center">
      <div class="col-md-8 col-sm-10">
        <div>
          <div>
            <h5>{{$t('l.DnsMappingData')}}</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center align-items-center">
      <el-form class="col-md-8 col-sm-10" label-width="140px" v-loading="ctrl.loading">
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
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.A)"
                :disabled="commDisabled"
                @click="updateRefData('A')"
                type="success" size="mini" class="bas-btn-primary">
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
                @click="updateRefData('AAAA')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.AAAA)"
                @click="updateRefData('AAAA')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.AAAA)"
                @click="clearRefData('AAAA')"
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
              autosize
              />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.MX)"
                @click="updateRefData('MX')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.MX)"
                @click="updateRefData('MX')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.MX)"
                @click="clearRefData('MX')"
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
              autosize
            />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.MXBCA)"
                @click="updateRefData('MXBCA')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.MXBCA)"
                @click="updateRefData('MXBCA')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.MXBCA)"
                @click="clearRefData('MXBCA')"
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
            />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.BlockChain)"
                @click="updateRefData('BlockChain')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.BlockChain)"
                @click="updateRefData('BlockChain')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.BlockChain)"
                @click="clearRefData('BlockChain')"
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
            />
            <div class="refdata-btns">
              <el-button v-if="!Boolean(refdata.CName)"
                @click="updateRefData('CName')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.CName)"
                @click="updateRefData('CName')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.CName)"
                @click="clearRefData('CName')"
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
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.IOTA)"
                @click="updateRefData('IOTA')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.IOTA)"
                @click="clearRefData('IOTA')"
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
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.Optional)"
                :disabled="commDisabled"
                @click="updateRefData('Optional')"
                type="success" size="mini" class="bas-btn-primary">
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
          <el-button type="Warning" class="bas-w-70 bas-btn-pink"
            :disabled="ctrl.inprogress"
            @click="deleteAll">
            {{$t('l.ClearAllConfiguration')}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="mulDialog.visible"
      :close-on-click-modal="false"
      :show-close="false"
      width="45%">
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
              <el-form :model="scope.row"  ref="scope.row">
                <el-input v-model="scope.row.val"
                size="mini"
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
  dateFormat,wei2Bas,isOwner
} from '@/utils'
import {
  getDomainType,
} from '@/utils/Validator.js'

import {
  validIPv4,
  validIPv6
} from '@/utils/refdata-utils.js'


import { getDomainDetail } from '@/web3-lib/apis/domain-api'
import {updateConfData,cleanConfData} from '@/web3-lib/apis/domain-conf-api'

import {NO_UPDATE_PERMISSIONS} from '@/web3-lib/api-errors'
import {
  dataShowDelimiter,
  str2ConfDatas,
  confDatas2Str,
} from '@/web3-lib/utils'

import { mapState } from 'vuex'

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
      return this.ctrl.inprogress || this.ctrl.cusInprogress
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
    ...mapState({

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
        isRoot:true,
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
        customedPrice:4.5*10**18,
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
        loading:true
      },
      singleDialog:{
        visible:false,
        item:'',
        typDict:'',
        loading:false
      },
      confirmDialog:{
        visible:false,
        openApplied:null,
        originOpenApplied:null,
        loading:false
      },
      approveWei:0,
      textarea:{
        maxRows:2,
        minRows:1
      }
    }
  },
  methods: {
    openAppliedChanged(val){
      console.log("model",this.asset.openApplied,val)
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
    confirmOpenApplied(){
      this.confirmDialog.loading =true;
      setTimeout(() => {
        this.confirmDialog.openApplied = null
        //this.asset.openApplied = this.confirmDialog.originOpenApplied
        this.confirmDialog.originOpenApplied = null;
        this.confirmDialog.visible = false;
        this.confirmDialog.loading =false;
      }, 6000);
    },
    customedPriceChanged(){

    },
    customedCheckedChange(){

    },
    async submmitCustomed(){// update Customed

    },

    clearRefData(type){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const hash = this.asset.hash
      const owner = this.asset.owner

      if(!isOwner(owner,wallet)){
        this.$message(this.$basTip.error(this.$t(`code.${NO_UPDATE_PERMISSIONS}`,{
          wallet:wallet,
          owner:owner
        })))
        return
      }

      this.ctrl.inprogress = true
      cleanConfData(type,hash,chainId,wallet).then(receipt=>{
        console.log(receipt)
        this.refdata[type] = ''
        this.ctrl.inprogress = false
      }).catch(ex=>{
        console.log(ex)
        this.ctrl.inprogress = false
      })


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
      console.log(datas)
      this.mulDialog.loading =true
      const datastr = confDatas2Str(datas)
      updateConfData(typName,hash,datas,chainId,wallet).then(receipt=>{

        console.log(receipt)
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
    addMultiItem(){
      const typ = this.mulDialog.typDict
      this.mulDialog.items.push({typ:typ,val:''})
    },
    removeItem(val,index){
      const items = this.mulDialog.items
      // if(items.length <= 1){
      //   const typName = this.$t(`l.RefData${this.mulDialog.typDict}`)
      //   const tip = this.$t('p.DomainRefDataTableLastDeleteTip',{typ:typName})
      //   this.$message(this.$basTip.warn(tip))
      //   return;
      // }
      this.mulDialog.items.splice(index,1)
    }
  },
  async mounted() {
    const ruleState = this.$store.getters["dapp/ruleState"]
    const domaintext = this.$route.params.domaintext
    const web3State = this.$store.getters['web3State']
    const chainId = web3State.chainId

    this.ruleState = Object.assign({},ruleState)
    this.vstate.subUnitBas = ruleState.subBas
    let that = this
    that.ctrl.loading = true
    getDomainDetail(domaintext,chainId).then(resp=>{
      console.log(resp,chainId)
      if(resp.state){
        const asset = resp.assetinfo
        that.asset = Object.assign({},asset)
        that.refdata = Object.assign({},resp.refdata)

        if(asset.openApplied && asset.isCustomed){
          that.vstate = Object.assign({},{subUnitBas:wei2Bas(asset.customPrice)})
        }
      }
       that.ctrl.loading = false
    }).catch(ex=>{
       that.ctrl.loading = false
      console.error(ex)
    })
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

div.refdata-btns button {
  margin: auto .25rem;
}
</style>
