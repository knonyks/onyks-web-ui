<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<style scoped>
    .content
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        align-items: flex-start;
    }

    .content > :slotted(:is(*))
    {
        flex-shrink: 0;
    }

    .content :slotted(:is(h1, h2, h3, h4, h5, p)) 
    {
        padding: 0;
        margin: 0;
    }
</style>