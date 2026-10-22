// Banco de questões do jogo.
// Cada item tem:
//   ref      -> dispositivo da lei (aparece acima da pista)
//   texto    -> trecho literal da lei; a resposta precisa aparecer dentro dele
//   resposta -> termo que o jogador precisa descobrir (vira os quadradinhos)
//   nota     -> comentário de prova exibido ao fim da rodada
// Para criar um novo tema, basta adicionar um objeto ao array TEMAS.

const TEMAS = [
  {
    id: "constitucional",
    nome: "Direito Constitucional",
    fonte: "Constituição Federal de 1988",
    assuntos: [
      {
        id: "principios",
        nome: "Princípios Fundamentais",
        faixa: "Arts. 1º a 4º",
        itens: [
          {
            ref: "Art. 1º, caput",
            texto: "A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito.",
            resposta: "indissolúvel",
            nota: "A união indissolúvel veda o direito de secessão. A forma federativa de Estado é cláusula pétrea (art. 60, § 4º, I)."
          },
          {
            ref: "Art. 1º, caput",
            texto: "A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito.",
            resposta: "Estado Democrático de Direito",
            nota: "Repare que o caput não menciona os Territórios: eles integram a União (art. 18, § 2º), não são entes federativos."
          },
          {
            ref: "Art. 1º, I",
            texto: "A República Federativa do Brasil (...) tem como fundamentos: I – a soberania;",
            resposta: "soberania",
            nota: "Mnemônico dos fundamentos: SO-CI-DI-VA-PLU (soberania, cidadania, dignidade, valores sociais, pluralismo)."
          },
          {
            ref: "Art. 1º, II",
            texto: "A República Federativa do Brasil (...) tem como fundamentos: II – a cidadania;",
            resposta: "cidadania",
            nota: "SO-CI-DI-VA-PLU. Fundamentos são substantivos; objetivos (art. 3º) começam com verbos."
          },
          {
            ref: "Art. 1º, III",
            texto: "A República Federativa do Brasil (...) tem como fundamentos: III – a dignidade da pessoa humana;",
            resposta: "dignidade da pessoa humana",
            nota: "Considerada o valor-fonte do ordenamento. É fundamento (art. 1º), e não objetivo nem princípio das relações internacionais."
          },
          {
            ref: "Art. 1º, IV",
            texto: "A República Federativa do Brasil (...) tem como fundamentos: IV – os valores sociais do trabalho e da livre iniciativa;",
            resposta: "livre iniciativa",
            nota: "Atenção à redação: são os valores sociais do trabalho E da livre iniciativa. A livre iniciativa também fundamenta a ordem econômica (art. 170)."
          },
          {
            ref: "Art. 1º, V",
            texto: "A República Federativa do Brasil (...) tem como fundamentos: V – o pluralismo político.",
            resposta: "pluralismo político",
            nota: "Pluralismo político é mais amplo que pluripartidarismo: abrange a diversidade de ideias, crenças e grupos sociais."
          },
          {
            ref: "Art. 1º, parágrafo único",
            texto: "Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos desta Constituição.",
            resposta: "povo",
            nota: "Consagra a democracia semidireta (ou participativa): representação + participação direta (plebiscito, referendo e iniciativa popular, art. 14)."
          },
          {
            ref: "Art. 2º",
            texto: "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.",
            resposta: "harmônicos",
            nota: "Independentes E harmônicos. A separação dos Poderes é cláusula pétrea (art. 60, § 4º, III)."
          },
          {
            ref: "Art. 3º, I",
            texto: "Constituem objetivos fundamentais da República Federativa do Brasil: I – construir uma sociedade livre, justa e solidária;",
            resposta: "solidária",
            nota: "Objetivos começam com verbos: CON-GA-ERRA-PRO (construir, garantir, erradicar, promover)."
          },
          {
            ref: "Art. 3º, II",
            texto: "Constituem objetivos fundamentais da República Federativa do Brasil: II – garantir o desenvolvimento nacional;",
            resposta: "desenvolvimento nacional",
            nota: "Pegadinha comum: \"independência nacional\" não é objetivo, é princípio das relações internacionais (art. 4º, I)."
          },
          {
            ref: "Art. 3º, III",
            texto: "Constituem objetivos fundamentais da República Federativa do Brasil: III – erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais;",
            resposta: "marginalização",
            nota: "Erradica-se a pobreza e a marginalização; as desigualdades sociais e regionais são apenas REDUZIDAS."
          },
          {
            ref: "Art. 3º, IV",
            texto: "Constituem objetivos fundamentais da República Federativa do Brasil: IV – promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.",
            resposta: "bem de todos",
            nota: "O rol de preconceitos é exemplificativo: \"e quaisquer outras formas de discriminação\"."
          },
          {
            ref: "Art. 4º, I",
            texto: "A República Federativa do Brasil rege-se nas suas relações internacionais pelos seguintes princípios: I – independência nacional;",
            resposta: "independência nacional",
            nota: "Os dez princípios do art. 4º regem apenas as relações internacionais. Não confunda com a soberania, que é fundamento (art. 1º, I)."
          },
          {
            ref: "Art. 4º, II",
            texto: "A República Federativa do Brasil rege-se nas suas relações internacionais pelos seguintes princípios: II – prevalência dos direitos humanos;",
            resposta: "direitos humanos",
            nota: "Relaciona-se ao art. 5º, § 3º: tratados de direitos humanos aprovados com quórum de emenda têm status de emenda constitucional."
          },
          {
            ref: "Art. 4º, III",
            texto: "A República Federativa do Brasil rege-se nas suas relações internacionais pelos seguintes princípios: III – autodeterminação dos povos;",
            resposta: "autodeterminação dos povos",
            nota: "Cada povo decide seu destino político. Caminha junto com a não-intervenção (art. 4º, IV)."
          },
          {
            ref: "Art. 4º, VIII",
            texto: "A República Federativa do Brasil rege-se nas suas relações internacionais pelos seguintes princípios: VIII – repúdio ao terrorismo e ao racismo;",
            resposta: "racismo",
            nota: "No plano interno, o racismo é crime inafiançável e imprescritível (art. 5º, XLII) e o terrorismo é inafiançável e insuscetível de graça ou anistia (art. 5º, XLIII)."
          },
          {
            ref: "Art. 4º, X",
            texto: "A República Federativa do Brasil rege-se nas suas relações internacionais pelos seguintes princípios: X – concessão de asilo político.",
            resposta: "asilo político",
            nota: "A CF fala em asilo político, não em refúgio (este é tratado na Lei 9.474/97)."
          },
          {
            ref: "Art. 4º, parágrafo único",
            texto: "A República Federativa do Brasil buscará a integração econômica, política, social e cultural dos povos da América Latina, visando à formação de uma comunidade latino-americana de nações.",
            resposta: "América Latina",
            nota: "Cuidado: a CF fala em América Latina e comunidade latino-americana, não em \"América do Sul\" ou \"Mercosul\"."
          }
        ]
      },
      {
        id: "art5",
        nome: "Direitos e Garantias Fundamentais",
        faixa: "Art. 5º",
        itens: [
          {
            ref: "Art. 5º, caput",
            texto: "Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade.",
            resposta: "inviolabilidade",
            nota: "Cinco direitos no caput: vida, liberdade, igualdade, segurança e propriedade. O STF estende a proteção também a estrangeiros não residentes."
          },
          {
            ref: "Art. 5º, II",
            texto: "Ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei;",
            resposta: "lei",
            nota: "Princípio da legalidade. Para o particular: pode fazer tudo o que a lei não proíbe. Para a Administração: só o que a lei autoriza (art. 37)."
          },
          {
            ref: "Art. 5º, III",
            texto: "Ninguém será submetido a tortura nem a tratamento desumano ou degradante;",
            resposta: "tortura",
            nota: "A tortura é crime inafiançável e insuscetível de graça ou anistia (art. 5º, XLIII), mas NÃO é imprescritível."
          },
          {
            ref: "Art. 5º, IV",
            texto: "É livre a manifestação do pensamento, sendo vedado o anonimato;",
            resposta: "anonimato",
            nota: "A vedação ao anonimato permite responsabilizar o autor. Complementa-se pelo direito de resposta (art. 5º, V)."
          },
          {
            ref: "Art. 5º, XI",
            texto: "A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial;",
            resposta: "asilo",
            nota: "Flagrante, desastre e socorro: a qualquer hora. Ordem judicial: só durante o dia."
          },
          {
            ref: "Art. 5º, XXXV",
            texto: "A lei não excluirá da apreciação do Poder Judiciário lesão ou ameaça a direito;",
            resposta: "ameaça a direito",
            nota: "Princípio da inafastabilidade da jurisdição. Protege contra lesão já ocorrida e também contra a simples ameaça."
          },
          {
            ref: "Art. 5º, XLII",
            texto: "A prática do racismo constitui crime inafiançável e imprescritível, sujeito à pena de reclusão, nos termos da lei;",
            resposta: "imprescritível",
            nota: "Só dois crimes são imprescritíveis na CF: racismo (XLII) e ação de grupos armados contra a ordem constitucional e o Estado Democrático (XLIV)."
          },
          {
            ref: "Art. 5º, LVII",
            texto: "Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória;",
            resposta: "trânsito em julgado",
            nota: "Princípio da presunção de inocência (ou não culpabilidade)."
          },
          {
            ref: "Art. 5º, LXVIII",
            texto: "Conceder-se-á habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção, por ilegalidade ou abuso de poder;",
            resposta: "habeas corpus",
            nota: "Protege a liberdade de locomoção (ir, vir e permanecer). É gratuito (art. 5º, LXXVII) e pode ser impetrado por qualquer pessoa."
          },
          {
            ref: "Art. 5º, LXXI",
            texto: "Conceder-se-á mandado de injunção sempre que a falta de norma regulamentadora torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania;",
            resposta: "mandado de injunção",
            nota: "Remédio contra a omissão legislativa. Regulamentado pela Lei 13.300/2016."
          },
          {
            ref: "Art. 5º, LXXII",
            texto: "Conceder-se-á habeas data: a) para assegurar o conhecimento de informações relativas à pessoa do impetrante, constantes de registros ou bancos de dados de entidades governamentais ou de caráter público;",
            resposta: "habeas data",
            nota: "Serve para conhecer e para retificar informações sobre o próprio impetrante. É gratuito (art. 5º, LXXVII)."
          },
          {
            ref: "Art. 5º, LXXIII",
            texto: "Qualquer cidadão é parte legítima para propor ação popular que vise a anular ato lesivo ao patrimônio público ou de entidade de que o Estado participe, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural;",
            resposta: "ação popular",
            nota: "Só o cidadão (eleitor) pode propor. Salvo comprovada má-fé, o autor fica isento de custas judiciais e do ônus da sucumbência."
          },
          {
            ref: "Art. 5º, LXXVIII",
            texto: "A todos, no âmbito judicial e administrativo, são assegurados a razoável duração do processo e os meios que garantam a celeridade de sua tramitação.",
            resposta: "razoável duração do processo",
            nota: "Inciso incluído pela EC 45/2004 (Reforma do Judiciário). Vale para processos judiciais E administrativos."
          }
        ]
      }
    ]
  }
];
