<template>
  <div>
    <el-table type="index"
      v-loading="loading"
      :data="items" @cell-click="gotoDetail"
      style="width: 100%">
      <el-table-column
        prop="domaintext"
        index="domain"
        :formatter="domainMailFormat"
        :label="$t('l.DomainMail')"
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
        prop="mailPublic"
        sortable
        :label="$t('l.MailIsOpenPublic')"
        :formatter="mailPublicFormat"
        width="180">
      </el-table-column>
      <el-table-column header-align="center"
        index="operate" width="380"
        align="right" :label="$t('l.Operating')">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button size="mini" type="default">
              {{$t('l.MoreOperation')}} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="scope.row"
                :disabled="scope.row.hasExpired"
                @click.native="goMailConf(scope.$index,scope.row)">
                {{$t('l.UpdateConfiguration')}}
              </el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.mailPublic"
                @click.native="cancelMailPublic(scope.$index,scope.row)"
                >
                {{$t('l.CancelMailToPublic') }}
              </el-dropdown-item>
              <el-dropdown-item
                :disabled="scope.row.rechargeYears <= 0"
                @click.native="closeMailService(scope.$index,scope.row)"
                >
                {{$t('l.DisableMailService')}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button
            v-if="!scope.row.mailPublic && !scope.row.isorder"
            size="mini"
            :type="scope.row.isorder ? 'default':'success'"
            @click="enableMailPublic(scope.$index, scope.row)">
            {{$t('l.OpenMailToPublic')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

     <!-- mask dialog begin -->
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
  </div>
</template>

<script>
import {
  dateFormat,
} from '@/utils'
import { mapState } from 'vuex'

import {
  UNSUPPORT_NETWORK,
  DOMAIN_NOT_EXIST,
  ACCOUNT_NOT_MATCHED,
  MAILSERVICE_ONLY_RARE_OPEN,
  MAILSERVICE_HAS_ACTIVED,
  USER_REJECTED_REQUEST
} from '@/web3-lib/api-errors.js'
import {removeDomainService} from '@/web3-lib/apis/mail-manager-api'

import LoadingDot from '@/components/LoadingDot.vue'
export default {
  name:"MailServers",
  components:{
    LoadingDot
  },
  computed: {

    ...mapState({
      items:state => state.ewallet.assets.filter( it=> it.mailActived)
    })
  },
  data() {
    return {
      loading:false,
      maskDialog:{
        visible:false,
        loaind:false,
        hash:null,
        title:'',
        contents:''
      }
    }
  },
  methods: {
    domainMailFormat(row,column,cellVal){
      return `@${cellVal}`
    },
    expireFormat(row,column,cellVal){
      return dateFormat(cellVal)
    },
    mailPublicFormat(row,column,cellVal){
      return cellVal ? this.$t('g.Y') : this.$t('g.N')
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
    gotoDetail(){

    },
    goMailConf(index,row){

    },
    cancelMailPublic(index,row){

    },

    async closeMailService(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const domaintext = row.domaintext
      const hash = row.hash
      if(!hash){
        console.error('no hash')
        return
      }

      try{
        this.showMaskDialog(hash,`@${domaintext}`,true)
        const assetpart = await removeDomainService(hash,chainId,wallet)

        this.$store.dispatch('ewallet/updateAssetProps',assetpart)
        this.hideMaskDialog()
      }catch(ex){
        console.log(ex)
        this.hideMaskDialog()
        let msg = ''
        switch(ex){
          case UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            break;
          case DOMAIN_NOT_EXIST:
            msg = this.$t(`code.${ex}`,{domaintext:domaintext})
            this.$message(this.$basTip.error(msg))
            break;
          case ACCOUNT_NOT_MATCHED:
            msg = this.$t(`code.${ex}`,{wallet,asset:domaintext})
            this.$message(this.$basTip.error(msg))
            break;
          default:
            break;
        }

        if(ex.code === USER_REJECTED_REQUEST){
          msg = this.$t(`code.${ex.code}`)
          this.$message(this.$basTip.error(msg))
        }
      }
    },
    enableMailPublic(index,row){

    }
  },
  mounted() {

  },
}
</script>
<style>

</style>
