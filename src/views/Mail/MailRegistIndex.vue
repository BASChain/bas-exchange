<template>
  <div class=" mail-regist-wrapper">
    <div class="container inner-center-container">
        <div class="row justify-content-center ">
          <div class="col-md-5 col-sm-8 mail-content-card">
            <div class="header-logo">
              <img src="/static/icons/logo_header_blk.png" class="img-fluid">
            </div>
            <div class="header-title">
              <h5 class="mail-regist-title">
                申请邮箱账号
              </h5>
            </div>

            <div class="mail-regist-form-wrapper">
              <el-form label-position="top" label-width="120px">
                <div class="mail-input-container">
                  <el-form-item class="w-100">
                    <template>
                      <el-input class="mail-input" v-model="mailName"
                        :placeholder="$t('p.MailRegistInputPlaceholder')"
                        type="text">
                        <div slot="suffix" class="mail-domain--suffix-wrapper">
                          <div class="mail-domaintext-show">
                            <span>{{showMailtext}}</span>
                          </div>
                          <div class="mail-toggle-icon" @click="mailPoperToggle">
                            <i class="fa" :class="toggleIconClass"></i>
                          </div>
                        </div>
                      </el-input>
                    </template>
                  </el-form-item>

                  <div v-if="mailPoper.visible" class="mail-domain--poper">
                    <div class="row row-container">
                      <div v-for="(m,index) in mailassets"
                        @click="SelectedMailDomainHandle(m.domaintext,m.hash)"
                        :key="index"
                        class="bas-col-20">
                          <span class="mailtext">{{'@'+m.domaintext}}</span>
                      </div>
                    </div>
                    <div class="mail-domain--poper-footbar">
                      <el-input size="mini"
                        v-model="mailPoper.filterkey"
                        :placeholder="$t('p.MailPublicFilterKeyTips')"
                        :disabled="mailPoper.loading"
                        @keyup.enter.native="filterTopDomain"
                        class="sub-filter-input">
                          <div slot="suffix" @click="filterMailDomain">
                             <i class="fa fa-search" ></i>
                          </div>
                      </el-input>
                      <el-button
                        :disabled="mailPoper.loading"
                        @click="reloadMailAssets"
                        type="default" size="mini">
                        {{$t('l.ReloadRootAssets')}}
                      </el-button>
                      <el-button
                        @click="hideMailAssetPoper"
                        type="default" size="mini">
                        {{$t('l.ChevronUp')}}
                      </el-button>
                    </div>
                  </div>
                </div>

                <el-form-item label="购买年限">
                  <div class="years-select-container">
                    <div v-for="idx in maxMailRegYears"
                      :key="idx"
                      class="mail-year-selector">
                      <div class="year-inner-box"
                        @click="selectYearsHandle(idx)"
                        :class="idx == years ? 'year-active' : ''">
                        <div v-if="idx == years">
                          <div class="year-active-icon">
                          </div>
                        </div>
                        <div class="bas-total">
                          {{(idx)* parseFloat(unitBas)}}
                        </div>
                        <div class="mail-years">
                          <span>{{idx}}</span>
                          <span>{{$t('l.Years')}}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </div>

            <div class="mail-regist-btns">
              <el-button type="primary" class="bas-btn-primary w-100">
                注册
              </el-button>
            </div>
          </div>
        </div>

    </div>
  </div>
</template>
<style lang="css">
.mail-domain--suffix-wrapper {
  position: relative;
  width: 160px;
  height: 100%;
  display: inline-flex;
  direction: row;
  justify-content: flex-end;
  align-items: center;
}

.mail-domaintext-show {
  margin-right: .25rem;
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:25px;
}
.mail-input i.fa{
  cursor: pointer;
  color:rgba(4,6,46,.75);
  font-size:16px;
  font-weight: 500;
}

.mail-input input.el-input__inner {
  color:rgba(4,6,46,.75);
  font-size:18px;
}

.mail-input input.el-input__inner:focus {
  border-color: rgba(4,6,46,.35);
}


.mail-input-container {
  position: relative;
  width: 100%;
  direction: inline;
}

.mail-input-container div.el-form-item {
  margin-bottom: 0px;
}
.mail-domain--poper {
  /* position: absolute;
  float: right; */
  width: 100%;
  /* top:42px; */
  /* left: 50%;
  transform: translateX(-50%); */
  z-index: 9999;
  background: #fff;
  border-collapse:collapse;
  color:rgba(4,6,46,1);
  box-shadow: 0 1px 14px 0 rgba(0,0,0,.1);
  box-sizing: border-box;
  transition:ease-in-out .3s;
}

.row-container {
  margin: 0;
  max-height: 202px;
  min-height: 32px;
  overflow-x: hidden;
  overflow-y: auto;
}

.sub-filter-input span.el-input__suffix div {
  cursor: pointer;
  line-height: 28px;
}

