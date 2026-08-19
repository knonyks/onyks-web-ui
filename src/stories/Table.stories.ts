import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Table',
    component: 'onyks-table',
    tags: ['autodocs'],
    argTypes: {
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
            description: 'Optional array defining the headers (JS/TS mode). You can hide a column by passing `hidden: true` (e.g. `{ key: "id", label: "UUID", hidden: true }`).',
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

        'checkbox-click': {
            description: 'Event emitted when a checkbox is clicked.',
            action: 'checkbox-click',
            table: { category: 'Events' }
        },
        'scroll-end': {
            description: 'Event emitted when scrolling reaches the bottom of the table.',
            action: 'scroll-end',
            table: { category: 'Events' }
        },

        row_header: {
            name: 'header', 
            description: 'Removes hover effects and applies header row styling.',
            control: false, 
            table: { category: 'Sub-components (Manual HTML)', subcategory: '<onyks-row>', type: { summary: 'boolean' } }
        },
        col_header: {
            name: 'header',
            description: 'Makes the cell a sticky header at the top of the table.',
            control: false,
            table: { category: 'Sub-components (Manual HTML)', subcategory: '<onyks-col>', type: { summary: 'boolean' } }
        },
        col_checkbox: {
            name: 'checkbox',
            description: 'Renders an `<onyks-checkbox>` inside the cell.',
            control: false,
            table: { category: 'Sub-components (Manual HTML)', subcategory: '<onyks-col>', type: { summary: 'boolean' } }
        },
        col_hidden: {
            name: 'hidden',
            description: 'Hides the column completely (display: none). Must be applied to the header and all corresponding cells in that column.',
            control: false,
            table: { category: 'Sub-components (Manual HTML)', subcategory: '<onyks-col>', type: { summary: 'boolean' } }
        },
        col_size: {
            name: 'size',
            description: 'Font size and padding for the cell.',
            control: false,
            table: { category: 'Sub-components (Manual HTML)', subcategory: '<onyks-col>', type: { summary: "'s' | 'm' | 'l' | 'xl'" } }
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
        <div style="height: 300px;">
            <onyks-table 
                .data=${args.data} 
                .columns=${args.columns}
                size=${args.size}
                maxHeight=${args.maxHeight}
                scrollThreshold=${args.scrollThreshold}
                @checkbox-click=${args['checkbox-click']}
                @scroll-end=${args['scroll-end']}
            ></onyks-table>
        </div>
    `,
    args: {
        size: 'm',
        data: sampleData,
        columns: sampleColumns,
        maxHeight: '100%',
        scrollThreshold: 10
    }
};

export const Hidden_Columns_JS: Story = {
    render: (args) => html`
        <div style="height: 300px;">
            <onyks-table 
                .data=${args.data} 
                .columns=${args.columns}
                size=${args.size}
                maxHeight=${args.maxHeight}
            ></onyks-table>
        </div>
    `,
    args: {
        size: 'm',
        data: sampleData,
        columns: [
            { key: 'selected', label: '' },
            { key: 'id', label: 'UUID', hidden: true },
            { key: 'name', label: 'Part Name' },
            { key: 'desc', label: 'Description', hidden: true }, 
            { key: 'code', label: 'Value' },
            { key: 'status', label: 'Availability' }
        ],
        maxHeight: '100%'
    },
    parameters: {
        docs: {
            description: {
                story: 'In JS mode, you can hide specific columns by adding `hidden: true` to the column definition object. In this example, the **UUID** and **Description** columns are hidden.'
            }
        }
    }
};

export const Manual_HTML_With_Hidden: Story = {
    render: (args) => html`
        <div style="height: 300px;">
            <onyks-table size=${args.size} maxHeight=${args.maxHeight}>
            
                <onyks-row header>
                    <onyks-col header checkbox size=${args.size}></onyks-col>
                    <onyks-col header size=${args.size}>UUID</onyks-col>
                    <onyks-col header size=${args.size}>Part Name</onyks-col>
                    <onyks-col header size=${args.size}>Description</onyks-col>
                    <onyks-col header size=${args.size}>Value</onyks-col>
                </onyks-row>

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

            </onyks-table>
        </div>
    `,
    args: {
        size: 'm',
        maxHeight: '100%',
        data: [],
        columns: [],
        scrollThreshold: 10
    },
    parameters: {
        docs: {
            description: {
                story: 'In Manual HTML mode, you can hide columns by adding the `hidden` attribute to the `<onyks-col>` tag. **Important:** You must add the `hidden` attribute to the corresponding column in the header AND in every row to keep the table layout intact.'
            }
        }
    }
};