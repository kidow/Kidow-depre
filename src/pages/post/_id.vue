<template>
  <div class="post">
    <div class="thumbnail" :style="`background-image: url(${thumbnail})`" />
    <div class="post-container">
      <h1 class="post-title">{{ title }}</h1>
      <div class="post-createdAt">{{ $moment(createdAt).format('YYYY년 MM월 DD일') }}</div>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>
      <h1>asdasdsd</h1>

      <a-list class="comment-list" itemLayout="horizontal" :dataSource="comments">
        <div slot="header" class="comment-header">
          <span>{{ comments.length }}{{ $t('comment.replies')}}</span>
          <a-tooltip :title="111" placement="top">
            <a-icon type="heart" class="button" theme="filled" />
          </a-tooltip>
          <a-icon @click="shareFacebook" type="facebook" theme="filled" class="button" />
          <a-icon 
            @click="onCopy"
            type="link" 
            class="button" 
          />
        </div>
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-comment
            :key="index"
            :content="item.content"
            :author="$t('comment.author')"
            :datetime="$moment().fromNow()"
          >
            <a-avatar icon="user" slot="avatar" />
          </a-comment>
        </a-list-item>
      </a-list>
      <a-comment>
        <a-avatar icon="user" slot="avatar" />
        <div slot="content">
          <a-form-item>
            <a-textarea :rows="4" v-model="comment" />
          </a-form-item>
          <a-form-item>
            <a-button
              htmlType="submit"
              :loading="loading"
              @click="addComment"
              type="link"
            >{{ $t('comment.add') }}</a-button>
          </a-form-item>
        </div>
      </a-comment>
    </div>
    <span @click="$router.push('/')" class="left-icon">
      <i class="fas fa-arrow-left button"></i>
    </span>
    <a-back-top />
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {},
  layout: 'post',
  data: _ => ({
    title: '원티드 - 요즘 "프론트엔드 개발" 어떻게 하지? 참관 후기',
    content: '',
    createdAt: new Date(),
    thumbnail:
      'https://cdn.pixabay.com/photo/2016/01/29/16/57/prague-1168302_960_720.jpg',
    comments: [
      {
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      },
      {
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      }
    ],
    loading: false,
    comment: ''
  }),
  methods: {
    async addComment() {
      try {
      } catch (err) {
        console.log(err)
      }
    },
    shareFacebook() {
      const url = `http://www.facebook.com/sharer/sharer.php?u=${location.href}`
      window.open(url, 'share', 'menubar=1, resizable=1, width=800, height=500')
    },
    onCopy() {
      this.$copyText(location.href)
      this.$message.success(this.$t('copy.success'))
    },
  }
}
</script>

<style lang="scss" scoped>
.post-container {
  margin: 0 auto;
  padding: 150px 0;
  color: $font-primary-color;
  width: $lg;
  @media screen and (max-width: $lg) {
    width: $md;
  }
  @media screen and (max-width: $md) {
    width: 100%;
    padding: 32px 16px;
  }
}

.left-icon {
  position: absolute;
  top: 40px;
  left: 40px;
  padding: 8px;
  border-radius: 50%;
  @media screen and (max-width: $md) {
    top: 20px;
    left: 20px;
  }
  .fa-arrow-left {
    font-size: 50px;
    @media screen and (max-width: $md) {
      font-size: 25px;
    }
  }
}

.thumbnail {
  background-image: url('https://cdn.pixabay.com/photo/2016/01/29/16/57/prague-1168302_960_720.jpg');
  height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.post-title {
  font-size: 50px;
  top: 70%;
  color: #fff;
  position: absolute;
  width: $lg;
  @media screen and (max-width: $lg) {
    width: $md;
  }
  @media screen and (max-width: $md) {
    top: 120px;
    font-size: 29px;
    word-break: keep-all;
  }
}

.post-createdAt {
  position: absolute;
  font-size: 18px;
  top: 95%;
  color: #fff;
  opacity: 0.5;
  @media screen and (max-width: $md) {
    font-size: 14px;
  }
}

.comment-header {
  font-size: 22px;
}
</style>