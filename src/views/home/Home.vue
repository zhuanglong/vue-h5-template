<template>
  <div class="home">
    <div class="logo">
      <img alt="logo" src="@/assets/logo.png" />
    </div>
    <HelloWorld msg="Vue H5 Template" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
}
</style>
