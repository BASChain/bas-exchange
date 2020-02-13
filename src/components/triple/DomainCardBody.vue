<template>
  <div>
    <div class="bas-card--ctrlbar">
      <div class="bas-card--ctrlbar-text">
        <div class="bas-hash">
          <i class="fa fa-circle-o bas-dot"></i>
            {{ info.basHash}}
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
          {{info.domainType}}
        </span>
      </div>
      <div>
        <span class="bas-card--body-label">
          {{$t('p.ApplyCardDomainExpire')}}
        </span>
        <span>
          {{ info.expireDate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DomainCardBody",
  data() {
    return {
      bodyOpened:false,
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
    this.bodyOpened = Boolean(this.info.domain)
  },
  computed: {
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
    }
  },
  methods:{
    toggleCard(){
      this.bodyOpened = !this.bodyOpened
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
}
.bas-dot {
  font-size:12px;
  border-radius: 16px;
  color: rgba(0,202,155,1);
  background-color:rgba(255,255,255,.75);

}
.bas-hash {
  font-size: 14px;
}

.bas-carousel--card--header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size:20px;
  vertical-align: bottom;
	border-bottom: 1px solid rgba(225,229,229,1);
	padding: 7px 0px;
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
  height:24px;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:24px;
}

.bas-card--hearder-btn {
  margin: 5px auto;
  min-width: 112px;
  height:42px;
  padding: 5px;
  background:rgba(0,202,155,1);
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
