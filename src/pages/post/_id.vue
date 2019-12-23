<template>
  <div class="post">
    <div class="thumbnail" :style="`background-image: url(${thumbnail})`" />
    <div class="post-container">
      <h1 class="post-title">{{ title }}</h1>
      <div class="post-createdAt">
        <span>{{ $moment(createdAt).format('YYYY년 MM월 DD일') }}</span>
        <template v-if="!comments.length">
          <a-tooltip :title="`${likes}`" placement="top">
            <a-icon type="heart" class="button" theme="filled" @click="infiniteLike" />
          </a-tooltip>
          <a-icon @click="shareFacebook" type="facebook" theme="filled" class="button" />
          <a-icon @click="onCopy" type="link" class="button" />
        </template>
      </div>
      <vue-marked :markdown="content" />

      <a-list
        v-if="comments.length"
        class="comment-list"
        itemLayout="horizontal"
        :dataSource="comments"
      >
        <div slot="header" class="comment-header">
          <span>{{ comments.length }}{{ $t('comment.replies')}}</span>
          <a-tooltip :title="`${likes}`" placement="top">
            <a-icon type="heart" class="button" theme="filled" @click="infiniteLike" />
          </a-tooltip>
          <a-icon @click="shareFacebook" type="facebook" theme="filled" class="button" />
          <a-icon @click="onCopy" type="link" class="button" />
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
            <a-textarea :placeholder="$t('comment.placeholder')" :rows="4" v-model="comment" />
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
import VueMarked from '~/components/Marked'
import { mapGetters } from 'vuex'
export default {
  components: {
    VueMarked
  },
  async asyncData({ app, params, redirect }) {
    if (!params.id) return redirect('/')
    try {
      const [postRef, commentsRef] = await Promise.all([
        app.$db.collection('posts').doc(app.$sliceParams(params.id)),
        app.$db
          .collection('comments')
          .where('postId', '==', app.$sliceParams(params.id))
          .get()
      ])
      const postDoc = await postRef.get()
      const post = postDoc.data()
      post.createdAt = post.createdAt.toDate()
      const comments = []
      commentsRef.forEach(doc => {
        let data = doc.data()
        data.createdAt = data.createdAt.toDate()
        comments.push(data)
      })
      return {
        title: post.title || '',
        content: post.content || '',
        createdAt: post.createdAt || '',
        thumbnail: post.thumbnail || '',
        comments: comments || [],
        likes: post.likes || 0,
        views: post.views || 0
      }
    } catch (err) {
      console.log(err)
    }
  },
  layout: 'post',
  data: _ => ({
    title: '',
    content: '',
    createdAt: new Date(),
    thumbnail: '',
    comments: [],
    loading: false,
    comment: '',
    likes: 0,
    views: 0
  }),
  methods: {
    async addComment() {
      if (!this.comment) return
      try {
        const { data } = await this.$axios.get(
          'https://api.ipify.org/?format=json'
        )
        const item = {
          content: this.comment,
          postId: this.$route.params.id,
          ipv4: data.ip || '',
          userId: this.uid,
          createdAt: new Date()
        }
        await this.$db.collection('comments').add(item)
        this.comments.push({ content: this.comment })
        this.comment = ''
        this.$message.success(this.$t('comment.success'))
        this.$analytics.logEvent('댓글 등록', this.title)
      } catch (err) {
        console.log(err)
      }
    },
    shareFacebook() {
      const url = `http://www.facebook.com/sharer/sharer.php?u=${location.href}`
      window.open(url, 'share', 'menubar=1, resizable=1, width=800, height=500')
      this.$analytics.logEvent('페이스북 공유', location.href)
    },
    onCopy() {
      this.$copyText(location.href)
      this.$message.success(this.$t('copy.success'))
      this.$analytics.logEvent('링크 복사', location.href)
    },
    async infiniteLike(e) {
      e.preventDefault()
      const id = this.$sliceParams(this.$route.params.id)
      try {
        await this.$db
          .collection('posts')
          .doc(id)
          .update({ likes: this.likes + 1 })
        this.likes = this.likes + 1
        this.$analytics.logEvent('좋아요 클릭', this.title)
      } catch (err) {
        console.log(err)
      }
    },
    async increaseViews() {
      const id = this.$sliceParams(this.$route.params.id)
      try {
        await this.$db
          .collection('posts')
          .doc(id)
          .update({ views: this.views + 1 })
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.increaseViews()
    this.$analytics.logEvent('글 조회', this.title)
  },
  computed: {
    ...mapGetters({
      uid: 'auth/GET_USER_ID'
    })
  },
  head() {
    return {
      title: `${this.title} - Kidow Blog`,
      meta: [
        // Open Graph
        { hid: 'og-type', property: 'og:type', content: 'website' },
        {
          hid: 'og-site_name',
          property: 'og:site_name',
          content: 'KidowBlog'
        },
        { hid: 'og-title', property: 'og:title', content: this.title },
        {
          hid: 'og-description',
          property: 'og-description',
          content: this.$cheerio(this.content).pretext
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: this.thumbnail
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: process.env.BASE_URL + this.$route.path
        },
        {
          hid: 'og-image-alt',
          property: 'og:image:alt',
          content: '###KidowBlog###'
        },
        // Twitter
        {
          hid: 'twitter-site',
          property: 'twitter:site',
          content: '@KidowBlog'
        },
        {
          hid: 'twitter-card',
          property: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'twitter-title',
          property: 'twitter:title',
          content: 'KidowBlog'
        },
        {
          hid: 'twitter-description',
          property: 'twitter:description',
          content: this.$cheerio(this.content).pretext
        },
        {
          hid: 'twitter-image',
          property: 'twitter:image',
          content: this.thumbnail
        },
        {
          hid: 'twitter-domain',
          property: 'twitter:domain',
          content: process.env.BASE_URL + this.$route.path
        }
      ]
    }
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
  height: 100vh;
  background-attachment: fixed;
  background-position: 50% 50%;
  display: block;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.5;
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
    width: 95%;
    font-size: 32px;
    word-break: keep-all;
  }
}

.post-createdAt {
  position: absolute;
  font-size: 22px;
  top: 93%;
  color: #fff;
  opacity: 0.5;
}

.comment-header {
  font-size: 22px;
}
</style>