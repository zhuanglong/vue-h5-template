<template>
  <div class="about">
    <div class="avatar" v-if="userName" />
    <img class="default-avatar" :src="brand" alt="" v-else />
    <div class="username">
      {{ userName || 'Your Name' }}
    </div>
    <van-button type="warning" size="large" @click="doDispatch">登陆</van-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getUserInfo } from '@/api/user';

export default {
  data() {
    return {
      brand: `${this.$cdn}/stdl/me_center/main/static/img/newcomer@2x.bc5c797.png`
    };
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      getUserInfo({ user: 'xxx' }).then(() => {});
    },
    doDispatch() {
      this.$store.dispatch('setUserName', 'ZhuangLong');
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .avatar {
    width: 120px;
    height: 120px;
    background: url($cdn+'/stdl/me_center/production/44b62ec994796488a874b62533c8823c.png') center / contain no-repeat;
  }
  .default-avatar {
    width: 120px;
    height: 120px;
  }
  .username {
    margin: 10px 0;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
