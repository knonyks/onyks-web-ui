<script setup lang="js">
    import { onMounted } from 'vue';
    import Content from '../components/Content.vue';
    import PageTitle from '../components/PageTitle.vue';

    const pobierzDane = () => {
        const onyksTable = document.querySelector('#dynamiczna-tabela');
        const dane = onyksTable.getTableData(); 
        
        console.log("Tabelki:", dane);
        alert("Zapisane, idź do konsoli NOW");
    };
    onMounted(() => {
        const onyksTable = document.querySelector('#dynamiczna-tabela');

        onyksTable.columns = [
            { key: 'id', label: 'ID Projektu' },
            { key: 'priorytet', label: 'Priorytet' },
            { key: 'aplikacja', label: 'Aplikacja' },
            { key: 'szczegoly', label: 'Szczegóły' },
            { key: 'status', label: 'Status' },
            { key: 'dostepny', label: 'Dostępny' }
        ];

        onyksTable.data = [
            { id: "ERR-001", priorytet: "Niski", aplikacja: "Frontend", szczegoly: "Drobny błąd stylowania w stopce.", status: "Nowy", dostepny: true },
            { id: "ERR-002", priorytet: "KRYTYCZNY", aplikacja: "Backend API", szczegoly: "NullPointerException w module płatności.", status: "W toku", dostepny: false },
            { id: "ERR-003", priorytet: "Średni", aplikacja: "Baza Danych", szczegoly: "Przekroczony limit połączeń.", status: "Oczekuje", dostepny: true },
            { id: "ERR-004", priorytet: "Średni", aplikacja: "Baza Danych", szczegoly: "Przekroczony limit połączeń.", status: "Oczekuje", dostepny: true }
        ];
    });
</script>

<template>
    <Content>
        <PageTitle>Onyks Table</PageTitle>

        <h2>Dynamic table (JS/TS data)</h2>
        <h3>Table generated automatically from an array of dictionaries.</h3>
        
        <onyks-table id="dynamiczna-tabela"></onyks-table>

        <div style="margin-top: 15px; margin-bottom: 30px;">
            <onyks-button @click="pobierzDane">Pobierz stan tabeli (zobacz konsolę)</onyks-button>
        </div>

        <h4>Vue / JS Setup (onMounted)</h4>
        <onyks-code-block language="javascript" size="m">
            const onyksTable = document.querySelector('#dynamiczna-tabela');

            // 1. Nagłówki
            onyksTable.columns = [
                { key: 'id', label: 'ID Projektu' },
                { key: 'priorytet', label: 'Priorytet' },
                { key: 'status', label: 'Status' },
                { key: 'dostepny', label: 'Dostępny' }
            ];

            // 2. Dane do tabelki
            onyksTable.data = [
                { id: "ERR-001", priorytet: "Niski", status: "Nowy", dostepny: true },
                { id: "ERR-002", priorytet: "KRYTYCZNY", status: "W toku", dostepny: false }
            ];

            // 3. Wyciągamy dane z tabelki stworzonej w JS/TS lub czysto HTML przez funkcję
            const currentData = onyksTable.getTableData();
                    </onyks-code-block>

                    <h4>HTML Component</h4>
                    <onyks-code-block language="html" size="m">
            &lt;onyks-table id="dynamiczna-tabela">&lt;/onyks-table>
            &lt;onyks-button @click="pobierzDane">Pobierz stan tabeli&lt;/onyks-button>
        </onyks-code-block>


        <hr style="border-color: var(--surface-border); margin: 40px 0;">


        <h2>Static table (Classic HTML)</h2>
        <h3>Table structured using classic slots and tags.</h3>

        <onyks-table>
            <onyks-row header>
                <onyks-col>UUID</onyks-col>
                <onyks-col>Dostawca</onyks-col>
                <onyks-col>Data utworzenia</onyks-col>
            </onyks-row>
            <onyks-row>
                <onyks-col>123e4567-e89b-12d3-a456-426614174000</onyks-col>
                <onyks-col>Firma Przykładowa Sp. z o.o.</onyks-col>
                <onyks-col>2024-01-01 12:00:00</onyks-col>
            </onyks-row>
            <onyks-row>
                <onyks-col>987fcdea-e89b-12d3-a456-426614174111</onyks-col>
                <onyks-col>Januszex S.A.</onyks-col>
                <onyks-col>2024-03-15 08:30:00</onyks-col>
            </onyks-row>
        </onyks-table>

        <div style="margin-top: 30px;">
            <h4>HTML Component</h4>
            <onyks-code-block language="html" size="m">
                &lt;onyks-table>
                    &lt;onyks-row header>
                        &lt;onyks-col>UUID&lt;/onyks-col>
                        &lt;onyks-col>Dostawca&lt;/onyks-col>
                        &lt;onyks-col>Data utworzenia&lt;/onyks-col>
                    &lt;/onyks-row>
                    &lt;onyks-row>
                        &lt;onyks-col>123e4567-e89b-12d3-a456-426614174000&lt;/onyks-col>
                        &lt;onyks-col>Firma Przykładowa Sp. z o.o.&lt;/onyks-col>
                        &lt;onyks-col>2024-01-01 12:00:00&lt;/onyks-col>
                    &lt;/onyks-row>
                &lt;/onyks-table>
            </onyks-code-block>
        </div>

    </Content>
</template>

<style lang="css" scoped>
</style>