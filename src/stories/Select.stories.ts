import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Select',
    component: 'onyks-select',
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'parameters' }
        },
        multiple: {
            control: { type: 'boolean' },
            table: { category: 'parameters' }
        },
        select: {
            control: { type: 'boolean' },
            description: 'Determines whether elements can be selected (true) or if it acts as a read-only list (false).',
            table: { category: 'parameters' }
        },
        value: {
            control: { type: 'text' },
            table: { category: 'parameters' }
        },
        scrollThreshold: {
            control: { type: 'number' },
            description: 'Distance to the bottom (in px), at which the @scroll-end event is triggered.',
            table: { category: 'parameters' }
        },
        'getSelectedItems()': {
            action: 'getSelectedItems()',
            description: 'Returns a list of selected options',
            table: {
                category: 'functions',
                type: { summary: 'string[]' },
            }
        },
        change: {
            description: 'Event emitted when an option is clicked. The detail object contains: value, selected status, and the option element.',
            action: 'change',
            table: { category: 'events' }
        },
        'scroll-end': {
            description: 'Event emitted when scrolling reaches the bottom of the select list (depends on scrollThreshold).',
            action: 'scroll-end',
            table: { category: 'events' }
        }
    },
    render: (args) => html`
        <onyks-select 
            ?multiple=${args.multiple} 
            select=${args.select}
            size=${args.size} 
            scrollThreshold=${args.scrollThreshold} 
            id="select" 
            @change=${args.change}
            @scroll-end=${args['scroll-end']} 
        >
            <onyks-select-option selected value="${args.value}">${args.value}</onyks-select-option>
            <onyks-select-option selected value="milk">Milk</onyks-select-option>
            <onyks-select-option selected value="aubergine">Aubergine</onyks-select-option>
            <onyks-select-option value="garlic">Garlic</onyks-select-option>
            <onyks-select-option value="watermelon">Watermelon</onyks-select-option>
            <onyks-select-option value="pepper">Pepper</onyks-select-option>
            <onyks-select-option value="carrot">Carrot</onyks-select-option>
            <onyks-select-option value="cabbage">Cabbage</onyks-select-option>
            <onyks-select-option value="water">Water</onyks-select-option>
            <onyks-select-option value="tea">Tea</onyks-select-option>
            <onyks-select-option value="coffee">Coffee</onyks-select-option>
            <onyks-select-option value="biscuits">Biscuits</onyks-select-option>
            <onyks-select-option value="chips">Chips</onyks-select-option>
            <onyks-select-option value="pizza">Pizza</onyks-select-option>
            <onyks-select-option value="oil">Oil</onyks-select-option>
            <onyks-select-option value="vinegar">Vinegar</onyks-select-option>
        </onyks-select>
        <onyks-button @click=${() => {console.log((document.querySelector("#select") as any)?.getSelectedItems())}} style="margin-top: var(--onyks-spacing-md)">Get Selected Items!</onyks-button>
    `,
    parameters: {
        docs: {
            source: {
                transform: (_originalCode: string, storyContext: any) => {
                    const { args } = storyContext;
                    return `
                        <script>
                            const select = document.querySelector('onyks-select');
                            const btn = document.querySelector('onyks-button');

                            btn.addEventListener('click', (e) => {
                                console.log(select.getSelectedItems());
                            });

                            select.addEventListener('change', (e) => {
                                console.log('Option changed:', e.detail);
                            });

                            select.addEventListener('scroll-end', (e) => {
                                console.log('Scroll end reached!');
                            });
                        </script>

                        <onyks-select ${args.multiple ? 'multiple' : ''} ${args.select === false ? 'select="false"' : ''} size="${args.size}" scrollThreshold="${args.scrollThreshold}" id="select">
                            <onyks-select-option selected value="${args.value}">${args.value}</onyks-select-option>
                            <onyks-select-option selected value="milk">Milk</onyks-select-option>
                            <onyks-select-option selected value="aubergine">Aubergine</onyks-select-option>
                            <onyks-select-option value="garlic">Garlic</onyks-select-option>
                            <onyks-select-option value="watermelon">Watermelon</onyks-select-option>
                            <onyks-select-option value="pepper">Pepper</onyks-select-option>
                            <onyks-select-option value="carrot">Carrot</onyks-select-option>
                            <onyks-select-option value="cabbage">Cabbage</onyks-select-option>
                            <onyks-select-option value="water">Water</onyks-select-option>
                            <onyks-select-option value="tea">Tea</onyks-select-option>
                            <onyks-select-option value="coffee">Coffee</onyks-select-option>
                            <onyks-select-option value="biscuits">Biscuits</onyks-select-option>
                            <onyks-select-option value="chips">Chips</onyks-select-option>
                            <onyks-select-option value="pizza">Pizza</onyks-select-option>
                            <onyks-select-option value="oil">Oil</onyks-select-option>
                            <onyks-select-option value="vinegar">Vinegar</onyks-select-option>
                        </onyks-select>
                        `;
                }
            },
        }
    }
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
    args: {
        multiple: true,
        select: true,
        size: 'm',
        value: "Value",
        scrollThreshold: 10
    }
};

export const ReadOnly: Story = {
    args: {
        ...Base.args,
        select: false
    },
    parameters: {
        docs: {
            description: {
                story: 'When `select` is set to `false`, the component acts as a read-only list. Options cannot be clicked or toggled.'
            }
        }
    }
};