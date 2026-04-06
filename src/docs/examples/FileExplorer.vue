<script setup lang="js">
    import { onMounted } from 'vue';
    import Content from '../components/Content.vue';
    import PageTitle from '../components/PageTitle.vue';

    onMounted(() => 
    {
        const explorer = document.getElementById('myExplorer');
        const btn = document.getElementById('getFilesBtn');

        explorer.content = [
            { type: 'folder', name: 'Dokumenty' },
            { type: 'folder', name: 'Zdjęcia' },
            { type: 'file', name: 'raport.pdf' }
        ];

        explorer.addEventListener('enter-folder', async (e) => 
        {
            const folderName = e.detail.folder.name;
            console.log(`Pobieranie zawartości dla folderu: ${folderName}...`);
    
            // Tutaj dajesz swoją logikę API, np:
            // const response = await fetch(`/api/folders/${folderName}`);
            // const newContent = await response.json();
            
            // Symulacja odpowiedzi z serwera po 500ms
            setTimeout(() => {
                explorer.content = [
                    { type: 'file', name: `plik_z_${folderName}_1.txt` },
                    { type: 'file', name: `plik_z_${folderName}_2.png` },
                    { type: 'folder', name: 'Pusty podfolder' }
                    
                ];
            }, 500);
        });

        // 3. Wywoływanie funkcji pobierającej zaznaczone pliki
        btn.addEventListener('click', () => {
            const selected = explorer.getSelectedItems();
            console.log("Zaznaczone elementy:", selected);
            // Zwróci np. [{ type: "file", name: "raport.pdf" }]
        });
    })
</script>

<template>
    <Content>
        <h1>File Explorer</h1>
        <h2>An element for showing the struct of files and folders; folders trees</h2>
        <onyks-alert type="error">This element is not completed; not completed styles and API.</onyks-alert>
        
        
        
        
        <onyks-file-explorer 
            id="myExplorer">
            </onyks-file-explorer>

            <button id="getFilesBtn">Pobierz zaznaczone pliki</button>
    </Content>
</template>

<style lang="css" scoped>

</style>