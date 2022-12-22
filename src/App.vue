<template>
  <el-container>
    <el-header>
      <PageHeader />
    </el-header>

    <el-main>
      <RouterView />
    </el-main>

    <!--<el-footer>-->
    <!--  <PageFooter />-->
    <!--</el-footer>-->
  </el-container>
</template>

<script setup lang='ts'>
import PageHeader from '@/components/PageHeader/PageHeader.vue'
// import PageFooter from '@/components/PageFooter/PageFooter.vue'
</script>

<style lang='less' scoped>
.el-container {
  min-width: 1000px;
  max-width: 1920px;
  margin: 0 auto;

  .el-header {
    height: 100px;
  }

  .el-main {
    min-height: calc(100vh - 100px);
  }
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #000;
}
</style>
