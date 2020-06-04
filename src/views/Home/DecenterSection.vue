<template>
  <div class="container d-none d-md-block" ref="DecenterWrapper">
    <h1 class="section-title bas-pt-100">{{ $t('p.HomeDecenterSectionTitle') }}</h1>

    <el-row :gutter="24" class="bas-double-wrapper">
      <div class="bas-double--nav">
        <div class="bas-double--navl-icon" @click="moveCarousel(-1,$event)" disabled>
           <img src="/static/icons/arrow_left.png" >
        </div>
        <div class="bas-double--navr-icon" @click="moveCarousel(1,$event)">
           <img src="/static/icons/arrow_right.png" >
        </div>
      </div>
      <div class="bas-double">
        <div class="bas-double--overflow-container">
          <div class="bas-double--cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
            <div class="col-6 bas-double--card"
              v-for="(item,idx) in dataItems" :key="idx">
                <div>
                  <img :src="`/static/icons/${item.icon}_${item.suffix}`" class="img-fluid">
                </div>

                <div class="bas-double--card-body" >
                  <h5 class="inner-top">{{$t(`p.${item.captionI18n}`)}}</h5>
                  <p>{{$t(`p.${item.texti18n}`)}}</p>
                </div>
                <div class="bas-double--card-footer">
                  <a class="bas-text-green" @click="gotoDoSomething(item.operType)">
                    {{$t(`p.${item.footBtnI18n}`)}} <i class="fa fa-long-arrow-right"></i>
                  </a>
                </div>

            </div>
          </div>
        </div>
      </div>


    </el-row>
  </div>
</template>
<style>

h5.inner-top{
  margin-top: 1.5rem;
}

.bas-double-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bas-double {
  display: flex;
  justify-content: center;
  width: 100%;
}

.bas-double--overflow-container {
  overflow: hidden;
}

.bas-double--cards {
  display: flex;
  transition: transform 650ms ease out;
  transform: translateX(0px)
}

.bas-double--card {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
 /*  width: 50%; */
  height: 475px;
  padding-left:0 !important;
  padding-right:0 !important;
  border-collapse:collapse;
  border:1px solid rgba(235,237,237,1);
}

/* .bas-double--cards .bas-double--card:nth-child(2) {
  background:rgba(245,246,246,0.8);
} */

.bas-double--card:focus,.bas-double--card:hover {
  background:rgba(245,246,246,0.8);
}

.bas-double--cards .bas-double--card:first-child {
  margin-left: 2px;
  margin-right: 20px;
}

.bas-double--cards .bas-double--card:last-child {
  margin-left: 20px;
  margin-right: 2px;
}

.bas-double--card-cls {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 475px;
  margin: 0 4px;
  border: 1px solid #888;
}

.bas-double--card-img {
  position: relative;
  height: 200px;
  width: 100%;
  /* border: 1px dashed rgba(235,237,237,1); */
}

.bas-double--card-img-last {
  height: 240px;
}

.bas-double--card-body {
  margin: auto .5rem;
}

.bas-double--card-body>h5 {
  text-align: center;
}

.bas-double--card-body>p {
  font-size:14px;
}

.bas-double--card-footer {
  display: inline-flex;
  height: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-collapse:collapse;
  border-top: 1px solid rgba(0,202,155,.1);
  background:rgba(0,202,155,.1);
}

.bas-double--nav {
  position: absolute;
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  z-index: 999;
}

.bas-double--nav img {
  opacity: .2;
}


.bas-double--nav img:hover {
  transition: transform 50ms ease-in-out;
  opacity: .7;
}

.bas-double--navl-icon {
  cursor: pointer;
  margin-left: -50px;
}

.bas-double--navr-icon {
  cursor: pointer;
  margin-right:-50px;
}

</style>

<script>
//import { _ } from 'lodash'

export default {
  name:"DecenterSection",
  computed:{
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
    dataItems(){
      const suffix = this.$store.state.lang.toLowerCase();
      return this.items.map(item =>{
        item.suffix = `${suffix}.png`
        return item
      })
    },
    ...Vuex.mapState({
      i18nSuffix:state => state.lang.toLowerCase(),
      isCN:state => state.lang === 'zh-CN'
    })
  },
  data() {
    return {
      currentOffset:0,
      windowSize:2,
      paginationFactor:752.5,
      captionTitle:"完全去中心化",
      items:[
        {
          "icon":"home_decenter_wf1",
          "caption":"域名注册",
          "text":"Bas chain可直接注册域名，以实时的记账形式消耗BAS数字货币，并有效避免了传统域名 注册的多层级操作以及时间长、费用高等问题",
          "footBtn":"去注册",
          "captionI18n":"HomeDecentSectionFL1SubTitle",
          "texti18n":"HomeDecentSectionFL1Contents",
          "footBtnI18n":"HomeDecentSectionFL1Btn",
          "operType":"gotoApply",
          "faCls":"fa fa-long-arrow-right"
        },
        {
          "icon":"home_decenter_wf2",
          "text":"bas使交易信息更透明化、公开化；域名所有权归秘钥所有者，不必担心被强制变更的风 险；"
            +"bas更加智能可自动执行合约，无需值守，有效的避免中间商赚取差价的行为；命名 支持任何语言，"
            +"无法抢注，采用区块链交易，像比特币一样安全",
          "caption":"域名交易",
          "operType":"gotoMarket",
          "footBtn":"去交易",
          "captionI18n":"HomeDecentSectionFL2SubTitle",
          "texti18n":"HomeDecentSectionFL2Contents",
          "footBtnI18n":"HomeDecentSectionFL2Btn",
          "faCls":"fa fa-long-arrow-right"
        },
        {
          "icon":"home_decenter_wf3",
          "text":"bas域名信息变更速度更快，通过矿机打包成功即完成一次变更， 时长不超过20s",
          "caption":"加入矿池",
          "footBtn":"去申请",
          "captionI18n":"HomeDecentSectionFL3SubTitle",
          "texti18n":"HomeDecentSectionFL2Contents",
          "footBtnI18n":"HomeDecentSectionFL3Btn",
          "operType":"gotoSupperNode",
          "faCls":"fa fa-long-arrow-right"
        },
      ]
    }
  },
  mounted(){
    const width = this.$refs.DecenterWrapper.clientWidth;
    this.paginationFactor = (width)/2+22.5;
    const that = this;
    // window.onresize = _.debounce(()=>{
    //   if(that.$refs.DecenterWrapper){
    //     const w = that.$refs.DecenterWrapper.clientWidth
    //     console.log('Decenter Resize>>>>',document.body.clientWidth,w/2)
    //     that.paginationFactor = w/2 + 22.5;
    //     that.currentOffset = 0;
    //   }
    // },400)
  },
  methods:{
    moveCarousel(direction,event) {
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
    gotoWhois(domain){
      if(!domain)return;
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$router.push({
        path:`/domain/detail/${domain}`
      })
    },
    gotoDoSomething(type){
      switch (type) {
        case 'gotoApply':
          this.$router.push({path:'/apply'})
          break;
        case 'gotoMarket':
           this.$router.push({path:'/market'})
          break;
        case 'gotoSupperNode':
           this.$router.push({path:'/agent'})
          break;
        default:
          break;
      }
    }
  }
}
</script>
