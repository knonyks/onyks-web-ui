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
        <PageTitle>Path</PageTitle>
       
<onyks-path size="xl">
    <onyks-path-chain>Folder nr. 1</onyks-path-chain>
    <onyks-path-chain>Folder nr. 2</onyks-path-chain>
    <onyks-path-chain>Folder nr. 3</onyks-path-chain>
    <onyks-path-chain>Folder nr. 4</onyks-path-chain>
    <onyks-path-chain>A very long text in a path chain</onyks-path-chain>
    <onyks-path-chain>Folder nr. 5</onyks-path-chain>
    <onyks-path-chain>Folder nr. 6</onyks-path-chain>
    <onyks-path-chain>A second very long text in a path chain</onyks-path-chain>
</onyks-path>

    </Content>
</template>

<style lang="css" scoped>
    onyks-path
    {
        width: 100%;
    }
</style>