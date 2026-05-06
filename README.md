# Canal de Denúncias Tecnova

Sistema de Canal de Denúncias para o Tecnova Santa Catarina, em conformidade com a **Lei 14.457/22** (Programa Emprega + Mulheres) e **NR1** (Gestão de Segurança e Saúde no Trabalho).

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Criar banco de dados
npm run db:push

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## 📋 Funcionalidades

### Para Denunciantes
- **Denúncia Anônima**: Sem rastreamento de IP ou identificação
- **Denúncia Identificada**: Opção de se identificar para acompanhamento
- **Protocolo de Acompanhamento**: Código SHA-256 para consultar status
- **Comunicação Segura**: Troca de mensagens com o Comitê de Ética
- **Upload de Evidências**: Anexar documentos, imagens e áudios

### Para o Comitê de Ética
- **Dashboard**: Visão geral de todas as denúncias
- **Filtros por Status**: Nova, Em Análise, Procedente, Improcedente, Arquivada
- **Priorização Automática**: Por tipo de denúncia
- **Sistema de Mensagens**: Comunicação com denunciantes
- **Log de Auditoria**: Todas as ações são registradas

## 🔒 Segurança e Compliance

- **Lei 14.457/22**: Prevenção e combate ao assédio sexual e moral
- **NR1**: Gerenciamento de riscos psicossociais
- **LGPD**: Proteção de dados pessoais
- **Criptografia**: Protocolo SHA-256 para identificação
- **Acessibilidade**: WCAG 2.1 (skip links, contraste, navegação por teclado)

## 📂 Estrutura do Projeto

```
canal-denuncias-hsc/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── nova-denuncia/        # Formulário de denúncia
│   │   ├── acompanhar/           # Consulta por protocolo
│   │   ├── comite/               # Painel do Comitê de Ética
│   │   └── api/
│   │       └── complaints/       # APIs de denúncias
│   ├── components/
│   └── lib/
│       ├── prisma.ts             # Cliente Prisma
│       └── crypto.ts             # Geração de protocolo
├── prisma/
│   └── schema.prisma             # Modelo de dados
└── package.json
```

## 🗄️ Modelo de Dados

- **Complaint**: Denúncias (tipo, local, descrição, status)
- **ComplaintAttachment**: Anexos/evidências
- **ComplaintMessage**: Comunicação denunciante ↔ comitê
- **CommitteeMember**: Membros do comitê de ética
- **AuditLog**: Log de todas as ações

## 📱 Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page de conscientização |
| `/nova-denuncia?tipo=anonimo` | Formulário de denúncia anônima |
| `/nova-denuncia?tipo=identificado` | Formulário de denúncia identificada |
| `/acompanhar` | Consulta de denúncia por protocolo |
| `/comite` | Painel administrativo do Comitê |

## 🛠️ Tecnologias

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **Prisma 6** - ORM para banco de dados
- **SQLite** - Banco de dados local
- **Lucide React** - Ícones

## 📞 Suporte

Desenvolvido por **DM Consultoria em TI Ltda**

---

© 2024 Tecnova Santa Catarina. Todos os direitos reservados.
