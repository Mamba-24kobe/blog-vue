<template>
  <div class="messages-box">
    <page-box
      :isGrey="true"
      :isWhite="true"
      bgImg="headBgImg-4"
      :styleStr="`width: 100%; height: 500px; background-position: center center; background-size: cover`"
    >
      <div slot="header" class="slot-box d-flex ai-end jc-center">
        <div class="textarea-box bg-white">
          <comment-textarea
            model="messages"
            @toResponse="getMessagesList"
            type="parent"
            placeholder="大家请坐下，陈独秀同志，要发言了。。。"
          ></comment-textarea>
        </div>
      </div>
      <div slot="section">
        <div :class="{'message-box' : parentComments.length>0}">
            <comment-list
              model="messages"
              @getCommentList="getMessagesList"
              :commentsList="parentComments"
              v-if="parentComments"
            ></comment-list>
        </div>
      </div>
    </page-box>
  </div>
</template>

<script>
import commentTextarea from "../components/commentTextarea";
import commentList from "../components/commentList";

export default {
  components: {
    commentTextarea,
    commentList
  },
  data() {
    return {
      parentComments: [],
    };
  },
  created() {
    this.getMessagesList();
  },
  methods: {
    async getMessagesList() {
      let res = await this.$axios.get("/messages");
      let blogsComments = res.data;
      this.parentComments = blogsComments.filter(
        v => v.parent == "5e52a80981bf76430fd982f0"
      );
      this.parentComments.forEach(c => {
        return (c.children = blogsComments.filter(v => v.parent == c._id));
      });
      console.log(this.parentComments, blogsComments, res.data);
    }
  }
};
</script>

<style  lang="scss" scoped>
.slot-box {
  height: 100%;
  padding-bottom: 20px;
  .textarea-box {
    width: 100%;
    max-width: 740px;
    padding: 5px 15px 15px;
  }
}
// .dialog {
//   position: relative;
//   background-color: rgba(21, 21, 21, 0.5);
// }
@media screen and (max-width: 768px) {
  .slot-box {
    padding-bottom: 0px;
  }
}
</style>
<style>
.emoji-picker-icon {
  top: 95px;
}
</style>