# Desvende a Lei

Jogo de estudos para concursos no estilo "descubra a palavra": o texto da lei aparece com um termo oculto e você descobre esse termo letra por letra, com 6 vidas.

## Como jogar

Abra `index.html` no navegador. Não precisa instalar nada.

- Escolha a matéria e o assunto nos botões do topo.
- Chute letras clicando no teclado da tela ou digitando. Acentos e ç contam como a letra simples.
- "Revelar letra" abre uma letra, mas custa 1 vida.
- Ao final de cada rodada aparecem o dispositivo completo e uma dica de prova.
- Cada acerto vale 10 pontos mais as vidas que sobraram. O recorde fica salvo no navegador.

## Conteúdo atual

**Direito Constitucional (CF/88)**

- Princípios Fundamentais: Arts. 1º a 4º
- Direitos e Garantias Fundamentais: Art. 5º (incisos selecionados)

## Como adicionar temas

Todo o conteúdo fica em `temas.js`. Cada termo é um objeto assim:

```js
{
  ref: "Art. 2º",
  texto: "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.",
  resposta: "harmônicos",
  nota: "A separação dos Poderes é cláusula pétrea (art. 60, § 4º, III)."
}
```

A `resposta` precisa aparecer exatamente dentro do `texto`, porque é ali que o jogo coloca a lacuna. Para criar uma nova matéria (Administrativo, Penal etc.), adicione mais um objeto ao array `TEMAS` com seus assuntos.
