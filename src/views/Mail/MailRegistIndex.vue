<template>
  <div class=" mail-regist-wrapper">
    <div class="container inner-center-container">
        <div class="row justify-content-center ">
          <div class="col-md-6 mail-content-card">
            <div class="header-logo">
              <img src="/static/icons/logo_header_blk.png" class="img-fluid">
            </div>
            <div class="header-title">
              <h5 class="mail-regist-title">
                申请邮箱账号
              </h5>
            </div>
            <e-form>
              <el-form-item>
                <el-input type="text">

                </el-input>
              </el-form-item>
              <el-form-item>
                <label >2Bas/year</label>
              </el-form-item>
            </e-form>
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

<script>
export default {
  name:"MailRegistIndex",
  components:{},
  computed: {

  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {

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
</style>
