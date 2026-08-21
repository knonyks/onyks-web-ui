import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

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
        message=${args.message}
        @change=${args.change}
        @cancel=${args.cancel}
      ></onyks-file-upload>
    `,

    argTypes: {
      size: {
        control: { type: 'select' },
        options: ['s', 'm', 'l', 'xl'],
        table: { category: 'Properties' }
      },
      multiple: {
        control: { type: 'boolean' },
        table: { category: 'Properties' }
      },
      disabled: {
        control: { type: 'boolean' },
        table: { category: 'Properties' }
      },
      accept: {
        control: { type: 'text' },
        description: 'e.g., "image/*" or ".pdf, .doc"',
        table: { category: 'Properties' }
      },
      message: {
        control: { type: 'text' },
        description: 'Default text displayed inside the drop zone.',
        table: { category: 'Properties' }
      },
      change: {
        description: 'Emitted when a file is selected or dropped.',
        action: 'change',
        table: { category: 'Events' }
      },
      cancel: {
        description: 'Emitted when the file selection dialog is opened but closed without selecting any file.',
        action: 'cancel',
        table: { category: 'Events' }
      },
      'reset()': {
        description: 'Clears the selected files and resets the display text to the default message.',
        control: false,
        table: { category: 'Functions (JS)' }
      },
      'get files': {
        description: 'Returns the `FileList` object containing the selected files, exactly like a native `<input type="file">`.',
        control: false,
        table: { category: 'Functions (JS)' }
      }
    },
    parameters: {
      docs: {
        source: {
          transform: (_originalCode: string, storyContext: any) => {
            const { args } = storyContext;
            const multipleAttr = args.multiple ? ' multiple' : '';
            const disabledAttr = args.disabled ? ' disabled' : '';
            const acceptAttr = args.accept ? ` accept="${args.accept}"` : '';
            const messageAttr = args.message && args.message !== 'Drag a file here or click' ? ` message="${args.message}"` : '';
            return `<onyks-file-upload size="${args.size}"${multipleAttr}${disabledAttr}${acceptAttr}${messageAttr}></onyks-file-upload>`;
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
    accept: '',
    message: 'Drag a file here or click'
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

export const CustomMessage: Story = {
  args: {
    ...Default.args,
    message: 'Upload your avatar (PNG, JPG)'
  }
};

export const JSInteraction: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <onyks-file-upload id="demo-uploader" size=${args.size} message=${args.message}></onyks-file-upload>
      
      <button 
        style="padding: 8px 16px; cursor: pointer; background: var(--onyks-accent, #0080ff); color: var(--onyks-on-accent, #fff); border: none; border-radius: var(--onyks-radius-sm, 4px);"
        @click=${() => {
          const uploader = document.getElementById('demo-uploader') as any;
          const file = uploader.files ? uploader.files[0] : null;
          
          if (file) {
            alert(`Success! Selected file: ${file.name} (${file.size} bytes)`);
          } else {
            alert('Please select a file first!');
          }
        }}
      >
        Check file in JS
      </button>
    </div>
    <script>
      // Skrypt symulujący nasłuchiwanie na eventy przez programistę
      setTimeout(() => {
        const uploader = document.getElementById('demo-uploader');
        if(uploader) {
            uploader.addEventListener('change', (e) => {
                console.log('Change event triggered! Current files:', e.target.files);
            });
            uploader.addEventListener('cancel', () => {
                console.log('Cancel event triggered! User closed the dialog without selecting a file.');
            });
        }
      }, 100);
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story: 'This example shows that the component behaves like a native input. A developer can get the element by ID and access the `.files[0]` property directly.',
      },
      source: {
        transform: () => `
          <!-- HTML -->
          <onyks-file-upload id="my-uploader"></onyks-file-upload>
          <button id="check-btn">Check file</button>

          <!-- JavaScript -->
          <script>
          const btn = document.getElementById('check-btn');
          const uploader = document.getElementById('my-uploader');

          // 1. Listening to events
          uploader.addEventListener('change', (e) => {
              console.log("File changed!", e.target.files);
          });

          uploader.addEventListener('cancel', () => {
              console.log("User cancelled file selection.");
          });

          // 2. Using the getter
          btn.addEventListener('click', () => {
              // Accessing the file exactly like in a standard <input type="file">
              const file = uploader.files[0];
              
              if (file) {
                  console.log("Selected file:", file.name);
              }
          });
          </script>`
      }
    }
  }
};

export const ResetFunction: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <onyks-file-upload 
        id="resettable-uploader" 
        size=${args.size}
        message=${args.message}
      ></onyks-file-upload>
      
      <button 
        style="padding: 8px 16px; cursor: pointer; background: var(--onyks-red, #ef4444); color: white; border: none; border-radius: var(--onyks-radius-sm, 4px);"
        @click=${() => {
          const uploader = document.getElementById('resettable-uploader') as any;
          if(uploader && typeof uploader.reset === 'function') {
              uploader.reset();
          }
        }}
      >
        Reset File Uploader
      </button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates the `reset()` method. Select a file, then click the button below to clear the input and restore the default message.',
      },
      source: {
        transform: () => `
          <!-- HTML -->
          <onyks-file-upload id="my-uploader"></onyks-file-upload>
          <button id="reset-btn">Reset</button>

          <!-- JavaScript -->
          <script>
            const btn = document.getElementById('reset-btn');
            const uploader = document.getElementById('my-uploader');
            
            btn.addEventListener('click', () => {
              uploader.reset(); // Clears files and resets text
            });
          </script>`
      }
    }
  }
};