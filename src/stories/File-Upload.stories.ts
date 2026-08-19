import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/file-upload';

const meta: Meta = {
    title: 'ONYKS WebUI/File Upload',
    component: 'onyks-file-upload',
    tags: ['autodocs'],
    
    render: (args) => html`
      <onyks-file-upload 
        size=${args.size} 
        ?multiple=${args.multiple} 
        ?disabled=${args.disabled} 
        accept=${args.accept}
      ></onyks-file-upload>
    `,

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
      disabled: {
        control: { type: 'boolean' },
        table: { category: 'parameters' }
      },
      accept: {
        control: { type: 'text' },
        description: 'Np. "image/*" lub ".pdf, .doc"',
        table: { category: 'parameters' }
      },
    },
    parameters: {
      docs: {
        source: {
          transform: (_originalCode: string, storyContext: any) => {
            const { args } = storyContext;
            const multipleAttr = args.multiple ? ' multiple' : '';
            const disabledAttr = args.disabled ? ' disabled' : '';
            const acceptAttr = args.accept ? ` accept="${args.accept}"` : '';
            return `<onyks-file-upload size="${args.size}"${multipleAttr}${disabledAttr}${acceptAttr}></onyks-file-upload>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    size: 'm',
    multiple: false,
    disabled: false,
    accept: ''
  }
};

export const MultipleFiles: Story = {
  args: {
    ...Default.args,
    multiple: true,
  }
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  }
};

export const ImagesOnly: Story = {
  args: {
    ...Default.args,
    accept: 'image/*',
  }
};

export const JSInteraction: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <onyks-file-upload id="demo-uploader" size=${args.size}></onyks-file-upload>
      
      <button 
        style="padding: 8px 16px; cursor: pointer; background: var(--onyks-accent); color: var(--onyks-on-accent); border: none; border-radius: var(--onyks-radius-sm);"
        @click=${() => {
          const uploader = document.getElementById('demo-uploader') as any;
          const file = uploader.files ? uploader.files[0] : null;
          
          if (file) {
            alert(`Sukces! Pobrany plik to: ${file.name} (${file.size} bytes)`);
          } else {
            alert('Najpierw wrzuć jakiś plik!');
          }
        }}
      >
        Sprawdź plik w JS
      </button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Ten przykład pokazuje, że komponent zachowuje się jak natywny input. Programista może pobrać element po ID i odwołać się bezpośrednio do właściwości `.files[0]`.',
      },
      source: {
        transform: () => `
            <!-- HTML -->
            <onyks-file-upload id="my-uploader"></onyks-file-upload>
            <button id="check-btn">Sprawdź plik</button>

            <!-- JavaScript -->
            <script>
            const btn = document.getElementById('check-btn');
            const uploader = document.getElementById('my-uploader');
            
            btn.addEventListener('click', () => {
                // Dostęp do pliku dokładnie tak jak w zwykłym <input type="file">
                const file = uploader.files[0];
                
                if (file) {
                console.log("Wybrany plik:", file.name);
                }
            });
            </script>`
      }
    }
  }
};