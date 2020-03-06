<template>
  <div>
    <el-row :gutter="20" class="bas-white-bg" >
      <el-col :span="24" class="bas-mine-table--header">
        <h5 style="margin-bottom:0rem;">域名资产</h5>
        <div>
          <!-- <el-button class="bas-btn-primary" size="medium" >
          转入
          </el-button> -->
          <el-button type="success">
          转入域名<i class="fa fa-qrcode bas-fa-qrcode"></i>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-table type="index"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="域名"
          width="260">
        </el-table-column>
        <el-table-column
          prop="date"
          label="到期日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          sortable
          label="类型">
        </el-table-column>
        <el-table-column header-align="center"
          index=""
          align="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="goSetting(scope.$index, scope.row)">
              去配置
            </el-button>

            <el-button
              size="mini"
              @click="takeOff(scope.$index, scope.row)">
              转出
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="transOut(scope.$index, scope.row)">
              出售
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row :gutter="20" class="bas-white-bg">
        <el-pagination class="text-center"
          :page-size="5"
          layout="prev, pager, next"
          :total="30">
        </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"MineDomainList",
  data() {
    return {
      tableData: [{
        date: '2022-05-02',
        name: 't1.lanbery',
        type: '二级域名'
      }, {
        date: '2021-05-04',
        name: 'expiredtest2',
        type: '顶级5字符内域名'
      }, {
        date: '2016-05-01',
        name: 'expiredtest1',
        type: '子域名'
      }, {
        date: '2028-05-03',
        name: 'lanbery',
        type: '顶级5字符内域名'
      }]
    }
  },
  methods:{
    transIn(){//转入

    },
    transOut(index,row){

    },
    takeOff(index,row){//下架

    },
    pushOn(index,row){//上架

    },
    goSetting(index,row){//去配置
      //console.log(row.name)
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$router.push({
        name:'domain.subsettings',
        params:{
          domain:row.name
        }
      })
    }
  }
}
</script>
<style>
.bas-fa-qrcode {
  margin: auto .5rem;
  font-size:18px;
}

.bas-mine-table--header{
  width: 100%;
  text-align: left;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(245,246,246,1);
}
.bas-mine-table--header>h5,.bas-mine-table--header>div{
  margin-top: .75rem;
  margin-bottom: 1rem;
}
.bas-mine--domain-pagination {
  text-align: center;
}

.bas-btn-primary:active {
  background-color:rgba(0,202,155,1) !important;
}

</style>
