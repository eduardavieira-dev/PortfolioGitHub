## Elementos antes e depois de torna-los dinamicos

```tsx

<div>
      <div className="flex flex-col md:flex-row gap-1 mx-auto max-w-md">
        <img src="profile.png" alt="" className="w-30 h-30 m-2 mx-auto md:mr-2 rounded-full" />
        <div className="flex flex-col gap-1 justify-center text-center md:text-left max-w-md">
          <h4 className="text-lg font-medium" id="name">
            Eduarda Vieira
          </h4>
          <span className="text-secondary text-xs" id="username">
            @eduardavieira-dev
          </span>
          <p className="text-xs text-secondary" id="description">
            Técnica em Desenvolvimento de Sistemas e Graduanda em Engenharia de Software na PUC
          </p>
        </div>
      </div>
      <div className="flex w-full gap-2 mx-auto max-w-md text-neutral-600 mt-4">
        <div className="border border-card text-center rounded-lg p-4 flex flex-col items-center w-full bg-card">
            <p id="repositories">20</p>
            <span className="text-sm">Repositórios</span>
        </div>
        <div className="border border-card text-center rounded-lg p-4 flex flex-col items-center w-full bg-card">
            <p id="followers">270</p>
            <span className="text-sm">Seguidores</span>
        </div>
        <div className="border border-card text-center rounded-lg p-4 flex flex-col items-center w-full bg-card">
            <p id="following">80</p>
            <span className="text-sm">Seguindo</span>
        </div>
      </div>
    </div>

```



```tsx
<div className="border border-card rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-center justify-between w-full mb-3">
        <h3 className="font-medium text-md">AEDS-2</h3>
        <a
          href='#'
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-pink-400 transition-colors"
        >
          <ArrowSquareOut size={17} />
        </a>
      </div>
      <p className="text-xs mb-3 line-clamp-2">Projeto de aeds-2</p>
      <div className="flex gap-1 mb-3">
          <span
            className="text-[10px] leading-none bg-primary text-primary rounded-xl px-2 py-1 justify-center"
          >
            Java
          </span>
      </div>
      <div className="flex-1"></div>
      <div className="text-secondary text-sm flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <Star size={12} className="text-secondary" />
          <span className="text-xs">2</span>
        </div>

        <div className="flex items-center gap-1">
          <GitFork size={12} className="text-secondary" />
          <span className="text-xs">1</span>
        </div>
      </div>
    </div>

```