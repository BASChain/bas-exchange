<template>
<div class="container">
  <div class="row justify-content-center" v-if="hasCaption">
    <h3 class="bas-carousel-caption">
      {{ $t(`p.${captionText}`) }}
    </h3>
  </div>
  <div :id="tripleId"
    class="bas-carousel-wrapper">
    <div class="bas-carousel--nav__left" @click="moveCarousel(-1,$event)" :disabled="atHeadOfList">
      <bas-arrow arrowType="left"   />
    </div>
    <div class="bas-carousel">
      <div class="bas-carousel--overflow-container">
        <div class="bas-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
          <div class="bas-carousel--card col-lg-4 col-md-6" v-for="(item,idx) in items" :key="idx">
            <div class="bas-carousel--card--header">
              <div class="bas-card--header--inline bas-card--header-domain">
                {{ item.domaintext || item.name }}
              </div>
              <div class="bas-card--header--inline">
                <span>
                  {{ item.openApplied ? $t('l.HadOpenAppliedSubRegisting') : '' }}
                </span>
                <a class="bas-card--hearder-btn btn bas-btn-primary" @click="gotoWhois(item.domaintext)">Who is</a>
              </div>
            </div>
            <domain-card-body :info="item" />
            <div class="bas-carousel--card--footer">
                <!-- <p>{{ item.name }}</p>
                <p class="tag"
                  v-for="(tag,index) in item.tag" :class="index &gt; 0 ? 'secondary' : ''"
                  :key="index">
                  {{ tag }}
                </p> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bas-carousel--nav__right" @click="moveCarousel(1,$event)" :disabled="atEndOfList">
      <bas-arrow arrowType="right"  />
    </div>
  </div>
</div>

</template>

<style>

/** add start */

.bas-carousel--card--header {
  display: flex;
  align-items: center;
}

/** add end */
</style>

<script>
import BasArrow from '@/components/carousel/BasArrow.vue'
import DomainCardBody from './DomainCardBody.vue'
import {checkSupport4Search} from '@/bizlib/web3'

export default {
  name:"TripleCards",
  data(){
    return {
      currentOffset: 0,
      windowSize: 1,
      paginationFactor:475,
      cardBodyPrefix:"basCardBody_",
    }
  },
  props:{
    id:{
      type:[String,Number],
      required:true
    },
    captionText:String,
    intPaginationFactor:{
      default:475,
      type:[Number,String],
      required:false
    },
    items:{
      default:[],
      type:Array,
      required:true
    },
    showOpen:{
      default:false,
      type:Boolean,
      required:false
    }
  },
  components:{
    BasArrow,
    DomainCardBody,
  },
  created() {

  },
  mounted(){
    // < 1280 351.565  >1280 475
    const w = document.body.clientWidth;
    if(w > 1280){
      this.paginationFactor = 475.5;
    }else{
      this.paginationFactor = 351.565;
    }
  },
  watch:{
    paginationFactor() {
      this.$nextTick(function() {

      })
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'checkMetamaskEnable'
    ]),
    tripleId() {
      const id = this.id !== undefined ? id :"bas_triple"
      return id;
    },
    hasCaption (){
      const showCaption = typeof this.captionText !=='undefined' && this.captionText.trim() !== ''
      return showCaption
    },
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction,event) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      //console.log(JSON.stringify(this.items,null,2))
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
    gotoWhois(domain){
      if(!domain)return;
      // if(this.$store.getters['metaMaskDisabled']){
      //   this.$metamask()
      //   return;
      // }
      // if(!checkSupport4Search()){
      //   let errTips = 'Current network unsupport.'
      //   this.$message(this.$basTip.error(errTips))
      //   return ;
      // }
      this.$router.push({
        path:`/domain/detail/${domain}`
      })
    }
  }
}
</script>


<style>
.bas-carousel-caption {
  margin-top:16px;
  font-size:32px;
  font-weight:500;
  color:rgba(4,6,46,1);
  line-height:50px;
  letter-spacing:1px;
}
.bas-carousel-wrapper {
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 margin: 20px 0 20px !important;
	 color: #666a73;
}
.bas-carousel {
	 display: flex;
	 justify-content: center;
	 width: 100%;
}
.bas-carousel--overflow-container {
  min-width: 100%;
	overflow: hidden;
}
.bas-carousel--nav__left {
	 display: inline-block;
	 width: 15px;
	 height: 15px;
	 padding: 10px;
   left:-20px;
	 box-sizing: border-box;
	 cursor: pointer;
	 margin-left: 10px;
   margin-right: 0px;
	 transition: transform 150ms linear;
}

