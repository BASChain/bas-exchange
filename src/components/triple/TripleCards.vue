<template>
  <div :id="id"
    class="bas-carousel-wrapper"
    >
      <div class="bas-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
      <div class="bas-carousel">
          <div class="bas-carousel--overflow-container">
              <div class="bas-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
                  <div class="bas-carousel--card" v-for="(item,idx) in items" :key="idx">
                      <img src="/static/icons/logo-200.png" />
                      <div class="bas-carousel--card--footer">
                          <p>{{ item.name }}</p>
                          <p class="tag"
                            v-for="(tag,index) in item.tag" :class="index &gt; 0 ? 'secondary' : ''"
                            :key="index">
                            {{ tag }}
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="bas-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
  </div>
</template>

<script>
export default {
  name:"TripleCards",
  data(){
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 220,
      items: [
        {name: 'Kin Khao', tag: ["Thai"]},
        {name: 'Jū-Ni', tag: ["Sushi", "Japanese", "$$$$"]},
        {name: 'Delfina', tag: ["Pizza", "Casual"]},
        {name: 'San Tung', tag: ["Chinese", "$$"]},
        {name: 'Anchor Oyster Bar', tag: ["Seafood", "Cioppino"]},
        {name: 'Locanda', tag: ["Italian"]},
        {name: 'Garden Creamery', tag: ["Ice cream"]},
      ]
    }
  },
  props:{
    id:{
      type:[String,Number],
      required:true
    }
  },
  computed: {
    tripleId() {
      const id = this.id !== undefined ? id :"bas_triple"
      return id;
    },
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
  }
}
</script>
<style>
 .bas-carousel-wrapper {
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 margin: 20px 0 40px;
	 color: #666a73;
}
 .bas-carousel {
	 display: flex;
	 justify-content: center;
	 width: 640px;
}
 .bas-carousel--overflow-container {
	 overflow: hidden;
}
 .bas-carousel--nav__left, .bas-carousel--nav__right {
	 display: inline-block;
	 width: 15px;
	 height: 15px;
	 padding: 10px;
	 box-sizing: border-box;
	 border-top: 2px solid #42b883;
	 border-right: 2px solid #42b883;
	 cursor: pointer;
	 margin: 0 20px;
	 transition: transform 150ms linear;
}
 .bas-carousel--nav__left[disabled], .bas-carousel--nav__right[disabled] {
	 opacity: 0.2;
	 border-color: black;
}
 .bas-carousel--nav__left {
	 transform: rotate(-135deg);
}
 .bas-carousel--nav__left:active {
	 transform: rotate(-135deg) scale(0.9);
}
 .bas-carousel--nav__right {
	 transform: rotate(45deg);
}
 .bas-carousel--nav__right:active {
	 transform: rotate(45deg) scale(0.9);
}
 .bas-carousel-cards {
	 display: flex;
	 transition: transform 150ms ease-out;
	 transform: translatex(0px);
}
 .bas-carousel-cards .bas-carousel--card {
	 margin: 0 10px;
	 cursor: pointer;
	 box-shadow: 0 4px 15px 0 rgba(40, 44, 53, .06), 0 2px 2px 0 rgba(40, 44, 53, .08);
	 background-color: #fff;
	 border-radius: 4px;
	 z-index: 3;
	 margin-bottom: 2px;
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
