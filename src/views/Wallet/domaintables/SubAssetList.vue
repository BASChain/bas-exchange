<template>
  <div>
    <el-table type="index"
      v-loading="tableLoading"
      :data="items" @cell-click="gotoDetail"
      style="width: 100%">
      <el-table-column
        :class-name="'bas-link'"
        prop="domaintext"
        index="domain"
        :label="$t('l.Domain')"
        >
      </el-table-column>
      <el-table-column
        prop="expire"
        sortable
        :label="$t('l.ExpiredDate')"
        :formatter="expireFormat"
        width="180">
      </el-table-column>
      <el-table-column header-align="center"
        index="operate" width="380"
        align="right" :label="$t('l.Operating')">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button size="mini" type="default" >
              {{$t('l.MoreOperation')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="scope.row"
                :disabled="scope.row.hasExpired"
                @click.native="goSetting(scope.$index,scope.row)">
                {{$t('l.Configuration')}}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="handleShowTransout(scope.$index,scope.row)"
                :disabled="scope.row.hasExpired || scope.row.isorder">
                {{$t('l.TransOut')}}
              </el-dropdown-item>
              <el-dropdown-item
                :disabled="scope.row.rechargeYears <= 0"
                @click.native="handleShowRechage(scope.$index,scope.row)"
                >
                {{$t('l.Recharge')}}
              </el-dropdown-item>
              <!-- <el-dropdown-item
                @click.native="showMailDialog(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired || scope.row.isorder || scope.row.mailActived">
                {{$t('l.ActivationMailBtn')}}
              </el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>

          <el-button
            v-if="scope.row.isorder || !scope.row.hasExpiration"
            :disabled="scope.row.isorder"
            size="mini"
            :type="scope.row.isorder ? 'default':'success'"
            @click="handleShowSaleOn(scope.$index, scope.row)">
            {{$t('l.SaleOn')}}
          </el-button>
        </template>
      </el-table-column>

    </el-table>



    <el-dialog  width="25%"
      :close-on-click-modal="false"
      :show-close="!maskDialog.loading"
      :visible.sync="maskDialog.visible">
      <div slot="title" >
        <loading-dot v-if="maskDialog.loading" style="float:left;"/>
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
    <!-- mail dialog begin -->
    <el-dialog  width="30%"
      :close-on-click-modal="false"
      :show-close="!mailDialog.loading"
      :before-close="cancelMailDialog"
      :title="$t('l.EnableMailService')"
      :visible.sync="mailDialog.visible">
      <div class="contianer mail-dialog--body">
        <div class="row justify-content-center">
          <div class="col-10 text-center">
            <h4>
              {{$t('p.ConfirmOpenMailServieTip',{domaintext:mailDialog.domaintext})}}
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            <span  class="pr-3 text-danger">
              {{
                $t('p.EWalletActivationMailServiceNotice',{cost:this.mailServiceBas})
              }}
            </span>
          </div>
        </div>
      </div>

      <div class="dialog-footer bas-dialog-between" slot="footer">
        <div class="left-tips">
          <span class="bas-dialog-footer--tips">
            <loading-dot v-if="mailDialog.loading" style="float:right;"/>
          </span>
        </div>

        <div class="right-btn-group text-right">
          <el-button :disabled="mailDialog.loading"
            @click="cancelMailDialog">
            {{$t('g.Cancel')}}
          </el-button>
          <el-button :disabled="mailDialog.loading"
            @click="submitActivationMail">
            {{$t('g.Confirm')}}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {
  dateFormat,wei2Bas,
} from '@/utils'
import { mapState } from 'vuex'
import LoadingDot from '@/components/LoadingDot.vue'

import {
  PARAM_ILLEGAL,USER_REJECTED_REQUEST,UNSUPPORT_NETWORK,
  DOMAIN_NOT_EXIST,MAILSERVICE_HAS_ACTIVED,LACK_OF_TOKEN,
  DOMAIN_EXPIRED
} from '@/web3-lib/api-errors.js'
import {activationSubMailService} from '@/web3-lib/apis/mail-manager-api'


export default {
  name:"EWalletSubAssetList",
  components:{
    LoadingDot
  },
  computed: {
    ...mapState({
      items:state => state.ewallet.assets.filter( it => it.isRoot == false),
      mailServiceBas:state => wei2Bas(state.dapp.mailSeviceGas),
    })
  },
  data() {
    return {
      maskDialog:{
        visible:false,
        loaind:false,
        hash:null,
        title:'',
        contents:''
      },
      mailDialog:{
        visible:false,
        loading:false,
        owner:null,
        hash:null,
        domaintext:null
      }
    }
  },
  methods: {
    expireFormat(row,column,cellVal){
      return dateFormat(cellVal)
    },
    showMaskDialog(hash,loading,title){
      this.maskDialog = Object.assign({},this.maskDialog,{
        visible:true,
        loaind:loading,
        hash:hash,
        title:title,
        contents:''
      })
    },
    hideMaskDialog(){
      this.maskDialog = Object.assign({},this.maskDialog,{
        visible:false,
        loaind:false,
        hash:'',
        title:'',
        contents:''
      })
    },
    cancelMailDialog(){
      this.mailDialog = Object.assign(this.mailDialog,{
        visible:false,
        loading:false,
        hash:null,
        domaintext:null
      })
    },
    showMailDialog(index,row){
      this.mailDialog = Object.assign(this.mailDialog,{
        visible:true,
        loading:false,
        owner:row.owner,
        hash:row.hash,
        domaintext:row.domaintext
      })
    },
    gotoDetail(row, column, cell){
      if(!row.name || column.index !=='domain')return;
      const domaintext = row.domaintext
      this.$router.push({
        path:`/domain/detail/${domaintext}`
      })
    },
    handleShowSaleOn(row, column, cell){

    },
    goSetting(index,row){
      const domaintext = row.domaintext
      console.log(domaintext,row)

      this.$router.push({
        path:`/domain/updaterefdata/${domaintext}`,
        name:'domain.updaterefdata',
        params:{
          domaintext:domaintext,
          hash:row.hash,
          expire:row.expire,
          owner:row.owner,
          isRoot:row.isRoot,
          openApplied:row.openApplied,
          isCustomed:row.isCustomed,
          customedPrice:row.customedPrice
        }
      })
    },
    handleShowTransout(){

    },
    handleShowRechage(){

    },
    async submitActivationMail(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const hash = this.mailDialog.hash
      const domaintext = this.mailDialog.domaintext
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet;
      const owner = this.mailDialog.owner

      if(!hash ||!wallet){
        console.error('Params lost: hash,chainId,wallet')
        return
      }

      try{
        this.mailDialog.loading=true
        const assetpart = await activationSubMailService(hash,chainId,wallet)
        this.$store.dispatch('ewallet/updateAssetProps',assetpart)

        this.mailDialog = Object.assign({
          visible:false,
          loading:false,
          hash:null,
          domaintext:null
        })
      }catch(ex){
        this.mailDialog = Object.assign({
          visible:false,
          loading:false,
          hash:null,
          domaintext:null
        })
        console.log(ex)
        let msg = ''
        switch (ex) {
          case DOMAIN_EXPIRED:
          case DOMAIN_NOT_EXIST:
          case MAILSERVICE_HAS_ACTIVED:
            msg = this.$t(`code.${ex}`,{domaintext:domaintext})
            this.$message(this.$basTip.error(msg))
            break;
          case UNSUPPORT_NETWORK:
          case LACK_OF_TOKEN:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            break;
          case ACCOUNT_NOT_MATCHED:
            msg = this.$t(`code.${ex}`,{wallet,owner})
            this.$message(this.$basTip.error(msg))
            break;
          default:
            break;
        }

        if(ex.code === USER_REJECTED_REQUEST){
          msg = this.$t(`code.${ex.code}`,{wallet,owner})
          this.$message(this.$basTip.error(msg))
        }
      }
    }
  },
  mounted() {

  },
}
</script>
<style>

</style>
