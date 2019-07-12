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
        title:'常用联系人'
      }
  },
  computed:{
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
