import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Textfield',
    component: 'onyks-textfield',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-textfield
            size=${args.size}
            placeholder=${args.placeholder}
            type=${args.type}
            label=${args.label}
            value=${args.value}
            ?disabled=${args.disabled}
            ?error=${args.error}
        ></onyks-textfield>
    `,

    argTypes: {
        size: {
            options: ['s', 'm', 'l', 'xl'],
            control: { type: 'select' },
            description: 'Size of the textfield',
            table: { category: 'Textfield Properties' }
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text for the textfield',
            table: { category: 'Textfield Properties' }
        },
        type: {
            options: ['text', 'email', 'password', 'number'],
            control: { type: 'select' },
            description: 'Type of the textfield',
            table: { category: 'Textfield Properties' }
        },
        label: {
            control: { type: 'text' },
            description: 'Label for the textfield',
            table: { category: 'Textfield Properties' }
        },
        value: {
            control: { type: 'text' },
            description: 'Current value of the textfield',
            table: { category: 'Textfield Properties' }
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the textfield is disabled',
            table: { category: 'Textfield Properties' }
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the textfield has an error',
            table: { category: 'Textfield Properties' }
        },
        dropdown: {
            control: { type: 'boolean' },
            description: 'Turns on the dropdown list. It opens when the field is focused or the user types, if `options` is not empty.',
            table: { category: 'Dropdown' }
        },
        options: {
            control: { type: 'object' },
            description: 'List items: `[{ label: "Polska", value: "PL" }]`. The list shows `label`. Set it in JS: `field.options = [...]`.',
            table: { category: 'Dropdown', type: { summary: '{ label: string, value: any }[]' } }
        },
        scrollThreshold: {
            control: { type: 'number' },
            description: 'How many pixels before the end of the list the `scroll-end` event is sent. Default: `8`.',
            table: { category: 'Dropdown' }
        },
        'option-selected': {
            description: 'Sent when the user picks an item (Enter or click). `e.detail` is the whole item: `{ label, value }`.',
            action: 'option-selected',
            table: { category: 'Dropdown events' }
        },
        'scroll-end': {
            description: 'Sent when the list is scrolled to the bottom. Use it to load more items.',
            action: 'scroll-end',
            table: { category: 'Dropdown events' }
        },
        keyboard: {
            name: 'Keyboard',
            description: '`↓` / `↑` move the highlight, `Enter` picks the item, `Escape` closes the list. Leaving the field also closes it.',
            control: false,
            table: { category: 'Dropdown' }
        }
    },

    parameters: {
      docs: {
        source: {
          transform: (_originalCode: string, storyContext: any) => {
            const { args } = storyContext;
            return `
            <onyks-textfield size="${args.size}" placeholder="${args.placeholder}" type="${args.type}" label="${args.label}" value="${args.value}" ${args.disabled ? 'disabled' : ''} ${args.error ? 'error' : ''}>
            </onyks-textfield>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Textfield_Properties: Story = {
    args: {
        size: 'm',
        placeholder: 'Enter text',
        type: 'text',
        label: 'Textfield Label',
        value: 'Example text',
        disabled: false,
        error: false
    }
};

const countries = [
    { label: 'Polska', value: 'PL' },
    { label: 'Niemcy', value: 'DE' },
    { label: 'Czechy', value: 'CZ' },
    { label: 'Słowacja', value: 'SK' },
    { label: 'Litwa', value: 'LT' },
    { label: 'Ukraina', value: 'UA' },
    { label: 'Francja', value: 'FR' },
    { label: 'Hiszpania', value: 'ES' },
    { label: 'Włochy', value: 'IT' },
    { label: 'Portugalia', value: 'PT' },
    { label: 'Austria', value: 'AT' },
    { label: 'Szwecja', value: 'SE' }
];

export const Dropdown: Story = {
    render: (args) => html`
        <div style="min-height: 320px;">
            <onyks-textfield
                dropdown
                size=${args.size}
                placeholder=${args.placeholder}
                label=${args.label}
                .options=${countries}
                @input=${(e: Event) => {
                    const field = e.currentTarget as any;
                    const text = field.value.toLowerCase();
                    field.options = countries.filter(c => c.label.toLowerCase().includes(text));
                }}
                @option-selected=${args['option-selected']}
            ></onyks-textfield>
        </div>
    `,
    args: {
        size: 'm',
        placeholder: 'Choose a country',
        label: 'Country'
    },
    parameters: {
        docs: {
            description: {
                story: 'Click the field or start typing. Typing filters the list (the filtering is done in your code, on the `input` event). Use `↓` / `↑` and `Enter`, or click an item.'
            },
            source: {
                transform: () => `
<onyks-textfield id="country" dropdown placeholder="Choose a country"></onyks-textfield>

<script>
    const field = document.getElementById('country');
    const countries = [
        { label: 'Polska', value: 'PL' },
        { label: 'Niemcy', value: 'DE' },
    ];

    field.options = countries;

    // Filter while typing
    field.addEventListener('input', () => {
        const text = field.value.toLowerCase();
        field.options = countries.filter(c => c.label.toLowerCase().includes(text));
    });

    // Picked item
    field.addEventListener('option-selected', (e) => {
        console.log(e.detail.label, e.detail.value);   // 'Polska', 'PL'
    });
</script>
`
            }
        }
    }
};

const allItems = Array.from({ length: 200 }, (_, i) => ({ label: `Item ${i + 1}`, value: i + 1 }));
const PAGE_SIZE = 20;

export const Dropdown_Infinite_Scroll: Story = {
    render: (args) => html`
        <div style="min-height: 320px;">
            <onyks-textfield
                dropdown
                size=${args.size}
                placeholder=${args.placeholder}
                label=${args.label}
                .options=${allItems.slice(0, PAGE_SIZE)}
                @scroll-end=${(e: Event) => {
                    args['scroll-end']?.(e);
                    const field = e.currentTarget as any;
                    const next = allItems.slice(field.options.length, field.options.length + PAGE_SIZE);
                    if (next.length) field.options = [...field.options, ...next];
                }}
                @option-selected=${args['option-selected']}
            ></onyks-textfield>
        </div>
    `,
    args: {
        size: 'm',
        placeholder: 'Scroll the list',
        label: 'Item'
    },
    parameters: {
        docs: {
            description: {
                story: 'The list starts with 20 items. When you scroll to the bottom, `scroll-end` is sent and the next 20 items are added (here from a local list, in real use from an API).'
            },
            source: {
                transform: () => `
const field = document.getElementById('items');
field.options = await loadPage(0);      // first page from the API

field.addEventListener('scroll-end', async () => {
    const more = await loadPage(field.options.length);
    field.options = [...field.options, ...more];   // add, don't replace
});
`
            }
        }
    }
};