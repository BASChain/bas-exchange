<template>
  <div>
    <div class="bas-card--ctrlbar">
      <div class="bas-card--ctrlbar-text">
        <div class="bas-hash">
          <i class="fa fa-circle-o bas-dot"></i>
            {{ info.owner}}
        </div>
      </div>
      <div class="bas-card--ctrlbar-text"
        @click="toggleCard()"
        >
        <i class="fa" :class="toggleClass"></i>
      </div>
    </div>
    <div class="bas-carousel--card--body" :class="getDisabled">
      <div>
        <span class="bas-card--body-label">
          {{ $t('p.ApplyCardDomainType') }}
        </span>
        <span>
          {{i18nType}}
        </span>
      </div>
      <div class="d-none">
        <span class="bas-card--body-label">
          {{$t('p.ApplyCardDomainExpire')}}
        </span>
        <span>
          {{ expireDate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat, toUnicodeDomain } from '@/utils'
import {getDomainType} from '@/utils/Validator'
export default {
  name:"DomainCardBody",
  data() {
    return {
      domain:'',
      bodyOpened:false,
      expireDate:'',
      domainType:''
    }
  },
  props: {
    info:{
      default:{},
      type:Object,
      required:true
    }
  },
  mounted(){
   // console.log(this.info)
    this.bodyOpened = Boolean(this.info.name)
    this.domain = this.info.name ? toUnicodeDomain(this.info.name) : ''
    this.expireDate = this.info.expire ? dateFormat(this.info.expire,'YYYY-MM-DD HH:mm:ss') : ''
    this.domainType = this.transDomainType(this.info.name)
  },
  computed: {
    getExpireDate(){
      console.log(this.info)
      if(!this.info || this.info.expire) return ''
      return dateFormat(this.info.expire)
    },
    getInfo(){
      return this.info
    },
    getToggleState() {
      return Boolean(this.info.cardToggleState)
    },
    toggleClass() {
      return Boolean(this.bodyOpened) ? 'fa-chevron-down' :'fa-chevron-up'
    },
    getDisabled(){
      return Boolean(this.bodyOpened) ? '' : 'bas-carousel--card--body-none'
    },
    i18nType(){
      const name = this.info.domaintext
      return  name ? this.$t(`g.${getDomainType(name)}`) : ''
    }
  },
  methods:{
    toggleCard(){
      this.bodyOpened = !this.bodyOpened
    },
    transDomainType(name) {
      if(!name)return ''
      const type = getDomainType(name)
      return this.$t(`g.${type}`)
    }
  }
}
</script>
<style>
.bas-card--ctrlbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  vertical-align: bottom;
  padding: 0px;
  font-size: 14px;
}

.bas-hash {
  word-break: break-all;
  text-overflow:ellipsis;
  font-size: 14px;
}

.bas-carousel--card--header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  vertical-align: bottom;
	border-bottom: 1px solid rgba(225,229,229,1);
	padding: .25rem 0px;
}

.bas-carousel--card--header:first-child {
  margin-left: 2px;
}

.bas-carousel--card--header:last-child {
  margin-right: 2px;
}

.bas-card--header--inline {
  display: inline-block;
}

.bas-card--header-domain {
  height:20px;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:24px;
}

.bas-card--hearder-btn {
  margin: 5px auto;
  /* min-width: 112px; */
  /* height:; */
  padding: 5px;
  border-radius:2px;
}

.bas-carousel--card--body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
  transition-duration: 3s;
  transition-timing-function: ease;
  transition-delay: 0s;
}

.bas-carousel--card--body-none {
  display: none;
  transition-duration: 3s;
  transition-property: all;
  transition-timing-function: ease;
  transition-delay: 0s;
}

.bas-card--body-label::after {
  content: ':';
  margin-right:4px;
}

</style>
