<script setup>

</script>

<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<style lang="css" scoped>
    .content
    {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }
</style>