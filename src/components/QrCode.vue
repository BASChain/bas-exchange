<template>
  <div>
    <img :src="imgSrc" >
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name:"QrCode",
  data(){
    return {
      imgSrc:'',
      option:{
        width:200,
        height:200,
        errorCorrectionLevel:'H',
        quality: 0.3,
        margin: 2,
        color: {
          dark:"#010599FF",
          light:"#FFBF60FF"
        }
      }
    }
  },
  methods:{
    getId(){
      let _id = this.id ||''
      return `basQrCode_${_id}`
    },
    getOptions(){
      let w = this.width
      if(w){
        this.option.width = w;
        this.option.height = w
      }
      return this.option
    },
    loadQrCode(){

    }
  },
  props:{
    content:{
      default:'',
      type:String,
      required:false
    },
    id:String,
    width:String
  },
  mounted(){
    let opts = this.getOptions()
    let id = this.getId();
    let that = this;
    QRCode.toDataURL('ahdhashfdahshfd',opts,function(err,url){
      if(!err){
        console.log(url)
        that.imgSrc = url;
      }else{
        console.log("QRCODE>>>>",err)
      }
    })
  }
}
</script>
<style>

</style>
