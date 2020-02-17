<template>
  <el-collapse class="bas-el-collapse">
    <el-collapse-item title="How does your Buyer Protection Program work?"
      name="Issue_How1"
      class="bas-el-collapse-item">
      <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
      <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
    </el-collapse-item>
    <el-collapse-item title="How does your Buyer Protection Program work?"
      name="Issue_How2"
      class="bas-el-collapse-item">
      <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
      <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
    </el-collapse-item>
    <el-collapse-item title="How does your Buyer Protection Program work?"
      name="Issue_How3"
      class="bas-el-collapse-item">
      <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
      <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
    </el-collapse-item>
    <el-collapse-item title="How does your Buyer Protection Program work?"
      name="Issue_How4"
      class="bas-el-collapse-item">
      <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
      <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
    </el-collapse-item>
    <el-collapse-item title="How does your Buyer Protection Program work?"
      name="Issue_How5"
      class="bas-el-collapse-item">
      <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
      <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
    </el-collapse-item>
  </el-collapse>
</template>
<style>

.bas-collapse>div {
  background:#fff;
}
.bas-collapse-item {
  padding: .25rem;
  background:rgba(245,246,246,1);
  border:1px solid rgba(245,246,246,1);
}

.bas-collapse-item div:not[role="tab"]{
  background:rgba(249,252,252,1);
  padding-left:6px;
}
.bas-collapse-item div[role="tab"]{
  background:rgba(245,246,246,1);
  border-bottom: 1px solid rgba(245,246,246,1);
}


</style>

<script>

export default {
  name:"HelpIssueNav",
  data(){
    return {
      list:[
        {
          title:"How does your Buyer Protection Program work?",
          name:"Issue_1",
          content:'Buying a domain can be time consuming, painful and frustrating. But it doesn’t have to be! At DAN.COM we pride ourselves on taking away all the hassle involved in buying a domain and on making your transaction completely safe and secure. Ever since the launch of our Buyer Protection Program in 2014 not a single transaction has turned into a nightmare. Today all transactions on DAN.COM are covered by this program. So what are the key elements of our Buyer Protection Program? We handle the escrow of every single transaction ourselves: First, we secure the payment from the buyer and take control over the domain from the seller. Then, we help you (the buyer) with becoming the new owner of the domain by facilitating a transfer to you. Finally, we proceed with paying-out the seller after you, DAN.COM confirms you have received the domain.'
        },
        {
          title:"How does your Buyer Protection Program work?",
          name:"Issue_2",
          content:'Buying a domain can be time consuming, painful and frustrating. '
        },
        {
          title:"How does your Buyer Protection Program work?",
          name:"Issue_3",
          content:'Buying a domain can be time consuming, painful and frustrating. '
        }
      ]
    }
  },
  mounted(){

  },
  methods:{
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>
