import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Table',
    component: 'onyks-table',
    tags: ['autodocs'],
    argTypes: {
        // --- GŁÓWNE WŁAŚCIWOŚCI TABELI ---
        size: {
            control: 'select',
            options: ['s', 'm', 'l', 'xl'],
            description: 'Size of the font and spacing in the table. The default value is "m".',
            table: { category: 'Table Properties' }
        },
        data: {
            control: 'object',
            description: 'Array of objects (JS/TS mode). If the value of a key is a boolean, the column will be rendered as a checkbox.',
            table: { category: 'Data Properties (JS)' }
        },
        columns: {
            control: 'object',
            description: 'Optional array defining the headers (JS/TS mode).',
            table: { category: 'Data Properties (JS)' }
        },
        maxHeight: {
            control: 'text',
            description: 'Maximum height of the table. When this value is exceeded, an internal scroll bar will appear (e.g., "300px", "100%", "auto").',
            table: { category: 'Table Properties' }
        },
        scrollThreshold: {
            control: 'number',
            description: 'Distance to the bottom (in px), at which the @scroll-end event is triggered.',
            table: { category: 'Table Properties' }
        },

        // --- EVENTY ---
        'checkbox-click': {
            description: 'Event emitted when a checkbox is clicked. The `detail` object contains: `type` ("row" or "all"), `rowIndex`, `key`, `checked` status, and the full `rowData`.',
            action: 'checkbox-click',
            table: { category: 'Events' }
        },
        'scroll-end': {
            description: 'Event emitted when scrolling reaches the bottom of the table (depends on `scrollThreshold`). Useful for lazy loading data.',
            action: 'scroll-end',
            table: { category: 'Events' }
        },

        // --- DOKUMENTACJA SUB-KOMPONENTÓW W TABELI ---
        row_header: {
            name: 'header', // Prawdziwa nazwa wyświetlana w tabeli
            description: 'Removes hover effects and applies header row styling.',
            control: false, // Wyłączamy kontrolkę, bo to tylko dokumentacja
            table: { 
                category: 'Sub-components (Manual HTML)',
                subcategory: '<onyks-row>',
                type: { summary: 'boolean' }
            }
        },
        col_header: {
            name: 'header',
            description: 'Makes the cell a sticky header at the top of the table.',
            control: false,
            table: { 
                category: 'Sub-components (Manual HTML)',
                subcategory: '<onyks-col>',
                type: { summary: 'boolean' }
            }
        },
        col_checkbox: {
            name: 'checkbox',
            description: 'Renders an `<onyks-checkbox>` inside the cell and adjusts cell width/padding appropriately.',
            control: false,
            table: { 
                category: 'Sub-components (Manual HTML)',
                subcategory: '<onyks-col>',
                type: { summary: 'boolean' }
            }
        },
        col_checked: {
            name: 'checked',
            description: 'Determines the checked state of the checkbox (requires the `checkbox` attribute).',
            control: false,
            table: { 
                category: 'Sub-components (Manual HTML)',
                subcategory: '<onyks-col>',
                type: { summary: 'boolean' }
            }
        },
        col_size: {
            name: 'size',
            description: 'Font size and padding for the cell. Should ideally match the table\'s size.',
            control: false,
            table: { 
                category: 'Sub-components (Manual HTML)',
                subcategory: '<onyks-col>',
                type: { summary: "'s' | 'm' | 'l' | 'xl'" }
            }
        }
    },
    
    parameters: {
        docs: {
            description: {
                component: 'Responsive table supporting two modes: dynamic (via object properties in JS/TS) and declarative (manual structure building in HTML).'
            }
        }
    }
};

export default meta;
type Story = StoryObj;

