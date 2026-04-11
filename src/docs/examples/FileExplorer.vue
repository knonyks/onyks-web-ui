<script setup lang="js">
    import { onMounted } from 'vue';
    import PageContent from '../components/PageContent.vue';

    onMounted(() => 
    {
        // const explorer = document.getElementById('my_explorer');
        // const btn = document.getElementById('get_files_btn');

        // explorer.content = [
        //     { type: 'folder', name: 'Dokumenty' },
        //     { type: 'folder', name: 'Zdjęcia' },
        //     { type: 'file', name: 'raport.pdf' }
        // ];

        // explorer.addEventListener('enter-folder', async (e) => 
        // {
        //     const folderName = e.detail.folder.name;
        //     console.log(`Pobieranie zawartości dla folderu: ${folderName}...`);
    
        //     setTimeout(() => {
        //         explorer.content = [
        //             { type: 'file', name: `plik_z_${folderName}_1.txt` },
        //             { type: 'file', name: `plik_z_${folderName}_2.png` },
        //             { type: 'folder', name: 'Pusty podfolder' }
                    
        //         ];
        //     }, 500);
        // });

        // // 3. Wywoływanie funkcji pobierającej zaznaczone pliki
        // btn.addEventListener('click', () => {
        //     const selected = explorer.getSelectedItems();
        //     console.log("Zaznaczone elementy:", selected);
        //     // Zwróci np. [{ type: "file", name: "raport.pdf" }]
        // });

        function random_folders_and_files(count = 10)
        {
            const types = ['file', 'folder'];
            const items = [];
            for (let i = 0; i < count; i++) 
            {
                const type = types[Math.floor(Math.random() * types.length)];
                items.push({ type, name: `${type}_${i}` });
            }
            return items;
        }

        const my_path = document.querySelector('#my_path')
        my_path.add_folder('root');
        const my_explorer = document.querySelector('#my_explorer')

        my_explorer.content = random_folders_and_files(15);
        my_explorer.addEventListener('enter-folder', (e) => 
        {
            const folderName = e.detail.folder.name;
            my_path.add_folder(folderName);
            my_explorer.content = random_folders_and_files(10);
        });

        my_path.addEventListener('path-changed', (event) => 
        {
            const current_path = event.detail.path;
            const url_format = current_path.join('/');
            console.log(`Current path: ${url_format}`);
            my_explorer.content = random_folders_and_files(10);
        });

        const default_example = document.querySelector('#default_example')
        const get_marked_button = document.querySelector('#get_marked_btn')

        default_example.content = [{type: 'folder', name: 'Folder no. 1'}, {type: 'file', name: "Some kind of file!"}]

        default_example.addEventListener('enter-folder', (e) =>
        {
            console.log(`Entered folder: ${e.detail.folder.name}`);
            default_example.content = [{type: 'folder', name: 'Subfolder'}, {type: 'file', name: "File in subfolder!"}];
        })

        get_marked_button.addEventListener('click', () =>
        {
            console.log(default_example.getSelectedItems())
        })

        let sizes = document.querySelectorAll('.size_example');
        sizes.forEach(explorer =>
        {  explorer.content = [
                { type: 'folder', name: 'Folder A' },
                { type: 'folder', name: 'Folder B' },
                { type: 'file', name: 'plik.txt' }
                ]; 
        })
    })
</script>

