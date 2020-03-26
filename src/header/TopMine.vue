<template>
  <el-dropdown>
    <span class="basel-dropdown-link">
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>Action 1</el-dropdown-item>
      <el-dropdown-item>Action 2</el-dropdown-item>
      <el-dropdown-item>Action 3</el-dropdown-item>
      <el-dropdown-item disabled>Action 4</el-dropdown-item>
      <el-dropdown-item divided>Action 5</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name:"TopMine"
}
</script>
<style>
.basel-dropdown-link {
  cursor: pointer;
  font-size: large;
  color:#fff;
}

.header-warp-black span.basel-dropdown-link{
  color:#fff;
}
</style>
