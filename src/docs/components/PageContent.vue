<script setup>

</script>

<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<style lang="css">
    .content
    {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        text-align: justify;
    }

    onyks-button
    { 
        width: fit-content;
    }
</style>