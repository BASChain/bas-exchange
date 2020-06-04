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
        :label="$t('l.EWalletDomainMailServers')"
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
            v-if="(!scope.row.mailPublic && scope.row.isRare && !scope.row.isorder)"
            size="mini"
            :type="scope.row.isorder ? 'default':'primary'"
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
        <!-- <loading-dot v-if="maskDialog.loading" style="float:left;"/> -->
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

      <div class="dialog-footer bas-dialog-between" slot="footer">
        <div></div>
        <div class="left-tips pr-3">
          <span class="bas-dialog-footer--tips">
            <loading-dot v-if="maskDialog.loading" style="float:right;"/>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  dateFormat,
} from '@/utils'


import {
  PARAM_ILLEGAL,
  UNSUPPORT_NETWORK,
  DOMAIN_NOT_EXIST,
  ACCOUNT_NOT_MATCHED,
  MAILSERVICE_ONLY_RARE_OPEN,
  MAILSERVICE_INACTIVED,
  USER_REJECTED_REQUEST
} from '@/web3-lib/api-errors.js'
import {
  removeDomainService,toggleMailServicPublic
} from '@/web3-lib/apis/mail-manager-api'

import { checkSupport } from '@/web3-lib/networks'

import LoadingDot from '@/components/LoadingDot.vue'
export default {
  name:"MailServers",
  components:{
    LoadingDot
  },
  computed: {
    ...Vuex.mapState({
      items:state => state.ewallet.assets.filter( it=> it.mailActived)
    })
  },
  data() {
    return {
      loading:false,
      maskDialog:{
        visible:false,
        loading:false,
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
        loading:loading,
        hash:hash,
        title:title,
        contents:''
      })
    },
    hideMaskDialog(){
      this.maskDialog = Object.assign({},this.maskDialog,{
        visible:false,
        loading:false,
        hash:'',
        title:'',
        contents:''
      })
    },
    gotoDetail(){

    },
    goMailConf(index,row){
      const domaintext = row.domaintext
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      this.$router.push({
        path:`/mail/mailsvr/${domaintext}`,
        name:'mail.mailsvr',
        params:{
          domaintext:domaintext,
          hash:row.hash
        }
      })
    },
    async cancelMailPublic(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      console.log(row)
      if(!row.hash){
        console.error('no hash')
        return
      }

      await this.toggleMailServicPublic(row,false)

    },
    async enableMailPublic(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      //console.log(row)
      if(!row.hash){
        console.error('no hash')
        return
      }

      await this.toggleMailServicPublic(row,true)
    },
    async toggleMailServicPublic(row,isPublic){
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const domaintext = row.domaintext
      const hash = row.hash

      try{
        const title =this.$t(
          !isPublic ? 'p.ColseMailServiceToPublic': 'p.OpenMailServiceToPublic',
          {domaintext:domaintext}
        );
        this.showMaskDialog(hash,true,title)
        //console.log(hash,isPublic,title,chainId,wallet)
        const assetpart = await toggleMailServicPublic(hash,isPublic,chainId,wallet)
        //console.log(assetpart)
        //this.$store.dispatch('ewallet/updateAssetProps',assetpart)
        this.$store.dispatch('ewallet/updateEWalletAssetsIndexedDB',assetpart)
        this.hideMaskDialog()
      }catch(ex){
        let msg = ''
        switch (ex) {
          case PARAM_ILLEGAL:
            console.error(ex)
            return;
          case UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            break;
          case DOMAIN_NOT_EXIST:
          case MAILSERVICE_INACTIVED:
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

        console.log(ex)
        this.hideMaskDialog()
      }
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
        const title =this.$t('p.DisableMailService',{domaintext:domaintext})
        this.showMaskDialog(hash,true,title)

        const assetpart = await removeDomainService(hash,chainId,wallet)
        console.log('assetpart',assetpart)
        this.$store.dispatch('ewallet/updateEWalletAssetsIndexedDB',assetpart)
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
    }
  },
  beforeMount() {
    const web3State = this.$store.getters['web3State']
    if(web3State.chainId &&
      checkSupport(web3State.chainId) && web3State.wallet){
      this.$store.dispatch('ewallet/syncEWalletAssets',web3State)
    }
  },
  mounted() {

  },
}
</script>
<style>

</style>
