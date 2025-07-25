// src/ai/dev.ts

// Carrega as variáveis de ambiente do arquivo .env.
// Isso é crucial para que o Genkit possa acessar as chaves de API 
// e outras configurações necessárias durante o desenvolvimento.
import { config } from 'dotenv';
config();

// Importa os fluxos de IA da aplicação.
// Ao importar os fluxos aqui, eles se tornam visíveis para a UI de desenvolvimento do Genkit,
// o que permite testá-los e depurá-los de forma interativa.
import '@/ai/flows/financial-question-answering.ts';
import '@/ai/flows/generate-saving-suggestions.ts';
