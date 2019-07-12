<template>
  <div id="article">
    <input type="text" class="ipt" v-model="searchText" placeholder="请输入要查的文章" @focus="query">
    <ul v-show="solrDataArr.length == 0">
      <li v-for="(item,index) in searchDataArr" :key="index" v-html="item.lightFont"></li>
    </ul>
    <ul v-show="searchDataArr.length == 0">
      <li v-for="(item,index) in solrDataArr" :key="index">{{item.content}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchDataArr: [],
      solrDataArr: [],
      searchText: ""
    };
  },
  watch: {
    searchText: function(text) {
      this.searchDataArr = [];
      this.solrDataArr = [];
      if (text == "") {
        text = "*:*";
        var url = "api/solr/query?content=" + text;
        this.$ajax.get(url).then(res => {
          this.solrDataArr = res;
        });
      } else {
        var url = "api/solr/query?content=" + text;
        this.$ajax.get(url).then(res => {
          this.searchDataArr = res;
        });
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    query() {
      this.searchDataArr = [];
      this.solrDataArr = [];
      var text = "*:*";
      var url = "api/solr/query?content=" + text;
      this.$ajax.get(url).then(res => {
        this.solrDataArr = res;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
#article {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.48rem;
  height: 4rem;
  margin: 0.346667rem 0;
  .ipt {
    width: 100%;
    height: 1.333333rem;
    background-color: #ccc;
  }
  ul {
    li {
      height: 1.333333rem;
      line-height: 1.333333rem;
      text-align: left;
      @include border-1px(#ccc);
    }
  }
}
</style>