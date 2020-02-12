<template>
  <form class="comp-searcher-form">
    <div class="row justify-content-center align-items-center ">
        <input type="text" v-model="searchText"
          placeholder="search your Domain"
          class="w-50 comp-search-input"
          >
        <div class="">
          <button id="SearchBtn" class="comp-searcher-btn"
            @click="searchDomain">
            Search
          </button>
        </div>
    </div>
  </form>
</template>

<script>
export default {
  name:"SearcherComponent",
  data() {
    return {
      searchText:""
    }
  },
  methods:{
    searchDomain(){
      alert('>>>>',this.searchText)
    }
  }
}
</script>
<style>
/* Components */
.comp-searcher-form {
  margin: 100px auto;
}
.comp-search-container {
  padding: 0 auto 3rem auto;
}

.comp-search-input {
  height: 62px;
  font-size:20px;
  background:rgba(245,246,246,1);
  border:1px solid rgba(225,229,229,0.5);
  border-radius:2px;
}
.comp-searcher-btn {
  height: 62px;
  width: 226px;
  font-size:20px;
  color:rgba(255,255,255,1);
  background:rgba(0,202,155,1);
  border:1px solid rgba(0,184,129,1);
  border-radius:2px;
}
</style>
