<template>
          <div class="subtitle-1">
          <v-icon>{{ formatProvider(video.provider) }}</v-icon>
          <a :href="video.channelLink" target="_blank" class="muted-link">{{
            video.channel
          }}</a>
        </div>
</template>

<script>
export default {
    props: ["video"],

}
</script>

<style>

</style>