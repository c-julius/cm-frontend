<template>
  <div id="app">
    <SiteHeader />
    <FlashMessages
      :messages="flashMessages"
      :is-authenticated="isAuthenticated"
    />
    <ContentBlock>
      <router-view />
    </ContentBlock>
    <SiteFooter />
  </div>
</template>
  
  <script>
  import { mapState, mapGetters } from 'vuex';
  import SiteHeader from './components/SiteHeader.vue';
  import FlashMessages from './components/FlashMessages.vue';
  import ContentBlock from './components/ContentBlock.vue';
  import SiteFooter from './components/SiteFooter.vue';
  
  export default {
    components: {
      SiteHeader,
      FlashMessages,
      ContentBlock,
      SiteFooter
    },
    computed: {
    ...mapState(['isAuthenticated', 'flashMessages']),
    ...mapGetters(['user'])
  }
  };
  </script>
  
  <style>
  </style>