<script setup>
  import Content from '../components/Content.vue';
  import PageTitle from '../components/PageTitle.vue';
  import Text from '../components/Text.vue';
</script>


<template>
  <Content>
    <PageTitle>ONYKS Web UI System</PageTitle>
    <Text>A lightweight, fast, and modern UI component library built with Web Components and Lit.</Text>
    <Text>ONYKS Web UI System provides a set of reusable, accessible, and highly performant interface elements. By leveraging the native Web Components standard, these elements work in any framework (React, Vue, Angular, Svelte) or with no framework at all.</Text>
    <h2>✨ Features</h2>
    <Text>⚡ Blazing Fast: Built on top of lit-html for efficient rendering and minimal bundle size.</Text>
    <Text>🌐 Framework Agnostic: Drop these components into any application. They are just HTML tags.</Text>
    <Text>🎨 Fully Customizable: Native support for CSS Custom Properties (Variables) and Shadow DOM styling.</Text>
    <Text>♿ Accessible: Components follow WAI-ARIA standards out of the box.</Text>
    <Text>📘 TypeScript: Written in TypeScript with complete type definitions included.</Text>
    <h2>📦 Installation</h2>
    <Text>Install the library via npm or yarn:</Text>
    <onyks-code-block language="bash" file="LICENSE" title="" size="m" id="license" style="width: 100%;">
    npm install https://github.com/knonyks/onyks-web-ui-system
    # or
    yarn add https://github.com/knonyks/onyks-web-ui-system
    </onyks-code-block>
    <Text>The documentation with examples may be run by using vite:</Text>
    
    <onyks-code-block language="bash" file="LICENSE" title="" size="m" id="license" style="width: 100%;">
    npm run dev
    </onyks-code-block>
  </Content>
</template> 