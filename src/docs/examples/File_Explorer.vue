<script setup lang="js">
    import { onMounted } from 'vue';
    import Content from '../components/Content.vue';
    import PageTitle from '../components/PageTitle.vue';

    onMounted(() => {
        console.log(document.querySelector('onyks-button'))
    })
</script>

<template>
    <Content>
        <PageTitle>File Explorer</PageTitle>
       

    </Content>
</template>

<style lang="css" scoped>

</style>