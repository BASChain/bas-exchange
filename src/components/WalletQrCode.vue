<template>
  <div>
    <img :src="imgSrc" >
    <el-tooltip content="Address Copied."
      :value="tipValue"
      effect="light" :visible-arrow="false"
      :manual="true"
      :placement="tipPlacement">
      <div >
        <p class="small bas-qrcoe-p" ref="copyWalletAddress"
          :data-clipboard-text="content"
          :id="getId">
          {{content}}
        </p>

      </div>
    </el-tooltip>
  </div>
</template>

<script>

export default {
  name:"WalletQrCode",
  data(){
    return {
      imgSrc:'',
      tipValue:false,
      options:{
        width:180,
        height:180,
        errorCorrectionLevel:'H',
        quality: 0.3,
        margin: 0,
        color: {
          dark:"#1f1f2eff",
          light:"#fff"
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
      if(w>=60){
        this.options = Object.assign({},this.options,{
          width:w,
          height:w
        })
      }

      return this.options
    },
    loadQrCode(){

    },
    initClipBorad(){
      const clipboard = new Clipboard(this.$refs.copyWalletAddress)

      clipboard.on('success',(e)=>{
        console.log(`Copied Wallet Address ${this.content} to clipborad.`)
        let that = this;
        that.tipValue =true;
        setTimeout(function(){
          that.tipValue =false;
        },1500)
      })
    }
  },
  props:{
    content:{
      default:'',
      type:String,
      required:false
    },
    tipPlacement:{
      default:'left',
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
    let text = this.content;

    QRCode.toDataURL('ahdhashfdahshfd',opts,function(err,url){
      if(!err){
       // console.log(url)
        that.imgSrc = url;
      }else{
        console.log("QRCODE>>>>",err)
      }
    })

    this.initClipBorad()
  }
}
</script>
<style>
.bas-qrcoe-p {
  cursor: pointer;
  color:rgba(4,6,46,1);
  text-overflow: ellipsis;
  white-space:nowrap;
  overflow:hidden;
  margin: auto;
  margin-bottom: 4px;
  margin-top: 6px;
}
</style>
