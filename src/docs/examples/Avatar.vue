<script setup lang="js">
    import { onMounted } from 'vue';
    import PageContent from '../components/PageContent.vue';

    onMounted(() => {
        console.log(document.querySelector('onyks-button'))
    })
</script>

<template>
    <PageContent>
        <onyks-avatar shape="circle" type="emoji" src="🤡"></onyks-avatar>
        <onyks-avatar shape="square" type="emoji" src="🤡"></onyks-avatar>
        <onyks-avatar shape="square" type="emoji" src="🍆" size="xl"></onyks-avatar>

        <onyks-strip-menu type="v">
            <onyks-avatar shape="square" type="emoji" src="🤡" size="m"></onyks-avatar>
            <onyks-strip-menu-option icon="F425"></onyks-strip-menu-option>
            <onyks-strip-menu-option icon="F10D"></onyks-strip-menu-option>
            <onyks-strip-menu-option icon="F788" marked></onyks-strip-menu-option>
        </onyks-strip-menu>
    </PageContent>
</template>