<template>
    <PageContent>
        <h1>File Explorer</h1>
        <h2>An element for showing the struct of files and folders; folders trees</h2>

        <h3>Default</h3>

        <p>Without integration with Javascript interface; without setted data.</p>
        <onyks-file-explorer></onyks-file-explorer>

        <onyks-code-block language="js" title="Example's Javascript">
        &lt;onyks-file-explorer>&lt;/onyks-file-explorer>
        </onyks-code-block>

        <p>We can set the content of the file explorer by the <em>content</em> parameter. Also we can set up which happen when we change the directory.</p>

        <onyks-file-explorer id="default_example"></onyks-file-explorer>
        <onyks-button id="get_marked_btn">Get marked files!</onyks-button>

        <onyks-code-block language="js">
        const default_example = document.querySelector('#default_example')
        const get_marked_button = document.querySelector('#get_marked_btn')

        default_example.content = [{type: 'folder', name: 'Folder no. 1'}, {type: 'file', name: "Some kind of file!"}]

        default_example.addEventListener('enter-folder', (e) =>
        {
            console.log(`Entered folder: ${e.detail.folder.name}`);
            default_example.content = [{type: 'folder', name: 'Subfolder'}, {type: 'file', name: "File in subfolder!"}];
        })

        get_marked_button.addEventListener('click', () =>
        {
            console.log(default_example.getSelectedItems())
        })
        </onyks-code-block>

        <onyks-code-block language="html">
            &lt;onyks-file-explorer id="default_example">&lt;/onyks-file-explorer>
            &lt;onyks-button id="get_marked_btn">Get marked files!&lt;/onyks-button>
        </onyks-code-block>

        <h3>Sizes</h3>

        <onyks-file-explorer size="s" class="size_example"></onyks-file-explorer>
        <onyks-file-explorer size="m" class="size_example"></onyks-file-explorer>
        <onyks-file-explorer size="l" class="size_example"></onyks-file-explorer>
        <onyks-file-explorer size="xl" class="size_example"></onyks-file-explorer>

        <onyks-code-block language="html">
            &lt;onyks-file-explorer size="s">&lt;/onyks-file-explorer>
            &lt;onyks-file-explorer size="m">&lt;/onyks-file-explorer>
            &lt;onyks-file-explorer size="l">&lt;/onyks-file-explorer>
            &lt;onyks-file-explorer size="xl">&lt;/onyks-file-explorer>
        </onyks-code-block>

        <h3>Multiple selection</h3>
        <p>User also can set whether the file explorer has to be multiselectable.</p>



        <h4>Multiselect</h4>

        <h4>Only one file</h4>






        <h3>Allow folder selection</h3>

        <p>We can set up if the file explorer can select folders or not.</p>






        <h3>Empty alert</h3>

        <p>There is a possibility to set up a message of the file explorer in case of empty folder.</p>

        <onyks-file-explorer emptyAlert="An examples and changed message - diffirent than default!"></onyks-file-explorer>

        <onyks-code-block language="html">
            &lt;onyks-file-explorer emptyAlert="An examples and changed message - diffirent than default!">&lt;/onyks-file-explorer>
        </onyks-code-block>

        <h3>Advanced example</h3>
        <p>There is the example which shows how it can be used with Path element to present content of folders.</p>

        <onyks-path id="my_path"></onyks-path>
        <onyks-file-explorer id="my_explorer"></onyks-file-explorer>

        <onyks-code-block language="js" title="Example's Javascript">
        function random_folders_and_files(count = 10)
        {
            const types = ['file', 'folder'];
            const items = [];
            for (let i = 0; i < count; i++) 
            {
                const type = types[Math.floor(Math.random() * types.length)];
                items.push({ type, name: `${type}_${i}` });
            }
            return items;
        }

        const my_path = document.querySelector('#my_path')
        my_path.add_folder('root');
        const my_explorer = document.querySelector('#my_explorer')

        my_explorer.content = random_folders_and_files(15);
        my_explorer.addEventListener('enter-folder', (e) => 
        {
            const folderName = e.detail.folder.name;
            my_path.add_folder(folderName);
            my_explorer.content = random_folders_and_files(10);
        });

        my_path.addEventListener('path-changed', (event) => 
        {
            const current_path = event.detail.path;
            const url_format = current_path.join('/');
            console.log(`Current path: ${url_format}`);
            my_explorer.content = random_folders_and_files(10);
        });
        </onyks-code-block>

        <onyks-code-block language="html" title="Example's HTML">
        &lt;onyks-path id="my_path">&lt;/onyks-path>
        &lt;onyks-file-explorer id="my_explorer">&lt;/onyks-file-explorer>
        </onyks-code-block>
    </PageContent>
</template>