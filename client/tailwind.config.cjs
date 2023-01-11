/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./client/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {},
    },
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("@tailwindcss/forms")({
            strategy: 'class', // only generate classes
        }),
    ],
};
