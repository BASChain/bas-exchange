<template>
  <div class="container bg-white">
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

    <div v-if="!!asset.isRoot"
      class="row justify-content-center align-items-center">
      <div class="col-md-8 col-sm-10">
        <div class="pt-4 pb-2">
          <h5>{{$t('l.SubDomainConfiguration')}}</h5>
        </div>
      </div>

      <el-form label-width="220px"
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

    <div v-if="!!asset.isRoot"
      class="row justify-content-center align-content-center">
      <div class="pt-2 pb-2" style="width:90%;border-top:1px solid rgba(150,150,166,1);"></div>
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
      <el-form class="col-md-8 col-sm-10" label-width="140px">
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
                @click="updateRefData('A')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.A)"
                @click="updateRefData('A')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.A)"
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
                @click="updateRefData('Optional')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefAddDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.Optional)"
                @click="updateRefData('Optional')"
                type="success" size="mini" class="bas-btn-primary">
                {{$t('l.RefUpdateDataBtn')}}
              </el-button>
              <el-button v-if="Boolean(refdata.Optional)"
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
        <table cellspacing="0" cellpadding="0" class="refdata-multi-table">
          <tbody>
            <tr v-for="(it,idx) in mulDialog.items" :key="idx">
              <td class="refdata-label">
                {{multiLabel}} {{idx+1}}
              </td>
              <td width="60%">
                <el-input v-model="it.val"
                  :placeholder="multiInputPlaceholder"
                  class="refdata-multi-input"/>
              </td>
              <td class="refdata-row-btns">
                <span>
                  <i class="bas-el-icon el-icon-circle-plus" @click="addMultiItem"></i>
                </span>
                <span v-if="idx>0">
                  <i @click="removeItem(it.val)"
                    class="bas-el-icon el-icon-remove"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="dialog-footer" slot="footer">
        <el-button size="mini" :disabled="confirmDialog.loading"
          @click="cancelMulti">
          {{  $t('g.Cancel') }}
        </el-button>
        <el-button type="primary" class="bas-btn-primary"
          size="mini" :disabled="confirmDialog.loading"
          @click="submitMulti">
          {{  $t('g.Confirm') }}
        </el-button>
        <loading-dot v-if="confirmDialog.loading" style="float:left;"/>
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
  dateFormat,
} from '@/utils'
import {
  getDomainType,
} from '@/utils/Validator.js'

import {
  concatIP,
  splitIP,
  asciiToString,
  stringToAscii,
} from '@/utils/refdata-utils.js'

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
    ...mapState({

    })
  },
  data() {
    return {
      asset:{
        domaintext:"eth",
        owner:"0x0FD",
        expire:1737597600,
        hash:'0x',
        name:'0x657468',
        isRoot:true,
        openApplied:true,
        isCustomed:true,
        customedPrice:4.5*10**18,
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
        "A":'172.66.2.1,133.234.45.66,2.2.2.2,114.116.134.124,12.34.45.67',
        "AAAA":"",
        "MX":"",
        "BlockChain":"0xeB1eB91C6f9824af574D8273FA66e68F68fEEb72",
        "IOTA":"",
        "MXBCA":"",
        "CName":"alias",
        "Optional":""
      },
      mulDialog:{
        visible:false,
        items:[{typ:'A',val:''}],
        typDict:'A',
        loading:false
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

    },
    updateRefData(type){
      switch (type) {
        case 'A':
        case 'AAAA':
          this.openMulDialog(type)
          break;
        default:
          break;
      }
    },
    openMulDialog(typ){
      let items = splitIP(this.refdata[typ]).map(item=>{
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
    deleteAll(){

    },
    addMultiItem(){
      const typ = this.mulDialog.typDict
      this.mulDialog.items.push({typ:typ,val:''})
    },
    removeItem(val){
      console.log('>>>',val)
      const items = this.mulDialog.items
      console.log('items',items)
      const index = items.findIndex((it,idx)=>it.val == val)
      console.log(index)
      if(index>0){
        this.mulDialog.items.splice(index,1)
        console.log(this.mulDialog.items)
      }
    }
  },
  mounted() {
    const ruleState = this.$store.getters["dapp/ruleState"]
    const decimals = ruleState.decimals ||18;
    this.ruleState = Object.assign({},ruleState)

    const asset = this.asset
    if(asset.openApplied && asset.isCustomed && asset.customedPrice){
      this.vstate.subUnitBas = asset.customedPrice / (10 ** decimals)
    }else{
      this.vstate.subUnitBas = ruleState.subBas;
    }
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
