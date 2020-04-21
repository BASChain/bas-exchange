<template>
 <v-layout>
   <page-container>
     <div class="agent-header"  slot="header">
       <div class="super-node-header">
        <div class="container">
            <div class="agent-header--inner">
              <h1>{{$t('p.SuperAgent')}}</h1>
            </div>
        </div>
       </div>
      <div class="agent-header-bottom--wrapper">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-4 inner-link">
              <a href="#superObligation" @click="gotoAnchor('obliSection')"
                class="super-header-link">
                <img src="/static/icons/agent_obligation.png" >
                <span>{{$t('p.SuperNodeRAndOAnchorTitle')}}</span>
              </a>
            </div>
            <div class="col-4 inner-link">
              <a href="#superObligation"  @click="gotoAnchor('domainServiceSection')"
                class="super-header-link">
                <img src="/static/icons/join_agent.png" >
                <span>
                  {{$t('p.SuperNodeDoaminServiceTitle')}}
                </span>
              </a>
            </div>
            <div class="col-4 inner-link">
              <a href="#superObligation"  @click="gotoAnchor('joinAgent')"
                class="super-header-link">
                <img src="/static/icons/domain_sev_icon.png" >
                <span>
                  {{$t('p.SuperNodeJoinAgentTitle')}}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
     </div>
     <div slot="body" class="agent-body-wrapper">
       <div class="container obil-wrapper">
         <div class="row align-items-center">
           <div class="col-6 inner-container">
             <div class="obil-left" id="obliSection">
               <h2>
                 {{$t('p.SuperNodeRAndOAnchorTitle')}}
               </h2>
               <h4>
                 {{$t('p.SuperNodeRAndOSubTitle1')}}
               </h4>
               <p>
                {{$t('p.SuperNodeRAndOSubContents1')}}
               </p>
               <h4>
                 {{$t('p.SuperNodeRAndOSubTitle2')}}
               </h4>
               <p>
                {{$t('p.SuperNodeRAndOSubContents2')}}
               </p>
             </div>
           </div>
           <div class="col-6">
            <div class="img-wrapper">
              <img src="/static/icons/supnodes_img.png" alt="">
            </div>
           </div>
         </div>

         <div class="row justify-content-start align-items-center">
          <div class="col-6 d-block inner-container" id="domainServiceSection">
            <div>
              <h2>
                {{$t('p.SuperNodeDoaminServiceTitle')}}
              </h2>
             </div>
             <div>
               <img src="/static/img/d_serv_img.png" alt="domain service">
             </div>
           </div>
           <div class="col-6">
             <div class="inner-container">
               <h4>
                 {{$t('p.SuperNodeDSRootSubTitle')}}
               </h4>
               <p>
                 {{$t('p.SuperNodeDSRootSubContents')}}
               </p>
               <h4>
                  {{$t('p.SuperNodeDSCommRootSubTitle')}}
               </h4>
               <p>
                 {{$t('p.SuperNodeDSCommRootSubContents')}}
               </p>
             </div>
           </div>
         </div>

         <div class="row">
           <div class="col-12 inner-container">
            <h2>{{$t('p.SuperNodeJoinAgentTitle')}}</h2>
           </div>
         </div>
         <div class="join-agent-wrapper">
           <div class="join-agent-container">
             <div class="join-inner-left">
               <div class="d-block">
                <h2>
                  {{$t('p.SuperNodeAgentDomainTitle')}}
                </h2>
                <p>
                  {{$t('p.SuperNodeAgentDomainContents')}}
                </p>
               </div>

             </div>
           </div>
           <div class="join-float-img">
             <img src="/static/img/agency_img.png" >
           </div>
         </div>

         <div class="row justify-content-center align-items-center pt-4 pb-4">
           <div class="col-12">
             <div class="sdk-inner-box" id="joinAgent">
               <div>
                <h2>
                  {{$t('p.SuperNodeSDKTitle')}}
                </h2>
                <p>
                  {{$t('p.SuperNodeSDKContentsPrefix')}}
                  <span class="bas-number">
                    {{sdk.cost}}
                  </span>
                  {{$t('p.SuperNodeSDKContentsSuffix')}}
                </p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
     <foot-container slot="footer"/>
   </page-container>
 </v-layout>
