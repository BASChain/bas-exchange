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
      <el-table-column
        prop="type"
        :formatter="translateType"
          width="180"
        :label="$t('l.DomainType')">
      </el-table-column>
      <el-table-column header-align="center"
        index="operate" width="380"
        align="center" :label="$t('l.Operating')">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button size="mini" type="default" >
               {{$t('l.MoreOperation')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :disabled="scope.row.rechargeYears <= 0"
                @click.native="handleShowRechage(scope.$index,scope.row)"
                >
                {{$t('l.Recharge')}}
              </el-dropdown-item>
              <el-dropdown-item
                :command="scope.row"
                :disabled="scope.row.hadExpired"
                @click.native="goSetting(scope.$index,scope.row)">
               {{$t('l.Configuration')}}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="handleShowTransout(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired || scope.row.isorder">
                {{$t('l.TransOut')}}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="showActvationDialog(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired || scope.row.isorder || scope.row.mailActived">
                {{$t('l.ActivationMailBtn')}}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="goRegistSub(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired">
                 {{$t('l.RegistSubDomain')}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            :disabled="scope.row.isorder"
            size="mini"
            :type="scope.row.isorder ? 'default':'success'"
            @click="handleShowSaleOn(scope.$index, scope.row)">
            {{$t('l.SaleOn')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
            @click="submitActivationMail(false)">
            {{$t('l.ActivationOnlyInternal')}}
          </el-button>
          <el-button :disabled="mailDialog.loading"
            @click="submitActivationMail(true)">
            {{$t('l.ActivationExternal')}}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="css">
.mail-dialog--body{
  display: inline;
  justify-content: center;
}

</style>

<script>
import {
  dateFormat,hasExpired,wei2Bas
} from '@/utils'
import {
  getDomainType
} from '@/utils/Validator.js'

import {activationRootMailService} from '@/web3-lib/apis/mail-manager-api'
import {
  UNSUPPORT_NETWORK,
  DOMAIN_NOT_EXIST,
  ACCOUNT_NOT_MATCHED,
  MAILSERVICE_ONLY_RARE_OPEN,
  DOMAIN_TOP_EXPIRED,
  LACK_OF_TOKEN,
  MAILSERVICE_HAS_ACTIVED
} from '@/web3-lib/api-errors.js'

import { mapState } from 'vuex'
import LoadingDot from '@/components/LoadingDot.vue'
export default {
  name:"EWalletRootAssetList",
  components:{
    LoadingDot
  },
  computed: {
    ...mapState({
      items:state => state.ewallet.assets.filter( it =>{
        it.hadExpired = hasExpired(it.expire)
        return  it.isRoot == true
      }),
      mailServiceBas:state => wei2Bas(state.dapp.mailSeviceGas)
    })
  },
  data() {
    return {
      mailDialog:{
        visible:false,
        loading:false,
        hash:null,
        owner:null,
        domaintext:null
      }
    }
  },
  methods: {
    expireFormat(row,column,cellVal){
      return dateFormat(cellVal)
    },
    translateType(row){
      let domainType = getDomainType(row.domaintext)
      return this.$t(`g.${domainType}`)
    },
    gotoDetail(row, column, cell){
      if(!row.name || column.index !=='domain')return;
      const domaintext = row.domaintext
      this.$router.push({
        path:`/domain/detail/${domaintext}`
      })
    },
    handleShowSaleOn(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
    },
    goSetting(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const domaintext = row.domaintext
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
    handleShowTransout(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
    },
    handleShowRechage(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
    },
    goRegistSub(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const toptext = row.domaintext
      if(!row.openApplied){
        const msg = this.$t('code.200001',{roottext:toptext})
        this.$message(this.$basTip.error(msg))
        return
      }
      this.$router.push({
        path:`/domain/applysub/${toptext}`,
      })
    },
    //activation Mail
    cancelMailDialog(){
      this.mailDialog = Object.assign(this.mailDialog,{
        visible:false,
        loading:false,
        owner:null,
        hash:null,
        domaintext:null
      })
    },
    showActvationDialog(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const hash = row.hash
      const domaintext = row.domaintext
      this.mailDialog = Object.assign({},this.mailDialog,{
        visible:true,
        hash,
        owner:row.owner,
        domaintext
      })
    },
    async submitActivationMail(isPublic){
      console.log(">>>>>>>>>>>>>.",this.$store.getters['metaMaskDisabled'],isPublic)
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const ruleState = this.$store.getters["dapp/ruleState"]
      const domaintext =  this.mailDialog.domaintext
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet;
      const owner = this.mailDialog.owner

      //const isPublic = this.mailDialog.isPublic
      const hash = this.mailDialog.hash

      try{
        this.mailDialog.loading=true
        const resp = await activationRootMailService(hash,isPublic,chainId,wallet)
        console.log(resp)
        this.mailDialog = Object.assign({},{
          visible:false,
          loading:false,
          owner:null,
          hash:null,
          domaintext:null
        })

        //update My assets list
        const assetpart ={hash,mailActived:true,mailPublic:isPublic}
        this.$store.dispatch('ewallet/updateAssetProps',assetpart)
      }catch(ex){
        console.log(ex)
        this.mailDialog.loading=false
        let msg = ''
        switch (ex) {
          case MAILSERVICE_HAS_ACTIVED:
            msg = this.$t(`code.${MAILSERVICE_HAS_ACTIVED}`,{domaintext:domaintext})
            this.$message(this.$basTip.error(msg))
            break;
          case LACK_OF_TOKEN:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            break;
          case ACCOUNT_NOT_MATCHED:
            msg = this.$t(`code.${ex}`,{wallet,asset:domaintext})
            this.$message(this.$basTip.error(msg))
            break;
          default:
            break;
        }
      }
    }
  },
}
</script>
<style>

</style>
