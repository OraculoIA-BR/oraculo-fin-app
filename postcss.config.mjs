// postcss.config.mjs

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Plugin do Tailwind CSS para transformar as classes do Tailwind em CSS.
    tailwindcss: {},
    // Plugin para adicionar prefixos de fornecedores ao CSS, garantindo
    // a compatibilidade com diferentes navegadores.
    autoprefixer: {},
  },
};

export default config;
