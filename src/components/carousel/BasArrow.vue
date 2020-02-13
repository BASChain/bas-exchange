<template>
  <div class="bas-arrow--circle">
    <div :class="arrowTypeClass"></div>
  </div>
</template>

<script>
export default {
  name:"BasArrow",
  props:{
    arrowType:{
      default:'left',
      type:String,
      required:true
    }
  },
  computed:{
    arrowTypeClass() {
      return this.arrowType === 'right' ? 'bas-arrow--right' : 'bas-arrow--left';
    }
  }
}
</script>
<style>
.bas-arrow--circle {
  display: inline-block;
	width: 20px;
	height: 20px;
  cursor: pointer;
  background: rgba(245,246,246,.75);
  border:2px solid rgba(0,202,155,.7);
    -moz-border-radius: 20px;
    -webkit-border-radius: 20px;
	border-radius: 20px;
  margin:0 15px;
  transition: transform 150ms linear;
}

.bas-arrow--circle:hover {
  background:  rgba(245,246,246,1);
  border:2px solid rgba(5, 238, 184,1);
}

.bas-arrow--circle[disabled] {
  /* background: rgba(245,246,246,1);
  border:1px solid rgba(255, 255, 255,1); */
  opacity: .3;
}

.bas-arrow--right[disabled]::before , .bas-arrow--left[disabled]::before,
.bas-arrow--right[disabled]::after , .bas-arrow--left[disabled]::after
{
   color:red;
}

.bas-arrow--right {
  position: absolute;
  margin-top:3px;
  margin-left:2px;
  text-align: center;
  padding: 1px;
  margin-bottom: 1px;
  height: 10px;
  width: 12px;
}

.bas-arrow--right::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 8;
  height: 51%;
  width: 1px;
  background: #00CA9B;
    -webkit-transform: skew(135deg, -135deg);
    -moz-transform: skew(135deg, -135deg);
    -ms-transform: skew(135deg, -135deg);
    -o-transform: skew(135deg, -135deg);
  transform: skew(135deg, -135deg);
}

.bas-arrow--right::after {
  content: '';
  position: absolute;
  top: 0;
  right: 8;
  height: 50%;
  width: 1px;
  background: #00CA9B;
    -webkit-transform: skew(-135deg, 135deg);
    -moz-transform: skew(-135deg, 135deg);
    -ms-transform: skew(-135deg, 135deg);
    -o-transform: skew(-135deg, 135deg);
  transform: skew(-135deg, 135deg);
}

.bas-arrow--left {
  position: absolute;
  margin-top:3px;
  margin-right:2px;
  text-align: center;
  padding: 1px;
  margin-bottom: 1px;
  height: 10px;
  width: 12px;
}

.bas-arrow--left::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 8;
  height: 51%;
  width: 1px;
  background: #00CA9B;
    -webkit-transform: skew(-135deg, 135deg);
    -moz-transform: skew(135deg, -135deg);
    -ms-transform: skew(135deg, -135deg);
    -o-transform: skew(135deg, -135deg);
  transform: skew(-135deg, 135deg);
}

.bas-arrow--left::after {
  content: '';
  position: absolute;
  top: 0;
  left: 8;
  height: 50%;
  width: 1px;
  background: #00CA9B;
    -webkit-transform: skew(135deg, -135deg);
    -moz-transform: skew(-135deg, 135deg);
    -ms-transform: skew(-135deg, 135deg);
    -o-transform: skew(-135deg, 135deg);
  transform: skew(135deg, -135deg);
}
</style>
