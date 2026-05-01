<script setup lang="js">
    import { onMounted } from 'vue';
    import PageContent from '../components/PageContent.vue';

    onMounted(() => {
        console.log(document.querySelector('onyks-button'))
    })
</script>

<template>
    <PageContent>
        <onyks-list>
            <onyks-list-element>Element 1</onyks-list-element>
            <onyks-list-element>Element 2</onyks-list-element>
            <onyks-list-element>Element 3</onyks-list-element>
            <onyks-list-element>Element 1</onyks-list-element>
            <onyks-list-element>Element 2</onyks-list-element>
            <onyks-list-element>Element 3</onyks-list-element>
            <onyks-list-element>Element 1</onyks-list-element>
            <onyks-list-element>Element 2</onyks-list-element>
            <onyks-list-element>Element 3</onyks-list-element>
        </onyks-list>
    </PageContent>
</template>