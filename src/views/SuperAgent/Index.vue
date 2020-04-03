<template>
 <v-layout>
   <page-container>
     <div class="agent-header"  slot="header">
       <div class="super-node-header">
        <div class="container">
            <div class="agent-header--inner">
              <h1>{{header.title}}</h1>
            </div>
        </div>
       </div>
      <div class="agent-header-bottom--wrapper">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-4 inner-link">
              <a href="#superObligation" class="super-header-link">
                <img src="/static/icons/agent_obligation.png" >
                <span>超级节点的权利和义务</span>
              </a>
            </div>
            <div class="col-4 inner-link">
              <a href="#superObligation" class="super-header-link">
                <img src="/static/icons/join_agent.png" >
                <span>超级节点的权利和义务</span>
              </a>
            </div>
            <div class="col-4 inner-link">
              <a href="#superObligation" class="super-header-link">
                <img src="/static/icons/domain_sev_icon.png" >
                <span>超级节点的权利和义务</span>
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
             <div class="obil-left">
               <h2>
                 超级节点的权利和义务
               </h2>
               <h4>
                 获得三个自定义顶级根域名
               </h4>
               <p>
                 从域名注册、域名充值、开放自定义价格等操作中获取BAS Token分成签发二级身份验证证书 作为超级节点参与社区投票
               </p>
               <h4>
                 缴纳超级节点授权费用
               </h4>
               <p>
                 维护两个以太坊账号，一个用于收取BAS Token分成（冷钱包），另一个用来签发身份验证证书 部署BAS系统的DNS矿机，用来对外提供BAS域名解析服务
               </p>
             </div>
           </div>
           <div class="col-6">
            <div class="img-wrapper">
              <img src="/static/img/supnodes_img.png" alt="">
            </div>
           </div>
         </div>

         <div class="row justify-content-start align-items-center">
          <div class="col-6 d-block inner-container">
            <div>
              <h2>
                域名服务
              </h2>
             </div>
             <div>
               <img src="/static/img/d_serv_img.png" alt="domain service">
             </div>
           </div>
           <div class="col-6">
             <div class="inner-container">
               <h4>
                 顶级根域名
               </h4>
               <p>
                 在未开放二级域名注册的情况下，（自己）能注册此根域名下的二级/多级域名开放二级/多级域名注册，并且可以修改注册价格（改价格需额外支付100BAS） 此根域名下注册的二级/多级域名，注册支付的费用会分成给此根域名所有者
               </p>
               <h4>
                 普通根域名
               </h4>
               <p>
                 不能开放注册，（自己）能注册此根域名下的二级/多级域名
               </p>
             </div>
           </div>
         </div>

         <div class="row">
           <div class="col-12 inner-container">
            <h2>成为代理商</h2>
           </div>
         </div>
         <div class="join-agent-wrapper">
           <div class="join-agent-container">
             <div class="join-inner-left">
               <div>
                <h2>
                  普通域名代理
                </h2>
               </div>

               <p>
                 精通BAS域名注册系统操作，可以代用户注册域名，并在注册后把域名转让给用户持有 一定数量的BAS Token，随时能为用户提供代注册服务
               </p>
             </div>
           </div>
           <div class="join-float-img">

           </div>
         </div>

       </div>
     </div>
     <foot-container slot="footer"/>
   </page-container>
 </v-layout>
</template>
<style>
.join-agent-wrapper {
  width: 100%;
  padding: auto 24px;
}

.join-agent-container {
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
  display: inline-flex;
  direction: column;
  align-items: center;
  justify-content: flex-start;
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
        title:"超级节点/域名处理",
        titleI18n:"AgentHeaderTitle"
      }
    }
  },
  components: {
     VLayout,
     PageContainer,
     FootContainer,
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
