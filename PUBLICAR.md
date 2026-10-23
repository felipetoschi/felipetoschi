# Como publicar o Bozó de Mesa na Play Store

Tudo o que dá para preparar já está pronto neste repositório:

| O quê | Onde |
|---|---|
| Jogo (funciona sem internet) | `app/www/` |
| Projeto Android | `app/android/` |
| Compilação automática no GitHub | `.github/workflows/android.yml` |
| Ícone 512×512, imagem de destaque 1024×500 e capturas de tela | `loja/` |
| Textos da loja | `loja/textos-da-loja.md` |
| Política de privacidade | `loja/politica-de-privacidade.md` |

A chave de assinatura **não** está no repositório. Ela foi entregue separada (arquivos `bozo-upload.jks` e `LEIA-CHAVE.txt`). Guarde em lugar seguro.

---

## Passo 1 — Testar no seu celular

1. No GitHub, abra a aba **Actions** do repositório e clique na compilação mais recente de **App Android** (com ✅ verde).
2. Lá embaixo, em **Artifacts**, baixe `bozo-de-mesa-teste-N`. Vem um `.zip` com o arquivo `app-debug.apk`.
3. Passe o `.apk` para o celular Android e abra. O Android vai pedir para permitir "instalar apps desconhecidos": permita só para isso.

## Passo 2 — Colocar a chave no GitHub (só uma vez)

No repositório: **Settings → Secrets and variables → Actions → New repository secret**. Crie dois segredos:

| Nome | Valor |
|---|---|
| `KEYSTORE_BASE64` | todo o conteúdo do arquivo `bozo-upload.jks.base64.txt` |
| `KEYSTORE_PASSWORD` | a senha que está no `LEIA-CHAVE.txt` |

Depois, em **Actions**, abra a última compilação de **App Android** e clique em **Re-run all jobs**. Agora ela gera também o artefato `bozo-de-mesa-play-store-N`, com o arquivo **`.aab`** que vai para a Play Store.

## Passo 3 — Criar a conta no Google Play Console

1. Acesse play.google.com/console e crie uma conta de desenvolvedor **pessoal**. A taxa é de US$ 25, paga uma única vez.
2. O Google pede para verificar sua identidade (documento) e um celular. Pode levar alguns dias.

## Passo 4 — Publicar a política de privacidade

A Play Store pede um **link** para a política de privacidade. O jeito mais simples:

1. Entre em gist.github.com.
2. Cole o texto de `loja/politica-de-privacidade.md`, colocando seu e-mail de contato no final. Dê o nome `politica-de-privacidade.md`.
3. Clique em **Create public gist** e use o link gerado.

(Também serve uma página no Google Sites.)

## Passo 5 — Criar o app no Play Console

1. **Criar app**: nome "Bozó de Mesa", idioma português (Brasil), tipo **Jogo**, **Gratuito**.
2. **Página principal da loja**: cole os textos de `loja/textos-da-loja.md` e envie:
   - ícone: `loja/icone-512.png`;
   - recurso gráfico: `loja/destaque-1024x500.png`;
   - capturas de celular: `loja/capturas/celular-*.png`;
   - capturas de tablet de 7": `loja/capturas/tablet-7-1.png`;
   - capturas de tablet de 10": `loja/capturas/tablet-10-*.png`.
3. **Conteúdo do app** (menu "Política"), com estas respostas:
   - Política de privacidade: o link do passo 4.
   - Anúncios: **não** tem anúncios.
   - Acesso ao app: todo o app funciona sem login.
   - Classificação do conteúdo: categoria **Jogos**. Responda **não** para violência, linguagem, drogas etc. Em **jogos de azar**, responda que **não** há apostas, dinheiro real nem prêmios: é só um jogo de dados com pontos.
   - Público-alvo: **13 anos ou mais**. Marcar idades menores coloca o app nas regras de apps para crianças, que exigem mais coisas.
   - Segurança dos dados: o app **não coleta nem compartilha** dados.
   - App governamental, financeiro, de saúde etc.: **não**.

## Passo 6 — Teste fechado (obrigatório para contas pessoais novas)

Contas pessoais novas precisam de um teste fechado com **pelo menos 12 testadores** durante **14 dias seguidos** antes de poder publicar para todo mundo.

1. Em **Testar e lançar → Testes → Teste fechado**, crie uma faixa e envie o `.aab` do passo 2.
2. Adicione os e-mails (conta Google) de 12 ou mais pessoas: família, amigos, quem joga com você.
3. Mande o link de participação para eles. Cada um precisa aceitar e instalar o app pela Play Store.
4. Depois de 14 dias, peça o **acesso à produção** no painel do Play Console.

## Passo 7 — Produção

Em **Produção → Criar nova versão**, envie o `.aab` mais recente e mande para revisão. A revisão costuma levar de alguns dias a uma semana.

---

## Para lançar uma atualização

1. Altere o jogo em `app/www/index.html` e envie para o GitHub.
2. A compilação roda sozinha e gera um novo `.aab` com o número de versão maior.
3. No Play Console, crie uma nova versão e envie esse `.aab`.

> As regras da Play Store mudam com frequência (teste com 12 pessoas, versão mínima do Android etc.). Se algo no Play Console estiver diferente do que está escrito aqui, siga o que o Play Console pedir.
