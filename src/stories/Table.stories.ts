import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Table',
    component: 'onyks-table',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-table 
            .data=${args.data} 
            .columns=${args.columns}
            scrollThreshold=${args.scrollThreshold}
            maxHeight=${args.maxHeight}
        ></onyks-table>
    `,

    argTypes: {
        data: {
            control: 'object',
            description: 'Tablica obiektów reprezentująca wiersze. Jeśli wartość klucza to boolean, kolumna zmieni się w checkbox.',
            table: { category: 'Table Properties' }
        },
        columns: {
            control: 'object',
            description: 'Opcjonalna tablica definiująca nagłówki (np. [{ key: "id", label: "ID" }])',
            table: { category: 'Table Properties' }
        },
        scrollThreshold: {
            control: 'number',
            description: 'Dystans do dołu (w px), przy którym odpala się event @scroll-end',
            table: { category: 'Table Properties' }
        },
        maxHeight: {
            control: 'text',
            description: 'Maksymalna wysokość tabeli. Po przekroczeniu tej wartości pojawi się wewnętrzny pasek przewijania (np. "300px", "100%", "auto").',
            table: { category: 'Table Properties' }
        }
    },
    
    parameters: {
        docs: {
            description: {
                component: 'Responsywna tabela wspierająca dynamiczne renderowanie danych, automatyczne checkboxy, przyklejony nagłówek i wykrywanie końca scrollowania.'
            }
        }
    }
};

export default meta;
type Story = StoryObj;

const sampleData = [
    { selected: false, id: 1, name: 'Jan Kowalski', role: 'Admin', status: 'Aktywny' },
    { selected: true, id: 2, name: 'Anna Nowak', role: 'User', status: 'Nieaktywny' },
    { selected: false, id: 3, name: 'Piotr Wiśniewski', role: 'Moderator', status: 'Aktywny' },
    { selected: false, id: 4, name: 'Katarzyna Wójcik', role: 'User', status: 'Zbanowany' },
    { selected: false, id: 5, name: 'Michał Kamiński', role: 'User', status: 'Aktywny' },
];

const sampleColumns = [
    { key: 'selected', label: 'Wybór' },
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Imię i Nazwisko' },
    { key: 'role', label: 'Rola' },
    { key: 'status', label: 'Status' }
];

export const Table_Properties: Story = {
    args: {
        data: sampleData,
        columns: sampleColumns,
        scrollThreshold: 10,
        maxHeight: '300px' // Ustawienie konkretnej wysokości wymusi pojawienie się scrolla przy większej ilości danych
    }
};

export const Auto_Columns: Story = {
    args: {
        data: [
            { aktywny: false, serwer: 'EU-WEST-1', ping: '24ms' },
            { aktywny: true, serwer: 'US-EAST-2', ping: '110ms' },
            { aktywny: false, serwer: 'ASIA-1', ping: '250ms' },
        ],
        columns: [],
        scrollThreshold: 0,
        maxHeight: 'auto'
    },
    parameters: {
        docs: {
            description: {
                story: 'Gdy nie dostarczysz wartości `columns`, tabela automatycznie wygeneruje nagłówki na podstawie kluczy z pierwszego wiersza z przekazanych w obiekcie `data`.'
            }
        }
    }
};