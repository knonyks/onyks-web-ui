import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Select',
    component: 'onyks-select',
    tags: ['autodocs'],
    argTypes: 
    {
        size: 
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: 
            {
                category: 'parameters'
            }
        },
        multiple:
        {
            control: { type: 'boolean' },
            table: 
            {
                category: 'parameters'
            }
        },
        value: 
        {
            control: { type: 'text' },
            table: 
            {
                category: 'parameters'
            }
        },
        'getSelectedItems()': 
        {
            action: 'getSelectedItems()',
            description: 'Returns a list of selected options',
            table: 
            {
                category: 'functions',
                type: { summary: 'string[]' },
                
            }
        }
    },
    render: (args) => html`
    <onyks-select multiple=${args.multiple} size=${args.size} id="select">
        <onyks-select-option marked value="${args.value}">${args.value}</onyks-select-option>
        <onyks-select-option marked value="milk">Milk</onyks-select-option>
        <onyks-select-option marked value="aubergine">Aubergine</onyks-select-option>
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
    <onyks-button @click=${(e) => {console.log(document.querySelector("#select").getSelectedItems())}} style="margin-top: var(--spacing-md)">Get Selected Items!</onyks-button>
    `,
    parameters:
    {
        docs:
        {
            source:
            {
                transform: (_originalCode: string, storyContext: any) => 
                {
                    const { args } = storyContext;
                    return `
                    <script>
                        const select = document.querySelector('onyks-select')
                        const btn = document.querySelector('onyks-button')
                        btn.addEventListener('click;, (e) => {console.log(select.getSelectedItems())})
                    </script>

                    <onyks-select ${args.multiple? 'multiple':''} size="${args.size}" id="select">
                        <onyks-select-option marked value="${args.value}">${args.value}</onyks-select-option>
                        <onyks-select-option marked value="milk">Milk</onyks-select-option>
                        <onyks-select-option marked value="aubergine">Aubergine</onyks-select-option>
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

export const Base: Story = 
{
    args: 
    {
        multiple: true,
        size: 'm',
        value: "Value"
    }
};