<template>
  <ul
    v-if="flashMessages.length"
    ref="flashContainer"
    class="flashes"
  >
    <!-- Render each flash message -->
    <div 
      v-for="(message, index) in flashMessages" 
      v-show="visibleMessages[index]" 
      :key="index" 
      :class="`alert alert-${message.type} alert-dismissible fade show`" 
      role="alert"
    >
      {{ message.text }}
      <button 
        type="button" 
        class="btn-close" 
        aria-label="Close" 
        @click="hideMessage(index)"
      />
    </div>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            visibleMessages: [] // Tracks visibility of each message
        };
    },
    computed: {
        ...mapGetters(['flashMessages', 'isAuthenticated']) // Get flash messages from Vuex
    },
    watch: {
        flashMessages: {
            handler(newMessages) {
                // Reset visibility for all messages when flashMessages changes
                this.visibleMessages = newMessages.map(() => true);

                // Scroll to the top of the flash messages container
                this.$nextTick(() => {
                    if (this.$refs.flashContainer) {
                        this.$refs.flashContainer.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            },
            immediate: true // Trigger on component mount
        }
    },
    methods: {
        hideMessage(index) {
            // Hide the message at the given index
            this.visibleMessages[index] = false;
        }
    }
};
</script>

<style scoped>
</style>