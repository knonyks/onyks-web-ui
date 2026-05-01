<script setup lang="js">
    import { onMounted } from 'vue';
    import PageContent from '../components/PageContent.vue';

    onMounted(() => {
        console.log(document.querySelector('onyks-button'))
    })
</script>

<template>
    <PageContent>
        <onyks-flying-panel>
            <p>Flying panel content</p>
            <onyks-button>Button inside flying panel</onyks-button>
        </onyks-flying-panel>

        <onyks-flying-panel style="gap: 20px">
            <onyks-button style="width: 150px;">Log out</onyks-button>
        </onyks-flying-panel>
    </PageContent>  
</template>