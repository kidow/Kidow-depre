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
      'https://cdn.pixabay.com/photo/2016/01/29/16/57/prague-1168302_960_720.jpg'
  })
}
</script>

<style lang="scss" scoped>
.post-container {
  margin: 0 auto;
  padding: 150px 0;
  width: $xxl;
  color: $font-color;
  @media screen and (max-width: $xxl) {
    width: $xl;
    padding: 30px 18px;
  }
  @media screen and (max-width: $xl) {
    width: $lg;
  }
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
</style>