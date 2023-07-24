<template>
  <div class='page'>
    <div class='svg' v-html='svgCode' />
    <div class='tips'>
      <div class='title'>404</div>
      <div class='context1'>OHH! You've lost your way!</div>
      <div class='context2'>
        Life is mysterious but easy to get lost.
        You should be curious but also be cautious.
        But don't be afraid, there's always a way home.
      </div>
      <el-button
        type='primary'
        plain
        color='darkcyan'
        @click='backToHome'
      >
        HOME
      </el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { svgCode } from './config.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const backToHome = () => {
  router.push('home')
}

onMounted(() => {
  gsap.set('svg', {})

  gsap.to('#headStripe', {
    y: 0.5,
    rotation: 1,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    duration: 1
  })
  gsap.to('#spaceman', {
    y: 0.5,
    rotation: 1,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    duration: 1
  })
  gsap.to('#craterSmall', {
    x: -3,
    yoyo: true,
    repeat: -1,
    duration: 1,
    ease: 'sine.inOut'
  })
  gsap.to('#craterBig', {
    x: 3,
    yoyo: true,
    repeat: -1,
    duration: 1,
    ease: 'sine.inOut'
  })
  gsap.to('#planet', {
    rotation: -2,
    yoyo: true,
    repeat: -1,
    duration: 1,
    ease: 'sine.inOut',
    transformOrigin: '50% 50%'
  })

  gsap.to('#starsBig g', {
    rotation: 'random(-30,30)',
    transformOrigin: '50% 50%',
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  })
  gsap.fromTo(
    '#starsSmall g',
    { scale: 0, transformOrigin: '50% 50%' },
    { scale: 1, transformOrigin: '50% 50%', yoyo: true, repeat: -1, stagger: 0.1 }
  )
  gsap.to('#circlesSmall circle', {
    y: -4,
    yoyo: true,
    duration: 1,
    ease: 'sine.inOut',
    repeat: -1
  })
  gsap.to('#circlesBig circle', {
    y: -2,
    yoyo: true,
    duration: 1,
    ease: 'sine.inOut',
    repeat: -1
  })

  gsap.set('#glassShine', { x: -68 })

  gsap.to('#glassShine', {
    x: 80,
    duration: 2,
    rotation: -30,
    ease: 'expo.inOut',
    transformOrigin: '50% 50%',
    repeat: -1,
    repeatDelay: 8,
    delay: 2
  })
})
</script>

<style scoped lang='less'>
.page {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;

  .svg {
    width: 700px;
  }

  .tips {
    width: 600px;

    .title {
      font-size: 120px;
      font-weight: bolder;
    }

    .context1 {
      font-size: 30px;
      font-weight: bold;
      margin-top: 40px;
      letter-spacing: 1px;
      color: #333;
    }

    .context2 {
      font-size: 20px;
      margin-top: 10px;
      line-height: 26px;
      letter-spacing: 1px;
      color: #666;
    }

    .el-button {
      width: 120px;
      height: 40px;
      margin-top: 30px;
    }
  }
}
</style>
