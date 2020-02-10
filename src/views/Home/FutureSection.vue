<template>
  <div class="bas-section">
    <h1 class="section-title">{{ captionTitle }}</h1>
    <div class="container">
      <div class="row text-center">
        <div class="col-md-4 col-sm-6"
          v-for="(item,index) in dapps" :key="index">
            <div class="dapp-container" @click="dappClick(item)">
              <img :src="'/static/icons/'+item.icon" :alt="item.title" class="dapp-icon">
              <p>{{ item.title }}</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"FutureSection",
  data(){
    return {
      captionTitle:"未来已来",

      dapps:[
        {
          name:"ticketAuthorize",
          title:"飞机/火车身份认证",
          icon:"tickets_icon.png",
          href:""
        },
        {
          name:"medicalAuthorize",
          title:"医疗就诊挂号",
          icon:"medical_icon.png",
          href:""
        },
        {
          name:"websiteAuthorize",
          title:"网站登录认证",
          icon:"web_icon.png",
          href:""
        },
        {
          name:"creditAuthorize",
          title:"征信身份认证",
          icon:"credit_icon.png",
          href:""
        },
        {
          name:"travelAuthorize",
          title:"酒店/会务认证",
          icon:"travel_icon.png",
          href:""
        },
        {
          name:"otherAuthorize",
          title:"其他任何认证场景",
          icon:"other_icon.png",
          href:""
        }
      ]
    }
  },
  methods: {
    dappClick (item) {
      console.log(JSON.stringify(item,null,2))
    }
  }
}
</script>
<style>
.dapp-icon:hover {
  cursor: pointer;
}
@media (min-width: 1900px) {
  .dapp-icon {
    margin: 10px;
    width:242px;
    height:242px;
  }
}


</style>
