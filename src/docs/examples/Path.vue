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
        <PageTitle>Path</PageTitle>
        <onyks-path size="xl">
            <onyks-path-chain>Folder nr. 1</onyks-path-chain>
            <onyks-path-chain>Folder nr. 2</onyks-path-chain>
            <onyks-path-chain>Folder nr. 3</onyks-path-chain>
            <onyks-path-chain>Folder nr. 4</onyks-path-chain>
            <onyks-path-chain>A very long text in a path chain</onyks-path-chain>
            <onyks-path-chain>Folder nr. 5</onyks-path-chain>
            <onyks-path-chain>Folder nr. 6</onyks-path-chain>
            <onyks-path-chain>A second very long text in a path chain</onyks-path-chain>
        </onyks-path>

        <onyks-code-block language="html" file="LICENSE" title="" size="m" id="license">
            &lt;onyks-path size="xl">
                &lt;onyks-path-chain>Folder nr. 1&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder nr. 2&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder nr. 3&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder nr. 4&lt;/onyks-path-chain>
                &lt;onyks-path-chain>A very long text in a path chain&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder nr. 5&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder nr. 6&lt;/onyks-path-chain>
                &lt;onyks-path-chain>A second very long text in a path chain&lt;/onyks-path-chain>
            &lt;/onyks-path>
        </onyks-code-block>

        <onyks-button id="add_folder_btn">Click to change the folder!</onyks-button>

        <onyks-path size="s" id="my_path">
            <onyks-path-chain>Folder nr. 1</onyks-path-chain>
            <onyks-path-chain>Folder nr. 2</onyks-path-chain>
            <onyks-path-chain>Folder nr. 3</onyks-path-chain>
            <onyks-path-chain>Folder nr. 4</onyks-path-chain>
            <onyks-path-chain>A very long text in a path chain</onyks-path-chain>
            <onyks-path-chain>Folder nr. 5</onyks-path-chain>
            <onyks-path-chain>Folder nr. 6</onyks-path-chain>
            <onyks-path-chain>A second very long text in a path chain</onyks-path-chain>
        </onyks-path>

        <onyks-code-block language="html" file="LICENSE" title="HTML Code" size="m">
            &lt;onyks-button id="add_folder_btn">Click to change the folder!&lt;/onyks-button>

            &lt;onyks-path size="s" id="my_path">
                &lt;onyks-path-chain>Folder nr. 1&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder nr. 2&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder nr. 3&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder nr. 4&lt;/onyks-path-chain>
                &lt;onyks-path-chain>A very long text in a path chain&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder nr. 5&lt;/onyks-path-chain>
                &lt;onyks-path-chain>Folder nr. 6&lt;/onyks-path-chain>
                &lt;onyks-path-chain>A second very long text in a path chain&lt;/onyks-path-chain>
            &lt;/onyks-path>
      </onyks-code-block>


        <onyks-code-block language="js" file="LICENSE" title="JS Code" size="m">
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