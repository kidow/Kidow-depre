<template>
  <div style="padding-top: 30px">
    <a-tabs :animated="false" :tabBarGutter="0" @change="key => (tab = key)">
      <a-tab-pane :tab="$t('tab.one')" :key="1" />
      <a-tab-pane :tab="$t('tab.two')" :key="2" />
      <a-tab-pane :tab="$t('tab.three')" :key="3" />
      <a-tab-pane :tab="$t('tab.four')" :key="4" />
      <a-tab-pane :tab="$t('tab.five')" :key="5" />
    </a-tabs>

    <template v-if="tab === 1">
      <a-input-search @search="get" />
      <a-list :grid="{ gutter: 16, xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }" :dataSource="posts">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-card
            :key="index"
            hoverable
            :bordered="false"
            class="card-container"
            @click="_ => onCardClick(item)"
          >
            <img
              alt="thumbnail"
              v-if="item.thumbnail"
              :src="item.thumbnail"
              slot="cover"
              style="height: 160px; object-fit: cover"
            />
            <a-card-meta>
              <h3 slot="title" class="card-title">{{ item.title }}</h3>
              <p
                slot="description"
                class="card-description"
                :class="{ 'no-title': !item.thumbnail }"
              >{{ item.content }}</p>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </a-list>
    </template>

    <div v-else-if="tab === 2" class="tab-container">
      <div v-html="locale === 'en' ? aboutEn : aboutKo" class="editor" />
      <!-- <p>{{ locale === 'ko' ? aboutKo : locale === 'en' ? aboutEn : $t('about')}}</p> -->
    </div>

    <div v-else-if="tab === 3" class="tab-container">
      <vue-form
        title="Frontend"
        :list="[
          { text: 'Nuxt.js', specialty: true },
          { text: 'React.js', specialty: true },
          { text: 'Vue.js' },
          { text: 'Next.js' },
          { text: 'Redux' },
          { text: 'Mobx' },
          { text: 'GraphQL' }
        ]"
      />
      <vue-form
        title="Backend"
        :list="[{ text: 'Node.js', specialty: true }, { text: 'TypeORM' }]"
      />
      <vue-form
        title="Database"
        :list="[
          { text: 'MySQL', specialty: true },
          { text: 'MongoDB' },
          { text: 'Redis' },
          { text: 'Firestore' }
        ]"
      />
      <vue-form
        title="Auth"
        :list="[
          { text: 'Firebase', specialty: true },
          { text: 'JWT', specialty: true },
          { text: 'OAuth' },
          { text: 'Passport' }
        ]"
      />
      <vue-form
        title="Infra"
        :list="[
          { text: 'AWS', specialty: true },
          { text: 'Firebase', specialty: true },
          { text: 'Heroku' },
          { text: 'Now' }
        ]"
      />
      <vue-form title="CI/CD" :list="[{ text: 'Github Actions' }, { text: 'Jenkins' }]" />
      <vue-form
        title="Collabo"
        :list="[
          { text: 'Prettier' },
          { text: 'Slack' },
          { text: 'Trello' },
          { text: 'Jira' }
        ]"
      />
      <vue-form
        title="Etc"
        :list="[
          { text: 'TypeScript' },
          { text: 'StoryBook' },
          { text: 'Jest' }
        ]"
      />
    </div>
    <div v-else-if="tab === 4" class="tab-container">
      <vue-form
        :title="$t('linkplanner.name')"
        block
        link="https://www.insunet.co.kr"
        :stacks="[
          'React',
          'Next.js',
          'Mobx',
          'GraphQL',
          'Gatsby',
          'TypeScript',
          'StoryBook',
          'Jest'
        ]"
        :description="`(2019.09.16 ~ ${$t('current')})`"
        :list="[
          {
            text:
              '보험 설계사 플랫폼 링크플래너에서 프론트엔드 유지보수 및 신기능 추가를 맡고 있습니다.'
          }
        ]"
      />
      <vue-form
        :title="$t('teamblind.name')"
        link="https://www.mybiskit.com"
        description="(2019.02.18 ~ 2019.06.17)"
        block
        :stacks="['Nuxt.js', 'MySQL', 'Node.js', 'AWS']"
        :list="[
          {
            text:
              '직장인 익명 SNS 스타트업 블라인드에서 신사업 프로젝트 밑단부터 런칭까지 맡았고, 프론트엔드를 담당했습니다. 급할 경우 서버쪽 작업도 겸하곤 했습니다.'
          }
        ]"
      />
      <vue-form
        :title="$t('gangmom.name')"
        link="https://www.gangmom.kr"
        description="(2019.01.16 ~ 2019.02.15)"
        block
        :list="[
          {
            text: '스타트업 강남엄마에서 백엔드 개발 보조 알바를 하였습니다.'
          }
        ]"
        :stacks="['MySQL', 'Node.js']"
      />
    </div>
    <div v-else-if="tab === 5" class="tab-container">
      <a-badge status="processing" text="배운 것" style="margin-right: 4px" />
      <a-badge status="success" text="한 일" style="margin-right: 4px" />
      <a-badge status="default" text="아무 생각" />
      <a-calendar @select="calendarChange">
        <template slot="dateCellRender" slot-scope="value" class="events">
          <a-badge
            v-for="(item,i) in getListData(value)"
            :key="i"
            :status="item.type"
            :text="$device.isMobile ? '' : item.content"
            style="display: block"
          />
        </template>
        <template slot="monthCellRender" slot-scope="value">
          <div v-if="getMonthData(value)" class="notes-month">
            <section>{{ getMonthData(value) }}</section>
          </div>
        </template>
      </a-calendar>
    </div>
    <a-modal v-model="logOpen" :title="date" :footer="null" :afterClose="() => date = ''">
      <a-badge
        style="display: block"
        v-for="(item, i) in dayLogs"
        :key="i"
        :status="item.type"
        :text="item.content"
      />
    </a-modal>
  </div>
