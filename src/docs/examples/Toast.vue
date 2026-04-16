<script setup lang="js">
    import { onMounted } from 'vue';
    import PageContent from '../components/PageContent.vue';

    //TUTAJ MOGE PISAĆ KOD KTÓRY SIĘ WYKONA PO ZAŁADOWANIU; MOGE UZYC QUERY SELECTOR
    onMounted(() => {
        console.log(document.querySelector('onyks-button'))
    })
</script>

<template>
    <PageContent>
        <h1>Toast</h1>
        <onyks-toast>Adding manufacturer was successful!</onyks-toast>
        
    </PageContent>
</template>

<style lang="css" scoped>


</style>