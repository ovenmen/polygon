import React from 'react';
import './globals.css';

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body>{children}</body>
        </html>
    );
}
