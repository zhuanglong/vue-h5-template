<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      基于 vue-cli4.0 + webpack 4 + vant ui + sass+ rem 适配方案 + axios 封装，构建手机端模板脚手架。
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
.hello {
  text-align: center;
}
</style>
