# Bozó de Mesa — contexto para o Claude

Jogo de dados de bar (bozó) feito em HTML/CSS/JS puro, empacotado como app Android com Capacitor.
O dono do projeto fala português; responda em português, de forma simples (ele não é programador).

## Onde está cada coisa

| O quê | Onde |
|---|---|
| **O jogo inteiro (único arquivo que se edita)** | `app/www/index.html` |
| Fontes locais (funciona sem internet) | `app/www/fonts/` |
| Projeto Android (Capacitor 8, API 36) | `app/android/` — a cópia do jogo dentro dele é gerada, não editar |
| Plugin nativo de compartilhar (imagem/texto direto no WhatsApp) | `app/android/app/src/main/java/com/felipetoschi/bozodemesa/CompartilharPlugin.java` |
| Botão voltar, tela sempre acesa | `.../MainActivity.java` (chama `window.bozoVoltar()` do jogo) |
| Ícone e abertura (fontes das imagens) | `app/assets/` → `npm run icons` dentro de `app/` |
| Compilação automática | `.github/workflows/android.yml` (APK de teste sempre; AAB assinado se existirem os segredos `KEYSTORE_BASE64` e `KEYSTORE_PASSWORD`) |
| Material da Play Store, textos, política de privacidade | `loja/` |
| Passo a passo de publicação | `PUBLICAR.md` |

O app não carrega o `@capacitor/core` no JS: para falar com o Android use `window.Capacitor.nativePromise('Plugin','metodo',{...})`; `inApp` diz se está no app.

## Regras do jogo já confirmadas pelo dono (não mudar sem perguntar)

- Até 3 lançamentos; guardar dados; marcar exige tocar na casa **e** apertar Marcar.
- **Pedir baixo**: só a partir do 2º lançamento, vale para o próximo lançamento; os dados que caem valem a face de baixo (7 − valor); dados guardados não viram; dá para cancelar antes de lançar.
- De boca (1º lançamento): Full 15, Seguida 25, Quadrada 35; normal: 10/20/30; General 40; **General de boca encerra e vence na hora**. General também vale como Quadrada.
- **Casa anulada**: quando **todos** marcam a mesma casa com os **mesmos pontos** (ex.: todos Quadrada 30), ela é riscada e não soma. Pontos diferentes (35 de boca × 30) **não** anulam; risco (0) nunca anula.
- **Modo jogo: sem desfazer** — errou a marcação, é erro do jogador. **Modo marcador: pode corrigir/apagar.**
- Ao sair Full/Seguida/Quadrada/General: brilho discreto + chance exata daquele lançamento.

## Funcionalidades prontas

- Jogo no app (2–4 jogadores, pessoas e/ou computador) e **Só marcador** (2–8 jogadores, dados de verdade): ranking ao vivo, Finalizar partida a qualquer momento, Zerar partida.
- Layout: tablet = mesa com cartelas em volta (≤4 jogadores); celular ou marcador com >4 = modo compacto (ranking/nomes escolhem a cartela). Tudo testado de 320×568 até 1280×800.
- Resumo no fim da partida; placar de vitórias e histórico mantidos **com os mesmos jogadores até "Zerar placar"/"Zerar tudo"**.
- Salva tudo: reabrir volta na partida, no resumo ou na tela inicial.
- Exportar: imagem do resultado (WhatsApp direto no app), texto, planilha .csv (navegador). Lembrete de exportar antes de zerar.
- Cartela minimalista "papel e caneta" (linhas riscadas à mão, letra Caveat).

## O que falta para fechar a versão 1.0

1. **APK assinado**: o dono vai criar os segredos `KEYSTORE_BASE64` e `KEYSTORE_PASSWORD` no GitHub (instruções no arquivo `LEIA-CHAVE.txt`, que ele guarda — a chave **nunca** vai para o repositório). Depois disso, ajustar o workflow para gerar também um **APK de release assinado** (hoje só o AAB é assinado), para atualizações instalarem por cima sem perder o placar.
2. **Decidir a distribuição**: só entre amigos (link + APK) ou também Play Store (ver `PUBLICAR.md`). Recomendação já dada: publicar grátis e sem anúncios primeiro; anúncio intersticial no fim da partida só numa atualização futura.
3. Opcional: repositório próprio e público `bozo-de-mesa` (serviria de link do jogo via GitHub Pages e de endereço da política de privacidade); número da versão visível no app; capturas da loja atualizadas.

## Como trabalhar neste projeto

- Teste no navegador com Playwright (Chromium em `/opt/pw-browsers/chromium`): várias telas (celular e tablet, em pé e deitado), 2–8 jogadores, modo jogo e marcador; conferir que nada se sobrepõe nem rola.
- Depois de enviar, conferir a compilação em Actions (o APK sai em Artifacts).
- Versão "arquivo único" para mandar a amigos: gerar a partir de `app/www/index.html` embutindo as fontes em base64 (não fica no repositório).
- Sempre explicar ao dono o que mudou em linguagem simples.
