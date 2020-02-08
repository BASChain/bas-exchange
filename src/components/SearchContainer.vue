<template>
  <div class="search-container">
    <form action="#" class="container" id="searchForm">
      <div class="row justify-content-center align-items-center">
        <img src="/static/icons/search-prev.png" class="img-fluid col-2 search-prev-icon">
        <input type="text" id="searchDomain" name="searchDomain" class="col-6 search-domain"
          placeholder="please enter a domain string">
        <button class="btn-search col-2">Search</button>
      </div>
      <div class="row justify-content-center align-items-center">
        <div class="col-4 bas-totals text-center">
          <div class="bas-anal-number" id="basTotalNumber">999K</div>
          <div class="bas-anal-description">域名数量</div>
        </div>
        <div class="col-4 bas-totals text-center">
          <div class="bas-anal-number" id="basTotalNumber">999K</div>
          <div class="bas-anal-description">域名数量</div>
        </div>
        <div class="col-4 bas-totals text-center">
          <div class="bas-anal-number" id="basTotalNumber">999K</div>
          <div class="bas-anal-description">域名数量</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name:"SearchContainer"
}
</script>
<style>
  .search-container {
    padding: 0;
    background-color: rgba(4,6,46,1);
  }

  #searchForm>div.row {
    min-height: 12vh;
  }

  .bas-anal-number {
    font-size:40px;
    color:rgba(255,255,255,1);
  }

  .btn-search {
    background-color: #00B881;
    color:#FFFFFF;
    font-size:20px;
    line-height:24px;
    letter-spacing:1px;
  }
</style>
