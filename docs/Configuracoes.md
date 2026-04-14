## Configurações iniciais

- Exclua o arquivo App.css, a pasta assets.
- Faça as alterações necessárias para fazer o Tailwind funcionar como neste [exemplo](INICIAR_PROJETO.md).

Adicione este bloco no início do projeto (por exemplo, no seu arquivo global de estilos, como `src/index.css`):

```css
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');
@import 'tailwindcss';

:root {
  --background: #ffffff;
  --text: #000000;
  --primary: #e60076;
  --bg-primary: #fce7f3;
  --secondary: #6a7282;
  --bg-secondary: #f3f4f6;
  --border-card: #e7e7e7;
  --bg-card: #fcfcfc;
  --font-sans: 'Figtree', sans-serif;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--text);
  font-family: var(--font-sans);
}

.font-figtree {
  font-family: var(--font-sans);
}

.text-primary {
  color: var(--primary);
}

.text-secondary {
  color: var(--secondary);
}

.bg-primary {
  background-color: var(--bg-primary);
}

.bg-secondary {
  background-color: var(--bg-secondary);
}

.bg-card {
  background-color: var(--bg-card);
}

.border-card {
  border-color: var(--border-card);
}
```


## Estrutura completa de pastas e arquivos (src)

```text
src/
  App.tsx
  index.css
  main.tsx

  components/
      About.tsx
      CardRepository.tsx
      Contribuitions.tsx
      Footer.tsx
      Header.tsx
      InteressPill.tsx
      ProfileInformations.tsx
      ProfileSection.tsx
      SocialIcons.tsx
      TechPill.tsx
      
  services/
      api.ts
```