<script setup lang="js">
    import { onMounted } from 'vue';
    import PageContent from '../components/PageContent.vue';

    onMounted(() => 
    {
        // const my_path = document.getElementById('my_path');
        // const add_folder_btn = document.getElementById('add_folder_btn')

        // my_path.addEventListener('path-changed', (event) => 
        // {
        //     const current_path = event.detail.path;
        //     const url_format = current_path.join('/');
        //     console.log(url_format)
        //     console.log(current_path)
        // });

        // add_folder_btn.addEventListener('click', () => 
        // {
        //     my_path.add_folder("New Folder " + Math.floor(Math.random() * 100));
        // });

        document.querySelectorAll('onyks-path')[0].content = ["First", "Second", "Third"];
        document.querySelectorAll('onyks-path')[1].content = ["First", "Second", "Third"];
        document.querySelectorAll('onyks-path')[1].addEventListener('path-changed', (e) => {
            const current_path = e.detail.path;
            const url_format = current_path.join('/');
            console.log(url_format)
        })
        document.querySelectorAll('onyks-button')[0].addEventListener('click', (e) => {
            console.log(document.querySelectorAll('onyks-path')[1].content)
            console.dir(document.querySelectorAll('onyks-path')[1].content)
            document.querySelectorAll('onyks-path')[1].add_folder("New Folder " + Math.floor(Math.random() * 100))
        })

        // document.querySelectorAll('onyks-path')[2].content = ["First", "Second", "Third"];
        // document.querySelectorAll('onyks-path')[3].content = ["First", "Second", "Third"];
        // document.querySelectorAll('onyks-path')[4].content = ["First", "Second", "Third"];

    })
</script>

<template>
    <PageContent>
        <h1>Path</h1>
        <h2>An element to show a current working directory.</h2>
        <onyks-alert type="warning">This element hasn't completed. It is under development.</onyks-alert>
        <h3>Using (element's interface)</h3>

        <onyks-path></onyks-path>

        <p>To set up the content of the path we need to fill <em>content</em> parameter.</p>
        <onyks-code-block language="js" title="JavaScript" size="m">
        document.querySelector('onyks-path').content = ["First", "Second", "Third"];
        </onyks-code-block>

        <onyks-code-block language="html" title="HTML" size="m">
        &lt;onyks-path&gt;&lt;/onyks-path&gt;
        </onyks-code-block>

        <p>If we changed the path (clicked the past folder in the element) there will happen an event <em>path-changed</em>. Below there is an example of it:</p>

        <onyks-path></onyks-path>
        <onyks-button>Add a folder!</onyks-button>




        <h3>Sizes</h3>

        <onyks-path size="s"></onyks-path>
        <onyks-path size="m"></onyks-path>
        <onyks-path size="l"></onyks-path>
        <onyks-path size="xl"></onyks-path>


        <onyks-code-block language="html" title="HTML" size="m">
            &lt;onyks-path size="s">&lt;/onyks-path>
            &lt;onyks-path size="m">&lt;/onyks-path>
            &lt;onyks-path size="l">&lt;/onyks-path>
            &lt;onyks-path size="xl">&lt;/onyks-path>
        </onyks-code-block>






    </PageContent>
</template>

<style lang="css" scoped>
    onyks-path
    {
        width: 100%;
    }
</style>