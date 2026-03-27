<template>
    <footer class="footer">
        
    </footer>
</template>

<style scoped>
    .footer
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        background-color: red;
        height: 300px;
        width: 100%;
    }

    .footer > *
    {
        flex-shrink: 0;
    }
</style>