const sampleData = [
    { selected: false, id: '2b9893e6-0080-443e-aa70', name: 'Part 18', desc: 'Description 18', code: 'cpc1e4', status: 'Unavailable' },
    { selected: true, id: 'c5d751bb-7f3e-4c50-9718', name: 'Part 19', desc: 'Description 19', code: '8x968i', status: 'Unavailable' },
    { selected: false, id: '4e147522-a6fc-4c15-8f0c', name: 'Part 20', desc: 'Description 20', code: 'kw329z', status: 'Unavailable' },
    { selected: false, id: 'ed36eb82-1e4b-4fab-a72f', name: 'Part 21', desc: 'Description 21', code: '9rldu4', status: 'Unavailable' }
];

const sampleColumns = [
    { key: 'selected', label: '' },
    { key: 'id', label: 'UUID' },
    { key: 'name', label: 'Part Name' },
    { key: 'desc', label: 'Description' },
    { key: 'code', label: 'Value' },
    { key: 'status', label: 'Availability' }
];

export const Dynamic_JS: Story = {
    render: (args) => html`
        <onyks-table 
            .data=${args.data} 
            .columns=${args.columns}
            size=${args.size}
            maxHeight=${args.maxHeight}
            scrollThreshold=${args.scrollThreshold}
            @checkbox-click=${args['checkbox-click']}
            @scroll-end=${args['scroll-end']}
        ></onyks-table>
    `,
    args: {
        size: 'm',
        data: sampleData,
        columns: sampleColumns,
        maxHeight: '300px',
        scrollThreshold: 10
    },
    parameters: {
        docs: {
            description: {
                story: 'Using the table with properties passed directly from JavaScript/TypeScript (`.data` and optionally `.columns`). The component automatically renders the appropriate rows and checkboxes. Try clicking a checkbox and observe the **Actions** tab below.'
            }
        }
    }
};

export const Manual_HTML: Story = {
    render: (args) => html`
        <!-- Important ! We don't pass .data or .columns when adding rows manually -->
        <onyks-table 
            size=${args.size} 
            maxHeight=${args.maxHeight}
            @scroll-end=${args['scroll-end']}
        >
            
            <!-- Manually added Header -->
            <onyks-row header>
                <onyks-col header checkbox size=${args.size}></onyks-col>
                <onyks-col header size=${args.size}>UUID</onyks-col>
                <onyks-col header size=${args.size}>Part Name</onyks-col>
                <onyks-col header size=${args.size}>Description</onyks-col>
                <onyks-col header size=${args.size}>Value</onyks-col>
            </onyks-row>

            <!-- Manually added Rows -->
            <onyks-row>
                <onyks-col checkbox size=${args.size}></onyks-col>
                <onyks-col size=${args.size}>2b9893e6-0080-443e-aa70</onyks-col>
                <onyks-col size=${args.size}>Part 18</onyks-col>
                <onyks-col size=${args.size}>Description 18</onyks-col>
                <onyks-col size=${args.size}>cpc1e4</onyks-col>
            </onyks-row>

            <onyks-row>
                <onyks-col checkbox checked size=${args.size}></onyks-col>
                <onyks-col size=${args.size}>c5d751bb-7f3e-4c50-9718</onyks-col>
                <onyks-col size=${args.size}>Part 19</onyks-col>
                <onyks-col size=${args.size}>Description 19</onyks-col>
                <onyks-col size=${args.size}>8x968i</onyks-col>
            </onyks-row>

            <onyks-row>
                <onyks-col checkbox size=${args.size}></onyks-col>
                <onyks-col size=${args.size}>4e147522-a6fc-4c15-8f0c</onyks-col>
                <onyks-col size=${args.size}>Part 20</onyks-col>
                <onyks-col size=${args.size}>Description 20</onyks-col>
                <onyks-col size=${args.size}>kw329z</onyks-col>
            </onyks-row>

        </onyks-table>
    `,
    args: {
        size: 'm',
        maxHeight: '300px',
        data: [],
        columns: [],
        scrollThreshold: 10
    },
    parameters: {
        docs: {
            description: {
                story: 'Table can be built fully manually (declaratively) using `<onyks-row>` and `<onyks-col>` tags inside the slot (without passing `data`). Remember to add attributes such as `header`, `checkbox`, and `checked` to the columns to apply the appropriate styles and behaviors.'
            }
        }
    }
};