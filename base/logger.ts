// Ofusca valores individuales mostrando solo los primeros 4 caracteres
function mask(val?: string): string {
    if (!val) return 'undefined';
    if (val.length <= 4) return val;
    return `${val.slice(0, 4)}*****`;
}

import winston from 'winston';

// Función para ofuscar datos sensibles (ejemplo: oculta números de 6+ dígitos)
function maskSensitive(text: string): string {
    // Ofusca correos: pedropascal@gmail.com -> ped*****al@gmail.com
    text = text.replace(/([a-zA-Z0-9._%+-]{3})[a-zA-Z0-9._%+-]+([a-zA-Z0-9._%+-]{2})@([a-zA-Z0-9.-]+\.[a-z]{2,})/g, '$1*****$2@$3');

    // Ofusca DNI y CE: DNI 85787676 -> 857*****
    text = text.replace(/\b(?:DNI|CE)\s*(\d{3})(\d{3,})\b/g, (match, p1, p2) => `${p1}*****`);

    // Ofusca cualquier secuencia de 6+ dígitos (tarjetas, etc.), mostrando solo los primeros 5 dígitos
    text = text.replace(/(\d{5})\d{1,}/g, '$1*****');

    return text;
}

export const logger = Object.assign(
    winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ level, message, timestamp }) => {
                return `${timestamp} [${level}]: ${maskSensitive(String(message))}`;
            })
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logs/test.log' })
        ]
    }),
    { mask }
);
