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
        <h1>Text help</h1>
        <onyks-text-help>This is a text help element.</onyks-text-help>
        <onyks-text-help></onyks-text-help>
        <onyks-button background="red">Click me</onyks-button>
        <onyks-button background="green">Click me</onyks-button>
        <onyks-button background="blue">Click me</onyks-button>
        <onyks-button background="yellow">Click me</onyks-button>
        <onyks-button background="purple">Click me</onyks-button>
        <onyks-button background="orange">Click me</onyks-button>
    </PageContent>
</template>

<style lang="css" scoped>


</style>