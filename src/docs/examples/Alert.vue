<script setup lang="js">
    import { onMounted } from 'vue';

    //TUTAJ MOGE PISAĆ KOD KTÓRY SIĘ WYKONA PO ZAŁADOWANIU; MOGE UZYC QUERY SELECTOR
    onMounted(() => {
        console.log(document.querySelector('onyks-button'))
    })
</script>

<template>
    <Content>
        <h1>Alert</h1>
        <h2>An element to inform a user about something.</h2>

        <h3>Default</h3>
        <onyks-alert>An example alert!</onyks-alert>
        <onyks-code-block language="html" size="m" title="Example alert">
            &lt;onyks-alert>An example alert!&lt;/onyks-alert>
        </onyks-code-block>

        <h3>Sizes</h3>
        <onyks-alert type="info" size="s">S size!</onyks-alert>
        <onyks-alert type="error" size="m">M size!</onyks-alert>
        <onyks-alert type="warning" size="l">L size!</onyks-alert>
        <onyks-alert type="success" size="xl">XL size!</onyks-alert>

        <onyks-code-block language="html" size="m" title="Available sizes">
            &lt;onyks-alert type="info" size="s">S size!&lt;/onyks-alert>
            &lt;onyks-alert type="error" size="m">M size!&lt;/onyks-alert>
            &lt;onyks-alert type="warning" size="l">L size!&lt;/onyks-alert>
            &lt;onyks-alert type="success" size="xl">XL size!&lt;/onyks-alert>
        </onyks-code-block>

        <h3>Styles/Types</h3>
        <p>There are a few styles for different needs:</p>
        <onyks-alert type="info" size="m">Info style!</onyks-alert>
        <onyks-alert type="error" size="m">Error style!</onyks-alert>
        <onyks-alert type="warning" size="m">Warning style!</onyks-alert>
        <onyks-alert type="success" size="m">Success size!</onyks-alert>

        <onyks-code-block language="html" size="m" title="Available styles">
            &lt;onyks-alert type="info" size="m">Info style!&lt;/onyks-alert>
            &lt;onyks-alert type="error" size="m">Error style!&lt;/onyks-alert>
            &lt;onyks-alert type="warning" size="m">Warning style!&lt;/onyks-alert>
            &lt;onyks-alert type="success" size="m">Success size!&lt;/onyks-alert>
        </onyks-code-block>

        <h3>Others</h3>

        <p>Examples with a long text:</p>

        <onyks-alert type="info" size="s">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus magni illo vel a adipisci dolor! Consequuntur culpa voluptatem eum molestias ea quod in recusandae dicta tempora corrupti tempore, suscipit ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quibusdam, magnam, officia quam sit blanditiis at cupiditate repellendus quia eum quis, itaque aliquid minus in? Explicabo dolorum officiis ut doloribus.</onyks-alert>
        <onyks-alert type="error" size="m">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus magni illo vel a adipisci dolor! Consequuntur culpa voluptatem eum molestias ea quod in recusandae dicta tempora corrupti tempore, suscipit ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quibusdam, magnam, officia quam sit blanditiis at cupiditate repellendus quia eum quis, itaque aliquid minus in? Explicabo dolorum officiis ut doloribus.</onyks-alert>
        <onyks-alert type="warning" size="l">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus magni illo vel a adipisci dolor! Consequuntur culpa voluptatem eum molestias ea quod in recusandae dicta tempora corrupti tempore, suscipit ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quibusdam, magnam, officia quam sit blanditiis at cupiditate repellendus quia eum quis, itaque aliquid minus in? Explicabo dolorum officiis ut doloribus.</onyks-alert>
        <onyks-alert type="success" size="xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus magni illo vel a adipisci dolor! Consequuntur culpa voluptatem eum molestias ea quod in recusandae dicta tempora corrupti tempore, suscipit ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quibusdam, magnam, officia quam sit blanditiis at cupiditate repellendus quia eum quis, itaque aliquid minus in? Explicabo dolorum officiis ut doloribus.</onyks-alert>

        
        <onyks-code-block language="html" size="m" title="Long text example">
            &lt;onyks-alert type="info" size="s">[Lorem Ipsum text...]&lt;/onyks-alert>
            &lt;onyks-alert type="error" size="m">[Lorem Ipsum text...]&lt;/onyks-alert>
            &lt;onyks-alert type="warning" size="l">[Lorem Ipsum text...]&lt;/onyks-alert>
            &lt;onyks-alert type="success" size="xl">[Lorem Ipsum text...]&lt;/onyks-alert>
        </onyks-code-block>
        
    </Content>
</template>