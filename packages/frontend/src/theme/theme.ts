export const theme = {
    colors: {
        background: 'hsl(0,60%,100%)',
        grey: 'hsl(0, 0%, 55%)',
        main: 'hsl(175,70%,55%)',
        red: 'hsl(0, 70%, 55%)',
        orange: 'hsl(25,70%,55%)',
        yellow: 'hsl(60, 70%, 55%)',
        green: 'hsl(110, 70%, 55%)',
        purple: 'hsl(280,70%,55%)',
        pink: 'hsl(305,70%,55%)',
        black: 'hsl(0, 0%, 5%)',
    },
    fonts: {
        families: {
            main: '\'Poppins\', serif',
        },
        colors: {
            primaryLight: 'hsl(0,0%,95%)',
            secondaryLight: 'hsl(0,0%,80%)',
            primaryDark: 'hsl(0,0%,5%)',
            secondaryDark: 'hsl(0,0%,50%)',
        },
        sizes: {
            h1: '6.2rem',
            h2: '3.8rem',
            h3: '2.4rem',
            h4: '1.8rem',
            normal: '1.4rem',
            caption: '1rem',
        },
    },
};

export type Theme = typeof theme;