.mail-domain--poper div.bas-col-20 {
  cursor: pointer;
  width: 20%;
  margin-right:-1px;
  margin-bottom:-1px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(235,237,237,1);
  text-align: center;
  transition:ease-in-out .2s;
  font-weight: 400;
}

.mail-domain--poper div.bas-col-20:hover{
  background:rgba(235,237,237,.85);
}

.bas-col-20 span {
  line-height: 48px;
}

.mail-domain--poper-footbar {
  width: 100%;
  display: inline-flex;
  justify-content: flex-end;
  border-collapse:collapse;
  margin: 1px;
}
</style>
<script>
import {
  dateFormat,  wei2Bas,
  handleDomain,toUnicodeDomain,
} from '@/utils'

import { mapState } from 'vuex'
export default {
  name:"MailRegistIndex",
  components:{},
  computed: {
    toggleIconClass(){
      return this.mailPoper.visible ? 'fa-chevron-up' : 'fa-chevron-down'
    },
    showMailtext(){
      if(this.mailDomainHash === ''|| this.mailDomainText === null) return ''
      return `@${this.mailDomainText}`
    },
    ...mapState({
      unitBas:state => wei2Bas(state.dapp.mailRegGas || 2),
      maxMailRegYears:state => state.dapp.maxMailRegYears,
      mailassets:state => state.dapp.mailassets ? state.dapp.mailassets : [],
    })
  },
  data() {
    return {
      years:1,
      mailDomainText:'',
      mailDomainHash:'',
      mailName:'',
      mailPoper:{
        visible:false,
        loading:false,
        filterkey:''
      }
    }
  },
  methods: {
    selectYearsHandle(years){
      console.log('<>>>>>',years)
      this.years = years <=0 || years > this.maxMailRegYears ? this.maxMailRegYears : years
    },
    mailPoperToggle(){
      this.mailPoper.visible = !this.mailPoper.visible
    },
    filterMailDomain(){

    },
    async reloadMailAssets(){
      this.mailPoper.loading = true
      await  this.$store.dispatch('dapp/loadPublicMailDomains')
      this.mailPoper.loading = false
    },
    hideMailAssetPoper(){
      this.mailPoper.visible = false
    },
    SelectedMailDomainHandle(text,hash){
      console.log(text,hash)
      this.mailDomainText = text
      this.mailDomainHash = hash
      this.mailPoper.visible = false
    },
    async loadPublicMailDomainOnMount(){
      await this.$store.dispatch('dapp/loadPublicMailDomains')

      const mailassets = this.$store.state.dapp.mailassets
      console.log(mailassets)
      if(mailassets && mailassets.length){
        this.mailDomainText = mailassets[0].domaintext
        this.mailDomainHash = mailassets[0].hash
      }
    }

  },
  async mounted() {

    //load public mail assets

    setTimeout(async () => {
      await this.loadPublicMailDomainOnMount()
    }, 1000);
  },
}
</script>
<style>
.mail-regist-wrapper {
  background-color: rgba(255,255,255,1);
  min-height: calc( 100vh - 425px);
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  direction: column;
}

.mail-content-card {
  display: inline-flexbox;
  direction: column;
  justify-content: flex-start;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  align-items: stretch;
  border-radius:4px;
  border:2px solid rgba(225,229,229,1);
}

.mail-regist-title {
  line-height: 30px;
  font-size: 22px;
  margin: 1.5rem auto;
  width: 100%;
  text-align: left;
}

.years-select-container {
  width: 100%;
  display: inline-flex;
  direction: row;
  justify-content: flex-start;
  align-items: center;
}

.mail-year-selector div.bas-total {
  font-size:20px;
  font-family:Lato-Semibold,Lato;
  font-weight:600;
  color:rgba(4,6,46,1);
  line-height:24px;
  letter-spacing:1px;
}

.mail-year-selector div.bas-total::after{
  content:'BAS';
  font-size: 14px;
  margin-left: -.4rem;
}

.mail-years {
  font-size:1rem;
}

.mail-year-selector .year-active div.bas-total{
  color:#fff;
}

.years-select-container div.mail-year-selector{
  width: 25%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
}

.year-inner-box {
  cursor: pointer;
  position: relative;
  width: 100%;
  display: inline-flexbox;
  justify-content: center;
  align-items: center;
  color:rgba(4,6,46,1);
  background:rgba(245,246,246,1);
  border-radius:1px;
  border:1px solid rgba(245,246,246,1);
}

.year-active-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  float:right;
  top: 0px;
  right: 0px;
  background: url('./assets/years-select.png') no-repeat;
  background-size: 100% 100%;
  z-index: 99;
}

.years-select-container div.year-active {
  color:#fff;
  background:rgba(0,202,155,1);
  border-radius:1px;
  border:1px solid rgba(245,246,246,1);
}

.years-select-container div.year-active:focus ,.years-select-container div.year-active:hover{
  opacity: .85;
}

.year-inner-box>div{
  width: 100%;
  text-align: center;
}
</style>