</template>

<script>
import VueForm from '~/components/Form'
import removeMd from 'remove-markdown'
import { mapGetters } from 'vuex'
export default {
  data: _ => ({
    posts: [],
    tab: 1,
    aboutEn: '',
    aboutKo: '',
    logOpen: false,
    date: '',
    dayLogs: [],
    logs: []
  }),
  components: {
    VueForm
  },
  methods: {
    async calendarChange(date) {
      // const filter = this.logs.filter(item =>
      //   this.$moment(item.createdAt).isSame(date, 'day')
      // )
      // if (!filter.length) return
      this.date = this.$moment(date).format('YYYY-MM-DD')
      try {
        const logRef = await this.$database
          .collection('logs')
          .where('createdAt', '==', this.$moment(date).format('YYYY-MM-DD'))
          .get()
        if (!logRef.docs.length) return
        const dayLogs = []
        logRef.forEach(doc => {
          const data = doc.data()
          dayLogs.push(data)
        })
        this.dayLogs = dayLogs
        this.logOpen = true
      } catch (err) {
        console.log(err)
      }
    },
    async get(search) {
      try {
        let postRef = null
        if (search)
          postRef = await this.$database
            .collection('posts')
            .where('title', '==', search)
            .get()
        else postRef = await this.$database.collection('posts').get()
        const posts = []
        postRef.forEach(doc => {
          const post = doc.data()
          post.id = doc.id
          post.content = this.$cheerio(post.content).pretext
          posts.push(post)
        })
        this.posts = posts
      } catch (err) {
        console.log(err)
      }
    },
    onCardClick(item) {
      this.$analytics.logEvent('카드 클릭', this.title)
      this.$router.push(`/post/${this.$titleUrl(item.title, item.id)}`)
    },
    getListData(value) {
      return this.logs.filter(
        item => item.createdAt === value.format('YYYY-MM-DD')
      )
    },
    getMonthData(value) {
      const logs = this.logs.filter(item =>
        this.$moment(item.createdAt).isSame(value, 'month')
      )
      return logs.length ? `${logs.length} 개의 기록` : ''
    }
  },
  async asyncData({ app }) {
    try {
      const [postRef, aboutRef, logRef] = await Promise.all([
        app.$database
          .collection('posts')
          .orderBy('createdAt', 'desc')
          .get(),
        app.$database
          .collection('about')
          .doc(process.env.ABOUT_KEY)
          .get(),
        app.$database.collection('logs').get()
      ])
      const { ko, en } = aboutRef.data()
      const posts = []
      postRef.forEach(doc => {
        let post = doc.data()
        post.id = doc.id
        post.content = removeMd(post.content, { useImgAltText: false }).slice(
          0,
          150
        )
        posts.push(post)
      })
      const logs = []
      logRef.forEach(doc => {
        const log = doc.data()
        logs.push(log)
      })
      return { posts, aboutEn: en, aboutKo: ko, logs }
    } catch (err) {
      console.log(err)
    }
  },
  mounted() {
    this.$analytics.logEvent('홈페이지 방문')
  },
  watch: {
    tab(val) {
      if (val === 1) this.$analytics.logEvent('활동 탭 클릭')
      else if (val === 2) this.$analytics.logEvent('소개 탭 클릭')
      else if (val === 3) this.$analytics.logEvent('스택 탭 클릭')
      else if (val === 4) this.$analytics.logEvent('이력 탭 클릭')
      else if (val === 5) this.$analytics.logEvent('일지 탭 클릭')
    },
    logOpen(val) {
      if (!val) this.dayLogs = []
    }
  },
  computed: {
    ...mapGetters({
      locale: 'GET_CURRENT_LOCALE'
    })
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  width: 320px;
  height: 390px;
  border-radius: 4px;
  background: #2c3035;
  color: #cecfd0;
  transition: 0.3s;
  &:hover {
    filter: brightness(1.05);
    transform: translate(0, -3px);
  }
  @media screen and (max-width: $sm) {
    width: 100%;
  }
}

.card-title {
  font-size: 18px;
  color: #cecfd0;
  font-weight: bold;
  line-height: 24px;
  word-break: keep-all;
  word-wrap: break-word;
}

.card-description {
  font-size: 13px;
  color: #cecfd0;
  height: 75px;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  &.no-title {
    -webkit-line-clamp: 8;
    height: 120px;
  }
}

.tab-container {
  padding: 34px 0;
  font-weight: 300;
}
</style>

<style lang="scss">
.editor {
  p {
    font-size: 28px;
    line-height: 36px;
    @media screen and (max-width: $md) {
      font-size: 20px;
    }
  }
}
</style>
