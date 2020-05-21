<template>
  <div>
    <el-table type="index"
      v-loading="loading"
      :data="items" @cell-click="gotoDetail"
      style="width: 100%">
      <el-table-column
        prop="fulltext"
        index="hash"
        :formatter="mailtextShow"
        :label="$t('l.DomainMail')"
        >
      </el-table-column>
      <el-table-column
        prop="expiration"
        sortable
        :label="$t('l.ExpiredDate')"
        :formatter="expireFormat"
        width="180">
      </el-table-column>

      <el-table-column
        prop="bca"
        sortable
        :label="$t('l.RefDataMXBCA')"
        :formatter="hashShort"
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
                :disabled="scope.row.invalid"
                @click.native="gotoUpdateMailInfo(scope.$index,scope.row)">
                {{$t('l.UpdateTagLabel')}}
              </el-dropdown-item>
              <el-dropdown-item
                :command="scope.row"
                @click.native="abandonMail(scope.$index,scope.row)"
                >
                {{$t('l.AbandonLabel') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button
            size="mini"
            :type="scope.row.isorder ? 'default':'success'"
            @click="recharge4Mail(scope.$index, scope.row)">
            {{$t('l.RechargeLabel')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20" class="bg-white" style="margin:0px;">
      <div class="bg-white" style="height:25px;"></div>
      <div class="float-table-total">
        <span >
          {{$t('l.TableTotal')}} {{itemTotal}} {{$t('l.TableRecord')}}
        </span>
        <span @click="reloadRecords">
          <i class="fa fa-refresh"></i>
        </span>
      </div>
    </el-row>

    <!-- Dialog -->
    <el-dialog  width="30%"
      :close-on-click-modal="false"
      :show-close="!confirm.loading"
      :before-close="cancelConfirmDialog"
      :title="confirm.title"
      :visible.sync="confirm.visible">

      <div class="contianer mail-dialog--body">
        <div class="row justify-content-center">
          <div class="col-10 text-center">
            <h4>
              {{confirm.contents}}
            </h4>
          </div>
        </div>
      </div>

      <div class="dialog-footer bas-dialog-between" slot="footer">
        <div class="left-tips">
          <span class="bas-dialog-footer--tips">
            <loading-dot v-if="confirm.loading" style="float:right;"/>
          </span>
        </div>

        <div class="right-btn-group text-right">
          <el-button :disabled="confirm.loading"
            @click="cancelConfirmDialog">
            {{$t('g.Cancel')}}
          </el-button>
          <el-button :disabled="confirm.loading"
            @click="submitAbandon">
            {{$t('l.Confirm')}}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  dateFormat,compressAddr,hasExpired
} from '@/utils'

import {
  PARAM_ILLEGAL,USER_REJECTED_REQUEST,UNSUPPORT_NETWORK ,
  MAIL_HASH_INVALID,ACCOUNT_NOT_MATCHED
}from '@/web3-lib/api-errors'
import {abandonedMail} from '@/web3-lib/apis/mail-manager-api'

import { mapState } from 'vuex'
import LoadingDot from '@/components/LoadingDot.vue'
export default {
  name:"EWalletMailList",
  components:{
    LoadingDot
  },
  computed: {
    ...mapState({
      items:state => state.ewallet.mails.map(m => {
        m.fulltext = `${m.aliasName}@${m.domaintext}`
        m.invalid = hasExpired(m.expiration)
        return m
      })
    }),
    itemTotal(){
      return this.items.length
    }
  },
  data() {
    return {
      confirm:{
        visible:false,
        loading:false,
        contents:'',
        title:'',
        hash:'',
        fulltext:''
      }
    }
  },
  methods: {
    expireFormat(row,column,cellVal){
      return cellVal ? dateFormat(cellVal) : ''
    },
    hashShort(row,column,cellVal){
      return compressAddr(cellVal)
    },
    mailtextShow(row,column,cellVal){
      const shortAlias = compressAddr(row.hash)
      return row.aliasName ? `${row.aliasName}@${row.domaintext}` : `${shortAlias}@${row.domaintext}`
    },
    gotoDetail(){

    },
    recharge4Mail(index,row){

    },
    cancelConfirmDialog(){
      this.confirm = Object({},{
        visible:false,
        loading:false,
        contents:'',
        title:'',
        hash:'',
        fulltext:''
      })
    },
    abandonMail(index,row){
      console.log(row.hash)
      this.confirm = Object.assign({},{
        visible:true,
        loading:false,
        contents:this.$t('p.EWalletMailAbandonedDialogConfirmContent',{text:row.fulltext}),
        title:this.$t('p.EWalletMailAbandonedDialogTitle',{text:row.fulltext}),
        hash:row.hash,
        fulltext:row.fulltext,
        owner:row.owner
      })
    },
    async submitAbandon(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const owner = this.confirm.owner

      const fulltext = this.confirm.fulltext

      const hash = this.confirm.hash
      if(!hash){
        console.error('null hash')
        return
      }

      try{
        this.confirm.loading = true
        const ret = await abandonedMail(hash,chainId,wallet)
        this.confirm = Object({},{
          visible:false,
          loading:false,
          contents:'',
          title:'',
          hash:'',
          fulltext:'',
          owner:''
        })
        this.$store.dispatch('ewallet/updataMyMailProps',ret)
      }catch(ex){
        this.confirm.loading = false
        let msg = ''
        switch (ex) {
          case PARAM_ILLEGAL:
            console.error(ex)
            return;
          case UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return;
          case ACCOUNT_NOT_MATCHED:
            msg = this.$t(`code.ex`,{wallet,owner})
            this.$message(this.$basTip.error(msg))
            return
          case MAIL_HASH_INVALID:
            msg = this.$t(`code.${ex}`,{text:fulltext})
            this.$message(this.$basTip.error(msg))
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
    gotoUpdateMailInfo(index,row){
      console.log(row)
      //hash, fulltext
      const hash = row.hash
      const domaintext = row.domaintext

      if(hash && domaintext){
        this.$router.push({
          path:`/mail/detail/${hash}/${domaintext}`,
          name:'mail.detail',
          params:{
            hash:hash,
            domaintext
          }
        })
      }
    },
    reloadRecords(){
      const web3State = this.$store.getters['web3State']
      console.log("reload","ewallet/loadEWalletMails",web3State)
      if(web3State.chainId && web3State.wallet){
        this.$store.dispatch('ewallet/loadEWalletMails',web3State)
      }
    }
  },
  async mounted() {
    const web3State = this.$store.getters['web3State']
    console.log("ewallet/loadEWalletMails",web3State)
    if(web3State.chainId && web3State.wallet){
      this.$store.dispatch('ewallet/loadEWalletMails',web3State)
    }

  },
}
</script>
<style>

</style>
