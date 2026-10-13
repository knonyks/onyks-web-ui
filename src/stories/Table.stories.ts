import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type TableRow = Record<string, any>;

const meta: Meta = {
    title: 'ONYKS WebUI/Table',
    component: 'onyks-table',
    tags: ['autodocs'],
    argTypes: {

        size: {
            control: 'select',
            options: ['s', 'm', 'l', 'xl'],
            description: 'Text size in the table. Default: `"m"`.',
            table: { category: 'Appearance' }
        },
        maxHeight: {
            control: 'text',
            description: 'Maximum height. If the table is taller, a scroll bar appears. Example: `"300px"`.',
            table: { category: 'Appearance' }
        },
        scrollThreshold: {
            control: 'number',
            description: 'How many pixels before the bottom the `scroll-end` event is sent. Use it to load more rows.',
            table: { category: 'Appearance' }
        },
        data: {
            control: 'object',
            description: 'List of rows. Each object is one row, each field is one cell. A `true` / `false` value becomes a checkbox.',
            table: { category: 'Data' }
        },
        columns: {
            control: 'object',
            description: 'Optional. Column order and header names. Add `hidden: true` to hide a column in the table. Add `details: false` to leave a column out of the default row details. Example: `{ key: "id", label: "UUID", hidden: true }`.',
            table: { category: 'Data' }
        },
        rowKey: {
            control: 'text',
            description: 'Name of the field that is unique for each row. The table uses it to remember which rows are open, even after the data changes. Default: `"id"`.',
            table: { category: 'Data' }
        },
        expandable: {
            control: 'boolean',
            description: 'Shows an arrow at the start of each row. Clicking it opens the row details.',
            table: { category: 'Expandable rows' }
        },
        rowExpanded: {
            control: 'boolean',
            description: '`true` = all rows start open. `false` = all rows start closed (default).',
            table: { category: 'Expandable rows' }
        },
        expandedTemplate: {
            control: false,
            description: 'Optional. A function that gets one row and returns what to show when it is open. Without it, the table shows a list of all fields. Example: `(row) => html\\`<p>${row.name}</p>\\``. Your page CSS does not reach this content, so put styles inside it (`style="…"` or a `<style>` tag).',
            table: { category: 'Expandable rows', type: { summary: '(row) => html`…`' } }
        },
        canExpand: {
            control: false,
            description: 'Optional. A function that decides which rows get an arrow. Example: `(row) => row.items.length > 0`.',
            table: { category: 'Expandable rows', type: { summary: '(row) => true | false' } }
        },
        'getSelectedRows(key?)': {
            description: 'Returns the rows with a checked checkbox. By default it checks the `selected` field. Pass another field name to check a different checkbox column.',
            control: false,
            table: { category: 'Functions' }
        },
        'setColumnVisibility(key, hidden)': {
            description: 'Hides or shows a column. Example: `table.setColumnVisibility("desc", true)`.',
            control: false,
            table: { category: 'Functions' }
        },
        'toggleRow(index, expanded?)': {
            description: 'Opens or closes one row. `0` is the first row. Pass `true` or `false` as the second value to open or close it for sure.',
            control: false,
            table: { category: 'Functions' }
        },
        'isRowExpanded(index)': {
            description: 'Returns `true` if the row is open.',
            control: false,
            table: { category: 'Functions' }
        },
        'expandAll() / collapseAll()': {
            description: 'Opens or closes all rows.',
            control: false,
            table: { category: 'Functions' }
        },
        'renderDefaultDetails(row)': {
            description: 'Returns the default details (list of all fields). Use it inside your own `expandedTemplate` to add something to the default view.',
            control: false,
            table: { category: 'Functions' }
        },
        'refresh()': {
            description: 'Redraws the table. Use it after changing rows or columns by hand.',
            control: false,
            table: { category: 'Functions' }
        },
        'checkbox-click': {
            description: 'Sent when someone clicks a checkbox.',
            action: 'checkbox-click',
            table: { category: 'Events' }
        },
        'row-toggle': {
            description: 'Sent when someone opens or closes a row. `e.detail` has `rowIndex`, `row` and `expanded`.',
            action: 'row-toggle',
            table: { category: 'Events' }
        },
        'scroll-end': {
            description: 'Sent when the table is scrolled to the bottom.',
            action: 'scroll-end',
            table: { category: 'Events' }
        },
        row_header: {
            name: 'header',
            description: 'Header row. Stays at the top when scrolling.',
            control: false,
            table: { category: 'HTML mode', subcategory: '<onyks-row>', type: { summary: 'attribute' } }
        },
        row_expanded: {
            name: 'expanded',
            description: 'The row is open and shows its details.',
            control: false,
            table: { category: 'HTML mode', subcategory: '<onyks-row>', type: { summary: 'attribute' } }
        },
        row_toggle: {
            name: 'toggle(expanded?)',
            description: 'Function on the row element. Opens or closes the row. Example: `document.querySelector("onyks-row").toggle()`.',
            control: false,
            table: { category: 'HTML mode', subcategory: '<onyks-row>', type: { summary: 'function' } }
        },
        row_details: {
            name: 'slot="details"',
            description: 'Put it on any element inside a row. That element becomes the row details, visible only when the row is open.',
            control: false,
            table: { category: 'HTML mode', subcategory: '<onyks-row>', type: { summary: 'attribute' } }
        },
        col_header: {
            name: 'header',
            description: 'Header cell.',
            control: false,
            table: { category: 'HTML mode', subcategory: '<onyks-col>', type: { summary: 'attribute' } }
        },
        col_checkbox: {
            name: 'checkbox',
            description: 'Cell with a checkbox. Add `checked` to tick it.',
            control: false,
            table: { category: 'HTML mode', subcategory: '<onyks-col>', type: { summary: 'attribute' } }
        },
        col_expander: {
            name: 'expander',
            description: 'Cell with the arrow that opens the row. In the header row, add an empty `<onyks-col header expander>` so columns line up.',
            control: false,
            table: { category: 'HTML mode', subcategory: '<onyks-col>', type: { summary: 'attribute' } }
        },
        col_hide: {
            name: 'hide',
            description: 'Hides the cell. Add it to the same column in the header and in every row.',
            control: false,
            table: { category: 'HTML mode', subcategory: '<onyks-col>', type: { summary: 'attribute' } }
        },
        col_size: {
            name: 'size',
            description: 'Text size of one cell: `s`, `m`, `l` or `xl`. Without it, the cell uses the table size.',
            control: false,
            table: { category: 'HTML mode', subcategory: '<onyks-col>', type: { summary: 'attribute' } }
        }
    },

    parameters: {
        docs: {
            description: {
                component: 'Table built from `<onyks-row>` (rows) and `<onyks-col>` (cells). You can use it in two ways:\n\n- **JS mode:** set `table.data` and the table builds the rows for you.\n- **HTML mode:** write `<onyks-row>` and `<onyks-col>` yourself between the `<onyks-table>` tags.\n\nRows can be opened to show details in both modes.'
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

const orderData = [
    {
        id: '1001456', name: 'Spring Season Gift', amount: '$250.00', date: '02/14/2025',
        items: [
            { id: 17890, item: 'Wireless headphones', amount: '$150.00', qty: 1 },
            { id: 17891, item: 'Heart shape ring', amount: '$100.00', qty: 1 }
        ]
    },
    {
        id: '1001457', name: 'Christmas Season Gift', amount: '$349.00', date: '12/14/2025',
        items: [
            { id: 17900, item: 'Chocolate giftbox', amount: '$150.00', qty: 1 },
            { id: 17901, item: 'Game console', amount: '$199.00', qty: 1 }
        ]
    },
    {
        id: '1001458', name: 'Birthday Gift', amount: '$200.00', date: '',
        items: []
    }
];

const orderColumns = [
    { key: 'id', label: 'Product ID' },
    { key: 'name', label: 'Product Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Order Date' }
];

const buttonStyle = 'padding: 8px 16px; cursor: pointer; background: var(--onyks-surface-2, #3a3c40); color: white; border: none; border-radius: 4px;';

export const Basic_JS: Story = {
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: 16px; height: 350px;">
            <onyks-table
                id="basic-table"
                .data=${args.data}
                .columns=${args.columns}
                size=${args.size}
                maxHeight=${args.maxHeight}
                scrollThreshold=${args.scrollThreshold}
                @checkbox-click=${args['checkbox-click']}
                @scroll-end=${args['scroll-end']}
            ></onyks-table>

            <div>
                <button
                    style=${buttonStyle}
                    @click=${() => {
                        const table = document.getElementById('basic-table') as any;
                        const selected = table.getSelectedRows();
                        console.log('Selected rows:', selected);
                        alert(`Selected rows: ${selected.length}. Details in the console.`);
                    }}
                >
                    Get Selected Rows
                </button>
            </div>
        </div>
    `,
    args: {
        size: 'm',
        data: sampleData,
        columns: sampleColumns,
        maxHeight: '100%',
        scrollThreshold: 10
    },
    parameters: {
        docs: {
            description: {
                story: 'Set `data` and the table builds itself. The `selected` field is `true` / `false`, so it becomes a checkbox.'
            },
            source: {
                transform: () => `
<onyks-table id="my-table"></onyks-table>

<script>
    const table = document.getElementById('my-table');

    // Each object = one row
    table.data = [
        { selected: false, id: '2b98…', name: 'Part 18' },
        { selected: true,  id: 'c5d7…', name: 'Part 19' },
    ];

    // Optional: column order and header names
    table.columns = [
        { key: 'selected', label: '' },
        { key: 'id',       label: 'UUID' },
        { key: 'name',     label: 'Part Name' },
    ];

    // Rows with a checked checkbox
    console.log(table.getSelectedRows());
</script>
`
            }
        }
    }
};

export const Hidden_Columns_JS: Story = {
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: 16px; height: 350px;">
            <div>
                <button
                    style=${buttonStyle}
                    @click=${(e: Event) => {
                        const table = document.getElementById('hidden-table') as any;
                        const btn = e.currentTarget as HTMLButtonElement;
                        const hide = btn.dataset.hidden !== 'true';

                        table.setColumnVisibility('desc', hide);

                        btn.dataset.hidden = String(hide);
                        btn.innerText = hide ? 'Show Description' : 'Hide Description';
                    }}
                >
                    Hide Description
                </button>
            </div>
            <onyks-table
                id="hidden-table"
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
            { key: 'desc', label: 'Description' },
            { key: 'code', label: 'Value' },
            { key: 'status', label: 'Availability' }
        ],
        maxHeight: '100%'
    },
    parameters: {
        docs: {
            description: {
                story: '**UUID** is hidden with `hidden: true`. The button hides and shows **Description** with `setColumnVisibility()`.'
            },
            source: {
                transform: () => `
// Hidden from the start
table.columns = [
    { key: 'id',   label: 'UUID', hidden: true },
    { key: 'name', label: 'Part Name' },
    { key: 'desc', label: 'Description' },
];

// Hide / show later
table.setColumnVisibility('desc', true);   // hide
table.setColumnVisibility('desc', false);  // show
`
            }
        }
    }
};

export const Expandable_JS: Story = {
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: 16px; height: 450px;">
            <div style="display: flex; gap: 8px;">
                <button style=${buttonStyle} @click=${() => (document.getElementById('expand-table') as any).expandAll()}>Expand all</button>
                <button style=${buttonStyle} @click=${() => (document.getElementById('expand-table') as any).collapseAll()}>Collapse all</button>
            </div>
            <onyks-table
                id="expand-table"
                .data=${args.data}
                .columns=${args.columns}
                .expandable=${args.expandable}
                .rowExpanded=${args.rowExpanded}
                size=${args.size}
                maxHeight=${args.maxHeight}
                @row-toggle=${args['row-toggle']}
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
            { key: 'status', label: 'Availability', details: false }
        ],
        expandable: true,
        rowExpanded: false,
        maxHeight: '100%'
    },
    parameters: {
        docs: {
            description: {
                story: 'Set `expandable = true` and each row gets an arrow. When opened, the row shows all its fields, including hidden columns (**UUID**, **Description**).'
            },
            source: {
                transform: () => `
table.data = [...];
table.expandable = true;      // arrow in each row

// Optional
table.rowExpanded = true;     // all rows start open
table.expandAll();            // open all
table.collapseAll();          // close all
table.toggleRow(0);           // open / close the first row

// Do something when a row is opened or closed
table.addEventListener('row-toggle', (e) => {
    console.log(e.detail.row, e.detail.expanded);
});
`
            }
        }
    }
};

const orderItemsTemplate = (row: TableRow) => html`
    <style>
        .items { width: 100%; border-collapse: collapse; }
        .items th, .items td {
            padding: var(--onyks-spacing-md) var(--onyks-spacing-lg);
            text-align: left;
            border-bottom: 1px solid var(--onyks-surface-1-border);
        }
        .items tbody tr:last-child td { border-bottom: none; }
    </style>
    <table class="items">
        <thead>
            <tr><th>#ID</th><th>Item</th><th>Amount</th><th>Qty</th></tr>
        </thead>
        <tbody>
            ${row.items.map((item: TableRow) => html`
                <tr><td>${item.id}</td><td>${item.item}</td><td>${item.amount}</td><td>${item.qty}</td></tr>
            `)}
        </tbody>
    </table>
`;

export const Expandable_Custom_Template_JS: Story = {
    render: (args) => html`
        <div style="height: 450px;">
            <onyks-table
                .data=${args.data}
                .columns=${args.columns}
                .expandable=${args.expandable}
                .rowExpanded=${args.rowExpanded}
                .expandedTemplate=${orderItemsTemplate}
                .canExpand=${(row: TableRow) => row.items.length > 0}
                size=${args.size}
                maxHeight=${args.maxHeight}
                @row-toggle=${args['row-toggle']}
            ></onyks-table>
        </div>
    `,
    args: {
        size: 'm',
        data: orderData,
        columns: orderColumns,
        expandable: true,
        rowExpanded: true,
        maxHeight: '100%'
    },
    parameters: {
        docs: {
            description: {
                story: '`expandedTemplate` decides what an open row shows. Here each order shows its items. `canExpand` removes the arrow from orders without items (**Birthday Gift**).'
            },
            source: {
                transform: () => `
import { html } from 'lit';

table.data = [
    { id: '1001456', name: 'Spring Season Gift',
      items: [ { item: 'Headphones', amount: '$150.00' } ] },
    { id: '1001458', name: 'Birthday Gift', items: [] },
];
table.expandable = true;

// What to show when a row is open.
// "row" is one object from table.data.
table.expandedTemplate = (row) => html\`
    <ul>
        \${row.items.map(item => html\`<li>\${item.item} – \${item.amount}</li>\`)}
    </ul>
\`;

// Only rows with items get an arrow
table.canExpand = (row) => row.items.length > 0;
`
            }
        }
    }
};

export const HTML_Hidden_Column: Story = {
    render: (args) => html`
        <div style="height: 300px;">
            <onyks-table size=${args.size} maxHeight=${args.maxHeight}>

                <onyks-row header>
                    <onyks-col header checkbox></onyks-col>
                    <onyks-col header>UUID</onyks-col>
                    <onyks-col header>Part Name</onyks-col>
                    <onyks-col header hide>Description (HIDDEN)</onyks-col>
                    <onyks-col header>Value</onyks-col>
                </onyks-row>

                <onyks-row>
                    <onyks-col checkbox></onyks-col>
                    <onyks-col>2b9893e6-0080-443e-aa70</onyks-col>
                    <onyks-col>Part 18</onyks-col>
                    <onyks-col hide>Description 18</onyks-col>
                    <onyks-col>cpc1e4</onyks-col>
                </onyks-row>

                <onyks-row>
                    <onyks-col checkbox checked></onyks-col>
                    <onyks-col>c5d751bb-7f3e-4c50-9718</onyks-col>
                    <onyks-col>Part 19</onyks-col>
                    <onyks-col hide>Description 19</onyks-col>
                    <onyks-col>8x968i</onyks-col>
                </onyks-row>

            </onyks-table>
        </div>
    `,
    args: {
        size: 'm',
        maxHeight: '100%',
        data: [],
        columns: []
    },
    parameters: {
        docs: {
            description: {
                story: 'In HTML mode you write the rows yourself. Add `hide` to a cell to hide it, in the header and in every row.'
            }
        }
    }
};

export const HTML_Expandable: Story = {
    render: (args) => html`
        <div style="height: 400px;">
            <onyks-table size=${args.size} maxHeight=${args.maxHeight} @row-toggle=${args['row-toggle']}>

                <onyks-row header>
                    <onyks-col header expander></onyks-col>
                    <onyks-col header>Product ID</onyks-col>
                    <onyks-col header>Product Name</onyks-col>
                    <onyks-col header>Amount</onyks-col>
                </onyks-row>

                <onyks-row expanded>
                    <onyks-col expander></onyks-col>
                    <onyks-col>1001456</onyks-col>
                    <onyks-col>Spring Season Gift</onyks-col>
                    <onyks-col>$250.00</onyks-col>
                    <div slot="details">
                        <strong>Items:</strong> Wireless headphones ($150.00), Heart shape ring ($100.00)
                    </div>
                </onyks-row>

                <onyks-row>
                    <onyks-col expander></onyks-col>
                    <onyks-col>1001457</onyks-col>
                    <onyks-col>Christmas Season Gift</onyks-col>
                    <onyks-col>$349.00</onyks-col>
                    <div slot="details">
                        <strong>Items:</strong> Chocolate giftbox ($150.00), Game console ($199.00)
                    </div>
                </onyks-row>

                <onyks-row>
                    <onyks-col></onyks-col>
                    <onyks-col>1001458</onyks-col>
                    <onyks-col>Birthday Gift</onyks-col>
                    <onyks-col>$200.00</onyks-col>
                </onyks-row>

            </onyks-table>
        </div>
    `,
    args: {
        size: 'm',
        maxHeight: '100%',
        data: [],
        columns: []
    },
    parameters: {
        docs: {
            description: {
                story: 'To make a row open in HTML mode:\n\n1. Add `<onyks-col expander>` – the arrow.\n2. Add an element with `slot="details"` – what shows when the row is open.\n3. Optional: add `expanded` to `<onyks-row>` so it starts open.\n\nA row without details gets an empty `<onyks-col>` instead of the arrow. Your normal page CSS works on the details here.'
            }
        }
    }
};
