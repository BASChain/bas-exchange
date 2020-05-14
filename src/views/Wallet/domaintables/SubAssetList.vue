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
        align="center" :label="$t('l.Operating')">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.isorder"
            size="mini"
            :type="scope.row.isorder ? 'default':'success'"
            @click="handleShowSaleOn(scope.$index, scope.row)">
            {{$t('l.SaleOn')}}
          </el-button>

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
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>

import {
  dateFormat,
} from '@/utils'
import { mapState } from 'vuex'



export default {
  name:"EWalletSubAssetList",
  computed: {
    ...mapState({
      items:state => state.ewallet.assets.filter( it => it.isRoot == false)
    })
  },
  data() {
    return {

    }
  },
  methods: {
    expireFormat(row,column,cellVal){
      return dateFormat(cellVal)
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
  },
  mounted() {

  },
}
</script>
<style>

</style>
