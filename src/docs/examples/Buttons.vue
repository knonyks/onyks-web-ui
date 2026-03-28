<script setup lang="js">
    import { onMounted } from 'vue';
    import Content from '../components/Content.vue';
import PageTitle from '../components/PageTitle.vue';

    //TUTAJ MOGE PISAĆ KOD KTÓRY SIĘ WYKONA PO ZAŁADOWANIU; MOGE UZYC QUERY SELECTOR
    onMounted(() => {
        console.log(document.querySelector('onyks-button'))
    })
</script>

<template>
    <Content>
        <PageTitle>Buttons</PageTitle>
        <h2>A button for general purposes.</h2>
        <h3>Default button</h3>
        
        <onyks-code-block language="html" size="m">
            &lt;onyks-button>Vanilla&lt;/onyks-button>
        </onyks-code-block>

        <h3>Available sizes</h3>

        <div>
            <onyks-button size="s">Size S</onyks-button>
            <onyks-button size="m">Size M</onyks-button>
            <onyks-button size="l">Size L</onyks-button>
            <onyks-button size="xl">Size XL</onyks-button>
        </div>

        <onyks-code-block language="html" size="m">
            &lt;onyks-button size="s">Size S&lt;/onyks-button>
            &lt;onyks-button size="m">Size M&lt;/onyks-button>
            &lt;onyks-button size="l">Size L<&lt;/onyks-button>
            &lt;onyks-button size="xl">Size XL&lt;/onyks-button>
        </onyks-code-block>

        <h3>Available backgrounds</h3>
        <div>
            <onyks-button background="red">Red background</onyks-button>
            <onyks-button background="green">Green background</onyks-button>
            <onyks-button background="blue">Blue background</onyks-button>
        </div>

        <onyks-code-block language="html" size="m">
            &lt;onyks-button background="red">Red background&lt;/onyks-button>
            &lt;onyks-button background="green">Green background&lt;/onyks-button>
            &lt;onyks-button background="blue">Blue background&lt;/onyks-button>
        </onyks-code-block>

        <h3>Link (href) feature</h3>
        <h4>There is a possibility to add directly a link to a button by `href` parameter.</h4>

        <onyks-button background="blue" href="https://google.com">Google's link!</onyks-button>

        <onyks-code-block language="html" size="m">
            &lt;onyks-button background="blue" href="https://google.com">Google's link!&lt;/onyks-button>
        </onyks-code-block>

        <h3>Type feature</h3>
        <h4>We can also set the type of the button for eg. forms.</h4>

        <div>
            <onyks-button type="button">Button!</onyks-button>
            <onyks-button type="submit">Submit!</onyks-button>
            <onyks-button type="reset">Reset!</onyks-button>
        </div>

        <onyks-code-block language="html" size="m">
            &lt;onyks-button type="button">Button!&lt;/onyks-button>
            &lt;onyks-button type="submit">Submit!&lt;/onyks-button>
            &lt;onyks-button type="reset">Reset!&lt;/onyks-button>
        </onyks-code-block>

        <h3>Disabled feature</h3>
        <h4>We can disable our buttons.</h4>

        <div>
            <onyks-button type="button" disabled>Button!</onyks-button>
            <onyks-button type="submit" disabled>Submit!</onyks-button>
            <onyks-button type="reset" disabled>Reset!</onyks-button>
            <onyks-button background="blue" href="https://google.com" disabled>Google's link!</onyks-button>
        </div>

        <onyks-code-block language="html" size="m">
            &lt;onyks-button type="button" disabled>Button!&lt;/onyks-button>
            &lt;onyks-button type="submit" disabled>Submit!&lt;/onyks-button>
            &lt;onyks-button type="reset" disabled>Reset!&lt;/onyks-button>
            &lt;onyks-button background="blue" href="https://google.com" disabled>Google's link!&lt;/onyks-button>
        </onyks-code-block>

    </Content>
</template>

<style lang="css" scoped>
</style>