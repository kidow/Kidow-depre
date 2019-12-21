<template>
  <div style="padding-top: 30px">
    <a-tabs :animated="false" :tabBarGutter="0" @change="key => tab = key">
      <a-tab-pane tab="VIEW ALL" :key="1" />
      <a-tab-pane tab="ABOUT" :key="2" />
      <a-tab-pane tab="STACKS" :key="3" />
      <a-tab-pane tab="CAREERS" :key="4" />
    </a-tabs>

    <template v-if="tab === 1">
      <a-input-search />
      <a-list :grid="{ gutter: 16, xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }" :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-card
            :key="index"
            hoverable
            :bordered="false"
            class="card-container"
            @click="$router.push(`/post/${item.id}`)"
          >
            <img
              alt="thumbnail"
              :src="item.thumbnail"
              slot="cover"
              style="height: 160px; object-fit: cover"
            />
            <a-card-meta>
              <h3 slot="title" class="card-title">{{ item.title}}</h3>
              <p slot="description" class="card-description">{{ item.description }}</p>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </a-list>
    </template>

    <div v-else-if="tab === 2" class="intro">
      <p>다크 모드를 사랑하는 웹 개발자 김동욱입니다. 2018년 4월부터 개발을 시작했습니다.</p>
    </div>

    <div v-else-if="tab === 3">STACKS</div>
    <div v-else-if="tab === 4">CAREERS</div>
  </div>
</template>

<script>
export default {
  data: _ => ({
    data: [
      {
        id: '1',
        title: '기계가 사람의 목소리를 잘 알아듣게 하려면',
        description:
          '가정용 음성인식 기기, 스마트폰의 음성인식 기능을 사용하면서 자주 겪는 경험이죠. 이렇게 문제가 있기는 하지만 인공지능을 일상에서 사용할 수 있다는 재미, 말 한마디면 음악도 틀어주고 날씨도 알려준다는 효용감은 확실합니다.',
        thumbnail:
          'https://content.surfit.io/thumbs/image/3MxNK/wD1Zv/4292043875dfb416824e56.gif/cover-center-1x.webp'
      },
      {
        id: '2',
        title: '토스 백화점은 성공할 수 있을까',
        description:
          '대한민국 대표 핀테크 앱에 이름이 올라가는 게 몇 개 있습니다. 토스, 카카오페이, 네이버페이 등이 그렇습니다. 저는 그중 유독 토스가 대단하다고 생각합니다. 카카오나 네이버는 원래 덩치 큰 녀석이 세력을 넓힌 것이지만 토스는 맨땅에서 헤딩한 것 같아 보여서요. 토스가 나타나고 여태까지 제가 아는 것만 수십여 개의 핀테크 스타트업들이 나타났다가 사라졌습니다. 아수라장 속에서 살아남아 지금까지 발전해 온 토스는 정말 대단하다고 생각합니다.',
        thumbnail:
          'https://content.surfit.io/thumbs/image/3aDeK/3OlGn/2999283435dfafae68f570.png/cover-center-1x.webp'
      },
      {
        id: '3',
        title: '카카오의 무서운 전략, 카카오메일',
        description:
          '카카오메일이 최근 핫했습니다. 지난달 신청자를 대상으로 메일주소 선점 이벤트를 한데 이어 11월 5일 서비스를 오픈했습니다. 커뮤니티들에서는 서로 좋은 메일주소 확보를 하려고 노력했고 성공, 실패담이 계속 올라왔죠.',
        thumbnail:
          'https://content.surfit.io/thumbs/image/3aDeK/wkGvX/7953439555dfafc8123118.png/cover-center-1x.webp'
      },
      {
        id: '4',
        title: '당신의 CTA는 안녕하신가요?',
        description:
          '최근 회사에서 사이트를 개편하는 작업을 진행하고 있습니다. 사이트 방문자의 전환, 즉 ‘가입’을 유도해야 하는 최종 목적을 가진 사이트임에도 불구하고, 곳곳에 운영자의 욕심이 덕지덕지 붙어있는 게 보여 심히 부끄러웠습니다. 왜냐면 사이트의 운영 담당자가 바로 저였거든요.',
        thumbnail:
          'https://content.surfit.io/thumbs/image/wWam3/KpWML/18038864605dfb433e58661/cover-center-1x.webp'
      },
      {
        id: '5',
        title: 'UX&서비스 디자인 유학을 생각하는 사람들에게 1편',
        description:
          '저 역시 사회 초년생 이지만 연말이 되면 가끔 진로 상담을 하게 됩니다. 지인의 지인, 가끔 모르는 분들이 질문을 하기도 합니다. 디자인 유학 또 연결되어 해외 취업을 고민하는 사람들이 많았는데요. 묻는 질문이 반복 되기도 하고 내가 하는 얘기도 반복 되다 보니, 궁금해 하는 게 비슷하다 싶어 글로 정리하려 합니다.',
        thumbnail:
          'https://content.surfit.io/thumbs/image/3MzV5/3X4o8/109464065dfb3caf55764/cover-center-1x.webp'
      }
    ],
    tab: 1
  }),
  methods: {
    tabChange(key) {
      console.log(key)
    }
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
  @media screen and (max-width: $lg) {
  }
}

.card-title {
  font-size: 17px;
  color: #cecfd0;
  font-weight: bold;
  line-height: 24px;
  word-break: keep-all;
  word-wrap: break-word;
}

.card-description {
  font-size: 13px;
  color: #cecfd0;
  height: 40px;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.intro {
  font-size: 20px;
  padding: 34px 0;
  p {
    line-height: 36px;
  }
}
</style>