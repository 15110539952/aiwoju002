<template>
  <div class="setting">
    <v-header :title="title"></v-header>
    <p class="bg20"></p>

    <router-view/>
  </div>
</template>

<script>
import header from "@/components/Header/header";
export default {
  data(){
      return {

      }
  },
  computed:{
    'title'(){
      return this.$route.name === 'social'?'社交账号':'设置';
    }
  },
  components: {
      "v-header": header,
  },
  mounted(){
  }
}

</script>
<style lang='less' scoped>
  @import 'index';
  .child-view{
    padding-top: 100px;
  }
</style>