.bas-carousel--nav__left .bas-arrow--circle {
  position: relative;
  left: -40px;
}
.bas-carousel--nav__right {
	 display: inline-block;
	 width: 15px;
	 height: 15px;
	 padding: 0px;
	 box-sizing: border-box;
	 /* border-top: 2px solid #42b883;
	 border-right: 2px solid #42b883; */
	 cursor: pointer;
	 margin: 0 20px;
   margin-right: 10px;
   margin-left: 0px;
	 transition: transform 150ms linear;
}

.bas-carousel--nav__left[disabled], .bas-carousel--nav__right[disabled] {
	 opacity: 0.2;
	 border-color: black;
}
.bas-carousel--nav__left {
	 /* transform: rotate(-135deg); */
   transform: rotate(0deg);
}
.bas-carousel--nav__left:active {
	 /* transform: rotate(-135deg) scale(0.9); */
   transform: rotate(0deg) scale(0.9);
}
.bas-carousel--nav__right {
	/* transform: rotate(45deg); */
  transform: rotate(0deg);
}
.bas-carousel--nav__right:active {
	/* transform: rotate(45deg) scale(0.9); */
  transform: rotate(0deg) scale(0.9);
}
.bas-carousel-cards {
	 display: flex;
	 transition: transform 150ms ease-out;
	 transform: translatex(0px);
}

.bas-carousel--card {
  margin: 4px;
  /* max-width: 33%; */
}
.bas-carousel-cards .bas-carousel--card {
  margin: 10px 2px;
  box-shadow: 0 4px 15px 0 rgba(40, 44, 53, .06), 0 2px 2px 0 rgba(40, 44, 53, .08);
  background-color:#fff;
  border-radius: 4px;
  z-index: 3;
	margin-bottom: 20px;
}
.bas-carousel-cards .bas-carousel--card:first-child {
	 margin-left: 0;
}
 .bas-carousel-cards .bas-carousel--card:last-child {
	 margin-right: 0;
}
.bas-carousel-cards .bas-carousel--card img {
	 vertical-align: bottom;
	 border-top-left-radius: 4px;
	 border-top-right-radius: 4px;
	 transition: opacity 150ms linear;
	 user-select: none;
}


.bas-carousel-cards .bas-carousel--card img:hover {
	 opacity: 0.5;
}
.bas-carousel-cards .bas-carousel--card--footer {
	 border-top: 0;
	 padding: 7px 15px;
}
.bas-carousel-cards .bas-carousel--card--footer p {
	 padding: 3px 0;
	 margin: 0;
	 margin-bottom: 2px;
	 font-size: 19px;
	 font-weight: 500;
	 color: #2c3e50;
	 user-select: none;
}
.bas-carousel-cards .bas-carousel--card--footer p.tag {
	 font-size: 11px;
	 font-weight: 300;
	 padding: 4px;
	 background: rgba(40, 44, 53, .06);
	 display: inline-block;
	 position: relative;
	 margin-left: 4px;
	 color: #666a73;
}
.bas-carousel-cards .bas-carousel--card--footer p.tag:before {
	 content: "";
	 float: left;
	 position: absolute;
	 top: 0;
	 left: -12px;
	 width: 0;
	 height: 0;
	 border-color: transparent rgba(40, 44, 53, .06) transparent transparent;
	 border-style: solid;
	 border-width: 8px 12px 12px 0;
}
.bas-carousel-cards .bas-carousel--card--footer p.tag.secondary {
	 margin-left: 0;
	 border-left: 1.45px dashed white;
}
 .bas-carousel-cards .bas-carousel--card--footer p.tag.secondary:before {
	 display: none !important;
}
.bas-carousel-cards .bas-carousel--card--footer p.tag:after {
	 content: "";
	 position: absolute;
	 top: 8px;
	 left: -3px;
	 float: left;
	 width: 4px;
	 height: 4px;
	 border-radius: 2px;
	 background: white;
	 box-shadow: 0px 0px 0px #004977;
}
</style>
