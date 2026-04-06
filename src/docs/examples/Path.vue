<script setup lang="js">
    import { onMounted } from 'vue';
    import Content from '../components/Content.vue';
    import PageTitle from '../components/PageTitle.vue';

    onMounted(() => 
    {
        const my_path = document.getElementById('my_path');
        const add_folder_btn = document.getElementById('add_folder_btn')

        my_path.addEventListener('path-changed', (event) => 
        {
            const current_path = event.detail.path;
            const url_format = current_path.join('/');
            console.log(url_format)
            console.log(current_path)
        });

        add_folder_btn.addEventListener('click', () => 
        {
            my_path.add_folder("New Folder " + Math.floor(Math.random() * 100));
        });
    })
</script>

<template>
    <Content>
        <h1>Path</h1>
        <h2>An element to show a current working directory.</h2>
        <onyks-alert type="warning">This element has no completed style but it's stable to use.</onyks-alert>
        
        <h3>Default</h3>
        <onyks-path>
            <onyks-path-chain>Folder no. 1</onyks-path-chain>
            <onyks-path-chain>Folder no. 2</onyks-path-chain>
            <onyks-path-chain>Folder no. 3</onyks-path-chain>
            <onyks-path-chain>Folder no. 4</onyks-path-chain>
            <onyks-path-chain>A very long text in a path chain</onyks-path-chain>
            <onyks-path-chain>Folder no. 5</onyks-path-chain>
            <onyks-path-chain>Folder no. 6</onyks-path-chain>
            <onyks-path-chain>A second very long text in a path chain</onyks-path-chain>
        </onyks-path>

        <onyks-code-block language="html" title="Default path" size="m">
            &lt;onyks-path>
                &lt;onyks-path-chain>Folder no. 1&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 2&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 3&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 4&lt;/onyks-path-chain>
                &lt;onyks-path-chain>A very long text in a path chain&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 5&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 6&lt;/onyks-path-chain>
                &lt;onyks-path-chain>A second very long text in a path chain&lt;/onyks-path-chain>
            &lt;/onyks-path>
        </onyks-code-block>

        <h3>Sizes</h3>

        <onyks-path size="s">
            <onyks-path-chain>Folder no. 1</onyks-path-chain>
            <onyks-path-chain>Folder no. 2</onyks-path-chain>
            <onyks-path-chain>Folder no. 3</onyks-path-chain>
        </onyks-path>

        <onyks-path size="m">
            <onyks-path-chain>Folder no. 1</onyks-path-chain>
            <onyks-path-chain>Folder no. 2</onyks-path-chain>
            <onyks-path-chain>Folder no. 3</onyks-path-chain>
        </onyks-path>

        <onyks-path size="l">
            <onyks-path-chain>Folder no. 1</onyks-path-chain>
            <onyks-path-chain>Folder no. 2</onyks-path-chain>
            <onyks-path-chain>Folder no. 3</onyks-path-chain>
        </onyks-path>

        <onyks-path size="xl">
            <onyks-path-chain>Folder no. 1</onyks-path-chain>
            <onyks-path-chain>Folder no. 2</onyks-path-chain>
            <onyks-path-chain>Folder no. 3</onyks-path-chain>
        </onyks-path>

        <onyks-code-block language="html" title="Available sizes" size="m">
            &lt;onyks-path size="s">
                &lt;onyks-path-chain>Folder no. 1&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 2&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 3&lt;/onyks-path-chain>
            &lt;/onyks-path>

            &lt;onyks-path size="m">
                &lt;onyks-path-chain>Folder no. 1&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 2&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 3&lt;/onyks-path-chain>
            &lt;/onyks-path>

            &lt;onyks-path size="l">
                &lt;onyks-path-chain>Folder no. 1&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 2&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 3&lt;/onyks-path-chain>
            &lt;/onyks-path>

            &lt;onyks-path size="xl">
                &lt;onyks-path-chain>Folder no. 1&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 2&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 3&lt;/onyks-path-chain>
            &lt;/onyks-path>
        </onyks-code-block>

        <h3>Interface of the element</h3>
        <p>The path element has interface which can be easily used on the website with file explorer. Example code is below:</p>

        <onyks-button id="add_folder_btn">Click to add the folder!</onyks-button>

        <onyks-path id="my_path">
            <onyks-path-chain>Folder no. 1</onyks-path-chain>
            <onyks-path-chain>Folder no. 2</onyks-path-chain>
            <onyks-path-chain>Folder no. 3</onyks-path-chain>
            <onyks-path-chain>Folder no. 4</onyks-path-chain>
            <onyks-path-chain>A very long text in a path chain</onyks-path-chain>
            <onyks-path-chain>Folder no. 5</onyks-path-chain>
            <onyks-path-chain>Folder no. 6</onyks-path-chain>
            <onyks-path-chain>A second very long text in a path chain</onyks-path-chain>
        </onyks-path>

        <onyks-code-block language="html" title="HTML code of the example" size="m">
            &lt;onyks-button id="add_folder_btn">Click to change the folder!&lt;/onyks-button>

            &lt;onyks-path size="s" id="my_path">
                &lt;onyks-path-chain>Folder no. 1&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 2&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 3&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 4&lt;/onyks-path-chain>
                &lt;onyks-path-chain>A very long text in a path chain&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 5&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder no. 6&lt;/onyks-path-chain>
                &lt;onyks-path-chain>A second very long text in a path chain&lt;/onyks-path-chain>
            &lt;/onyks-path>
        </onyks-code-block>

        <onyks-code-block language="js" file="LICENSE" title="JS code of the example" size="m">
            const my_path = document.getElementById('my_path');
            const add_folder_btn = document.getElementById('add_folder_btn')

            my_path.addEventListener('path-changed', (event) => 
            {
                const current_path = event.detail.path;
                const url_format = current_path.join('/');
                console.log(url_format)
                console.log(current_path)
            });

            add_folder_btn.addEventListener('click', () => 
            {
                my_path.add_folder("New Folder " + Math.floor(Math.random() * 100));
            });
        </onyks-code-block>

    </Content>
</template>

<style lang="css" scoped>
    onyks-path
    {
        width: 100%;
    }
</style>