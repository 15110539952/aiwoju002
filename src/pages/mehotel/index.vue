<template>
  <div class="mehotel">
    <v-header :title="title"></v-header>

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
      console.log(this.$route);
      return this.$route.meta.title || '酒店经纪人';
    }
  },
  components: {
    "v-header": header,
  },
}

</script>
<style lang='less' scoped>
  @import 'index';
  .child-view{
    padding-top: 100px;
  }
</style>