</template>
<style>
.sdk-wrapper {
  position: relative;
  width: 100%;
  background: #fff;
}

.sdk-inner-box {
  height: 148px;
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  background:rgba(245,246,246,1);
  border-radius:4px;
}

.sdk-inner-box div {
  margin: auto 2rem;
}

.sdk-inner-box div>h2 {
  font-size:22px;
  font-weight:500;
  color:rgba(0,202,155,1);
  line-height:30px;
  letter-spacing:1px;
}

.sdk-inner-box span.bas-number {
  /* color:rgba(0,202,155,1); */
  color: rgba(4,6,46,1);
}

.join-float-img {
  position: absolute;
  width: 50%;
  right: 0;
  top:-20px;
}

.join-agent-wrapper {
  position: relative;
  width: 100%;
  padding: auto 24px;
}

.join-agent-container {
  position: relative;
  width: 100%;
  height: 204px;
  display: block;
  align-items: center;
  color:rgba(255,255,255,1);
  background:rgba(4,6,46,1);
  border-radius:4px;
}

.join-inner-left {
  width: 50%;
  height: 100%;
  display: inline-flex;
  direction: column;
  align-items: center;
  justify-content: center;
}

.join-inner-left div {
  width: 100%;
  margin: auto 2rem;
}

.join-inner-left h2 {
  font-weight:600;
  color:rgba(0,202,155,1);
  line-height:33px;
  font-size: 24px;
  letter-spacing:1px;
}




.agent-header {
  width: 100%;
  position: relative;
  display: block;
}
.super-node-header {
  position: relative;
  width:100%;
  height: 32.04vh;
  background:rgba(4,6,46,1);
  background-image:url('./assets/agent_header.png');
  background-size:cover;
  background-position:50%;
}
.agent-header--inner {
  width: 100%;
  display: inline-flex;
  color:#fff;
  height: calc(32.04vh - 88px);
  justify-content:flex-start;
  align-items: center;
}

.agent-header-bottom--wrapper {
  position: absolute;
  float: top;
  z-index: 99;
  bottom: -44px;
  width: 100%;
  height: 88px;
}



.agent-header-bottom--wrapper div.inner-link {
  display: inline-flex;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
}

.agent-header-bottom--wrapper div.row {
  height: 88px;
  background: #fff;
}

a.super-header-link {
  cursor: pointer;
  color: rgba(4,6,46,1);
  text-decoration: none;
  font-weight:500;
  font-size: 18px;
  opacity: .85;
}

a.super-header-link:focus ,a.super-header-link:hover{
  opacity: 1;
}

.agent-body-wrapper {
  position: relative;
  padding: 100px auto auto auto;
  background: rgba(245,246,246,1);
  border: 1px solid rgba(245,246,246,1);
  width: 100%;
}
.obil-left {
  display: inline;
  direction: column;
  justify-content: space-around;
  align-items: stretch;
  color:rgba(4,6,46,1);
}

.inner-container h2 {
  font-size:36px;
  font-weight:500;
  line-height:50px;
  letter-spacing:2px;
  margin-bottom: 2.5rem;
}
.inner-container h4 {
  font-weight:500;
  color:rgba(0,202,155,1);
  line-height:30px;
  letter-spacing:1px;
}
.inner-container p {
  font-weight:400;
  line-height:22px;
  letter-spacing:1px;
}
.obil-wrapper {
  margin-top:100px;
  position: relative;
  background: rgba(255,255,255,1);
}
</style>
<script>
import VLayout from '@/layouts/Default.vue'
import PageContainer from '@/components/PageContainer.vue'
import FootContainer from '@/footer/FootContainer.vue'

export default {
  name:"AgentIndex",
  data(){
    return {
      header:{
        title:"超级节点/域名代理",
        titleI18n:"AgentHeaderTitle"
      },
      sdk:{
        cost:'XXX'
      }
    }
  },
  components: {
     VLayout,
     PageContainer,
     FootContainer,
  },
  methods: {
    gotoAnchor(id){
      if(id !== undefined) {
        document.querySelector(`#${id}`).scrollIntoView(true)
      }
    }
  },
}
</script>
<style>
.bas-supnode--imgbox {
  height: 240px;
  background:rgba(216,216,216,1);
  opacity:0.3;
  border:1px solid rgba(151,151,151,1);
}
</style>
