<template>
  <div>
    <el-table type="index"
      v-loading="loading"
      :data="items" @cell-click="gotoDetail"
      style="width: 100%">
      <el-table-column
        prop="fulltext"
        index="hash"
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
        :ormatter="hashShort"
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
  </div>
</template>

<script>
import {
  dateFormat,compressAddr,hasExpired
} from '@/utils'

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
    })
  },
  data() {
    return {

    }
  },
  methods: {
    expireFormat(row,column,cellVal){
      return cellVal ? dateFormat(cellVal) : ''
    },
    hashShort(row,column,cellVal){
      return compressAddr(cellVal)
    },
    gotoDetail(){

    },
    recharge4Mail(index,row){

    },
    abandonMail(index,row){

    },
    gotoUpdateMailInfo(index,row){

    }
  },
  mounted() {
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
