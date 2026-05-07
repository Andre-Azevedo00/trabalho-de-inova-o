export interface Topic {
  id: string;
  title: string;
  description: string;
  theory: string;
  examples: string[];
  exercises: Exercise[];
  videoLinks: string[];
  articleLinks: ArticleLink[];
}

export interface Exercise {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface ArticleLink {
  title: string;
  url: string;
  source: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  imageUrl: string;
  topics: Topic[];
}

export const subjects: Subject[] = [
  {
    id: 'matematica',
    name: 'Matemática',
    description: 'Explore números, álgebra, geometria e muito mais',
    icon: '📐',
    color: 'from-blue-500 to-cyan-500',
    imageUrl: 'https://images.unsplash.com/photo-1774731475789-ec682fb00574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    topics: [
      {
        id: 'algebra-basica',
        title: 'Álgebra Básica',
        description: 'Fundamentos da álgebra: equações e expressões',
        theory: `
# Álgebra Básica

A álgebra é o ramo da matemática que estuda as estruturas, relações e quantidades. É a linguagem da matemática!

## Conceitos Fundamentais

**Variáveis**: Letras que representam valores desconhecidos (x, y, z, etc.)

**Expressões Algébricas**: Combinações de números, variáveis e operações.
Exemplo: 3x + 2y - 5

**Equações**: Igualdades que contêm variáveis.
Exemplo: 2x + 3 = 11

## Propriedades Importantes

1. **Propriedade Comutativa**: a + b = b + a
2. **Propriedade Associativa**: (a + b) + c = a + (b + c)
3. **Propriedade Distributiva**: a(b + c) = ab + ac
        `,
        examples: [
          'Resolver: x + 5 = 12\nSolução: x = 12 - 5 = 7',
          'Simplificar: 3x + 2x - x\nSolução: (3 + 2 - 1)x = 4x',
          'Resolver: 2(x + 3) = 14\nSolução: 2x + 6 = 14 → 2x = 8 → x = 4',
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'Qual o valor de x na equação: 3x + 6 = 21?',
            options: ['x = 3', 'x = 5', 'x = 7', 'x = 9'],
            answer: 'x = 5',
            explanation: '3x = 21 - 6 → 3x = 15 → x = 5',
          },
          {
            id: 'ex2',
            question: 'Simplifique a expressão: 5x + 3x - 2x',
            options: ['4x', '6x', '8x', '10x'],
            answer: '6x',
            explanation: '(5 + 3 - 2)x = 6x',
          },
        ],
        videoLinks: [
          'https://www.youtube.com/watch?v=NybHckSEQBI',
          'https://www.youtube.com/watch?v=Vm7H0VTlIco',
        ],
        articleLinks: [
          {
            title: 'Introdução à Álgebra - Khan Academy',
            url: 'https://pt.khanacademy.org/math/algebra',
            source: 'Khan Academy',
          },
          {
            title: 'Álgebra Básica - Brasil Escola',
            url: 'https://brasilescola.uol.com.br/matematica/algebra.htm',
            source: 'Brasil Escola',
          },
          {
            title: 'Fundamentos da Álgebra - BBC Brasil',
            url: 'https://www.bbc.com/portuguese/articles/mathematics-algebra',
            source: 'BBC Brasil',
          },
          {
            title: 'Álgebra - Enciclopédia Britannica',
            url: 'https://escola.britannica.com.br/artigo/álgebra/480981',
            source: 'Britannica Escola',
          },
        ],
      },
      {
        id: 'geometria',
        title: 'Geometria Plana',
        description: 'Estudo de formas e figuras no plano',
        theory: `
# Geometria Plana

A geometria plana estuda as figuras que podem ser representadas em um plano (duas dimensões).

## Figuras Principais

### Triângulos
- Soma dos ângulos internos = 180°
- Tipos: equilátero, isósceles, escaleno

### Quadriláteros
- Soma dos ângulos internos = 360°
- Tipos: quadrado, retângulo, losango, trapézio

### Círculo
- Área = πr²
- Perímetro = 2πr

## Teorema de Pitágoras
Em um triângulo retângulo: a² + b² = c²
        `,
        examples: [
          'Área do quadrado de lado 5cm: A = 5² = 25cm²',
          'Perímetro do retângulo 3x4: P = 2(3+4) = 14',
          'Pitágoras: triângulo 3-4-?: 3² + 4² = 9 + 16 = 25 → c = 5',
        ],
        exercises: [
          {
            id: 'ex3',
            question: 'Qual a área de um quadrado com lado de 8cm?',
            options: ['32 cm²', '64 cm²', '16 cm²', '48 cm²'],
            answer: '64 cm²',
            explanation: 'Área = lado² = 8² = 64 cm²',
          },
        ],
        videoLinks: [
          'https://www.youtube.com/watch?v=3Y6f8xW8zDs',
        ],
        articleLinks: [
          {
            title: 'Geometria Plana - Toda Matéria',
            url: 'https://www.todamateria.com.br/geometria-plana/',
            source: 'Toda Matéria',
          },
          {
            title: 'Geometria - Khan Academy',
            url: 'https://pt.khanacademy.org/math/geometry',
            source: 'Khan Academy',
          },
          {
            title: 'Teorema de Pitágoras - Wikipedia',
            url: 'https://pt.wikipedia.org/wiki/Teorema_de_Pitágoras',
            source: 'Wikipedia',
          },
        ],
      },
    ],
  },
  {
    id: 'fisica',
    name: 'Física',
    description: 'Compreenda as leis do universo e suas aplicações',
    icon: '⚛️',
    color: 'from-purple-500 to-pink-500',
    imageUrl: 'https://images.unsplash.com/photo-1761071176091-7da66403d24a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    topics: [
      {
        id: 'cinematica',
        title: 'Cinemática',
        description: 'Estudo do movimento sem considerar suas causas',
        theory: `
# Cinemática

A cinemática é a parte da física que estuda o movimento sem se preocupar com suas causas.

## Conceitos Fundamentais

**Velocidade Média**: v = Δs / Δt
- Δs: variação de posição
- Δt: variação de tempo

**Aceleração**: a = Δv / Δt

## Movimento Uniforme (MU)
- Velocidade constante
- v = Δs / Δt
- s = s₀ + vt

## Movimento Uniformemente Variado (MUV)
- Aceleração constante
- v = v₀ + at
- s = s₀ + v₀t + (at²)/2
- v² = v₀² + 2aΔs
        `,
        examples: [
          'Um carro percorre 100km em 2h. v = 100/2 = 50 km/h',
          'Objeto cai do repouso (v₀=0) com g=10m/s². Após 3s: v = 0 + 10×3 = 30 m/s',
          'Distância percorrida em queda livre: s = 0 + 0×3 + (10×3²)/2 = 45m',
        ],
        exercises: [
          {
            id: 'ex4',
            question: 'Um carro percorre 150km em 3 horas. Qual sua velocidade média?',
            options: ['30 km/h', '45 km/h', '50 km/h', '60 km/h'],
            answer: '50 km/h',
            explanation: 'v = Δs/Δt = 150km / 3h = 50 km/h',
          },
        ],
        videoLinks: [
          'https://www.youtube.com/watch?v=ZM8ECpBuQYE',
        ],
        articleLinks: [
          {
            title: 'Cinemática - Brasil Escola',
            url: 'https://brasilescola.uol.com.br/fisica/cinematica.htm',
            source: 'Brasil Escola',
          },
          {
            title: 'Física - Khan Academy',
            url: 'https://pt.khanacademy.org/science/physics',
            source: 'Khan Academy',
          },
          {
            title: 'Movimento e Forças - BBC Brasil',
            url: 'https://www.bbc.com/portuguese/topics/ciencia/fisica',
            source: 'BBC Brasil',
          },
          {
            title: 'Cinemática - Wikipedia',
            url: 'https://pt.wikipedia.org/wiki/Cinemática',
            source: 'Wikipedia',
          },
        ],
      },
    ],
  },
  {
    id: 'historia',
    name: 'História',
    description: 'Viaje através do tempo e descubra a evolução da humanidade',
    icon: '📚',
    color: 'from-amber-500 to-orange-500',
    imageUrl: 'https://images.unsplash.com/photo-1764509422504-f9aee0a1dd76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    topics: [
      {
        id: 'idade-media',
        title: 'Idade Média',
        description: 'O período medieval europeu',
        theory: `
# Idade Média (476 - 1453)

A Idade Média foi o período entre a queda do Império Romano e o início da Idade Moderna.

## Características Principais

### Feudalismo
- Sistema econômico e social baseado na posse de terras
- Senhores feudais e servos
- Economia agrária e descentralizada

### Igreja Católica
- Grande poder político e cultural
- Preservação do conhecimento em mosteiros
- Influência na educação e arte

### Eventos Importantes
- Cruzadas (1095-1291)
- Peste Negra (1347-1353)
- Guerra dos Cem Anos (1337-1453)

## Divisão
1. **Alta Idade Média** (476-1000)
2. **Baixa Idade Média** (1000-1453)
        `,
        examples: [
          'Feudalismo: Senhor feudal dava proteção, servo trabalhava a terra',
          'Cruzadas: Expedições militares cristãs para recuperar Jerusalém',
          'Peste Negra: Matou 1/3 da população europeia',
        ],
        exercises: [
          {
            id: 'ex5',
            question: 'Qual era a base do sistema feudal?',
            options: ['Comércio marítimo', 'Posse de terras', 'Indústria têxtil', 'Mineração'],
            answer: 'Posse de terras',
            explanation: 'O feudalismo era baseado na posse e exploração de terras agrícolas.',
          },
        ],
        videoLinks: [
          'https://www.youtube.com/watch?v=HUgoccHJXTQ',
        ],
        articleLinks: [
          {
            title: 'Idade Média - História do Mundo',
            url: 'https://www.historiadomundo.com.br/idade-media',
            source: 'História do Mundo',
          },
          {
            title: 'Idade Média - Wikipedia',
            url: 'https://pt.wikipedia.org/wiki/Idade_Média',
            source: 'Wikipedia',
          },
          {
            title: 'Feudalismo - Britannica Escola',
            url: 'https://escola.britannica.com.br/artigo/feudalismo/481280',
            source: 'Britannica Escola',
          },
          {
            title: 'História Medieval - BBC Brasil',
            url: 'https://www.bbc.com/portuguese/topics/historia',
            source: 'BBC Brasil',
          },
        ],
      },
    ],
  },
  {
    id: 'geografia',
    name: 'Geografia',
    description: 'Explore o planeta Terra e suas características',
    icon: '🌍',
    color: 'from-green-500 to-emerald-500',
    imageUrl: 'https://images.unsplash.com/photo-1742415105376-43d3a5fd03fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    topics: [
      {
        id: 'relevo',
        title: 'Relevo e Formações',
        description: 'As formas da superfície terrestre',
        theory: `
# Relevo Terrestre

O relevo é o conjunto de formas da superfície da Terra.

## Principais Formas de Relevo

### Montanhas
- Elevações naturais do terreno
- Altitude superior a 300 metros
- Exemplo: Cordilheira dos Andes

### Planícies
- Terrenos planos e baixos
- Próximos ao nível do mar
- Ideais para agricultura

### Planaltos
- Terrenos elevados e planos
- Entre 300 e 900 metros
- Bordas mais altas que o centro

### Depressões
- Áreas mais baixas que o relevo ao redor
- Podem ser absolutas ou relativas

## Agentes Transformadores
- **Internos**: vulcanismo, terremotos
- **Externos**: erosão, intemperismo
        `,
        examples: [
          'Planície Amazônica: área de baixa altitude na região Norte',
          'Planalto Central: área elevada no centro do Brasil',
          'Serra do Mar: conjunto de montanhas no litoral brasileiro',
        ],
        exercises: [
          {
            id: 'ex6',
            question: 'Qual a principal característica de uma planície?',
            options: ['Grande altitude', 'Terreno plano e baixo', 'Muitas montanhas', 'Clima frio'],
            answer: 'Terreno plano e baixo',
            explanation: 'Planícies são caracterizadas por serem terrenos planos e de baixa altitude.',
          },
        ],
        videoLinks: [
          'https://www.youtube.com/watch?v=vN8OFpHPFKQ',
        ],
        articleLinks: [
          {
            title: 'Formas de Relevo - Mundo Educação',
            url: 'https://mundoeducacao.uol.com.br/geografia/formas-relevo.htm',
            source: 'Mundo Educação',
          },
          {
            title: 'Relevo Terrestre - Wikipedia',
            url: 'https://pt.wikipedia.org/wiki/Relevo',
            source: 'Wikipedia',
          },
          {
            title: 'Geografia Física - National Geographic Brasil',
            url: 'https://www.nationalgeographicbrasil.com/meio-ambiente',
            source: 'National Geographic',
          },
          {
            title: 'Relevo - Britannica Escola',
            url: 'https://escola.britannica.com.br/artigo/relevo/482187',
            source: 'Britannica Escola',
          },
        ],
      },
    ],
  },
  {
    id: 'portugues',
    name: 'Português',
    description: 'Domine a língua portuguesa e suas nuances',
    icon: '📖',
    color: 'from-red-500 to-rose-500',
    imageUrl: 'https://images.unsplash.com/photo-1512932503744-92c247fc46e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    topics: [
      {
        id: 'classes-gramaticais',
        title: 'Classes Gramaticais',
        description: 'As categorias das palavras',
        theory: `
# Classes Gramaticais

As palavras da língua portuguesa são classificadas em 10 classes gramaticais.

## Classes Variáveis

### Substantivo
- Nomeia seres, objetos, sentimentos
- Exemplos: casa, amor, Paulo

### Adjetivo
- Caracteriza o substantivo
- Exemplos: bonito, grande, feliz

### Verbo
- Indica ação, estado ou fenômeno
- Exemplos: correr, ser, chover

### Pronome
- Substitui ou acompanha o substantivo
- Exemplos: eu, ele, meu, este

### Artigo
- Determina o substantivo
- Exemplos: o, a, um, uma

### Numeral
- Indica quantidade ou ordem
- Exemplos: dois, primeiro, dobro

## Classes Invariáveis

### Advérbio
- Modifica verbo, adjetivo ou outro advérbio
- Exemplos: aqui, muito, bem

### Preposição
- Liga termos
- Exemplos: de, para, com, em

### Conjunção
- Liga orações
- Exemplos: e, mas, porque, quando

### Interjeição
- Expressa emoções
- Exemplos: ah!, uau!, oba!
        `,
        examples: [
          'O menino bonito correu rapidamente.\n- O: artigo\n- menino: substantivo\n- bonito: adjetivo\n- correu: verbo\n- rapidamente: advérbio',
          'Ela é inteligente e esforçada.\n- Ela: pronome\n- é: verbo\n- inteligente: adjetivo\n- e: conjunção\n- esforçada: adjetivo',
        ],
        exercises: [
          {
            id: 'ex7',
            question: 'Na frase "O gato preto dormiu", qual é o adjetivo?',
            options: ['O', 'gato', 'preto', 'dormiu'],
            answer: 'preto',
            explanation: 'Preto é o adjetivo que caracteriza o substantivo "gato".',
          },
        ],
        videoLinks: [
          'https://www.youtube.com/watch?v=YrZYGvQ8op8',
        ],
        articleLinks: [
          {
            title: 'Classes Gramaticais - Português',
            url: 'https://www.portugues.com.br/gramatica/classes-gramaticais.html',
            source: 'Português.com.br',
          },
          {
            title: 'Gramática Portuguesa - Wikipedia',
            url: 'https://pt.wikipedia.org/wiki/Gramática_da_língua_portuguesa',
            source: 'Wikipedia',
          },
          {
            title: 'Português - Britannica Escola',
            url: 'https://escola.britannica.com.br/artigo/língua-portuguesa/482042',
            source: 'Britannica Escola',
          },
        ],
      },
    ],
  },
  {
    id: 'biologia',
    name: 'Biologia',
    description: 'Descubra os mistérios da vida',
    icon: '🧬',
    color: 'from-teal-500 to-cyan-500',
    imageUrl: 'https://images.unsplash.com/photo-1760493828288-d2dbb70d18c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    topics: [
      {
        id: 'celula',
        title: 'Citologia - A Célula',
        description: 'Unidade fundamental da vida',
        theory: `
# A Célula

A célula é a menor unidade estrutural e funcional dos seres vivos.

## Tipos de Células

### Célula Procarionte
- Sem núcleo definido
- Material genético disperso no citoplasma
- Exemplo: bactérias

### Célula Eucarionte
- Núcleo definido com membrana nuclear
- Organelas especializadas
- Exemplo: células animais e vegetais

## Organelas Principais

**Membrana Plasmática**: Controla entrada e saída de substâncias

**Citoplasma**: Região entre a membrana e o núcleo

**Núcleo**: Armazena o material genético (DNA)

**Mitocôndria**: Produz energia (ATP)

**Ribossomo**: Síntese de proteínas

**Retículo Endoplasmático**: Transporte de substâncias

**Complexo de Golgi**: Secreção de substâncias
        `,
        examples: [
          'Células musculares: muitas mitocôndrias para gerar energia',
          'Células vegetais: têm cloroplastos para fotossíntese',
          'Hemácias: células sem núcleo, transportam oxigênio',
        ],
        exercises: [
          {
            id: 'ex8',
            question: 'Qual organela é responsável pela produção de energia?',
            options: ['Núcleo', 'Mitocôndria', 'Ribossomo', 'Membrana'],
            answer: 'Mitocôndria',
            explanation: 'A mitocôndria é conhecida como a "usina" da célula, produzindo ATP.',
          },
        ],
        videoLinks: [
          'https://www.youtube.com/watch?v=URUJD5NEXC8',
        ],
        articleLinks: [
          {
            title: 'Citologia - Biologia Net',
            url: 'https://www.biologianet.com/citologia',
            source: 'Biologia Net',
          },
          {
            title: 'A Célula - Khan Academy',
            url: 'https://pt.khanacademy.org/science/biology',
            source: 'Khan Academy',
          },
          {
            title: 'Célula - Wikipedia',
            url: 'https://pt.wikipedia.org/wiki/Célula',
            source: 'Wikipedia',
          },
          {
            title: 'Biologia Celular - National Geographic Brasil',
            url: 'https://www.nationalgeographicbrasil.com/ciencia',
            source: 'National Geographic',
          },
        ],
      },
    ],
  },
  {
    id: 'quimica',
    name: 'Química',
    description: 'Entenda as transformações da matéria',
    icon: '⚗️',
    color: 'from-indigo-500 to-purple-500',
    imageUrl: 'https://images.unsplash.com/photo-1676293107432-1b6753581201?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    topics: [
      {
        id: 'tabela-periodica',
        title: 'Tabela Periódica',
        description: 'Organização dos elementos químicos',
        theory: `
# Tabela Periódica

A tabela periódica organiza todos os elementos químicos conhecidos.

## Estrutura

**Períodos**: Linhas horizontais (7 no total)
- Indicam o número de camadas eletrônicas

**Famílias/Grupos**: Colunas verticais (18 no total)
- Elementos com propriedades semelhantes

## Principais Famílias

**Metais Alcalinos** (Grupo 1): Li, Na, K
- Muito reativos
- 1 elétron na última camada

**Metais Alcalino-Terrosos** (Grupo 2): Be, Mg, Ca
- 2 elétrons na última camada

**Halogênios** (Grupo 17): F, Cl, Br, I
- Muito reativos
- 7 elétrons na última camada

**Gases Nobres** (Grupo 18): He, Ne, Ar
- Estáveis, não reativos
- Camada completa

## Classificação

- **Metais**: Maioria dos elementos, bons condutores
- **Não-metais**: Isolantes, formam ânions
- **Semimetais**: Propriedades intermediárias
        `,
        examples: [
          'Sódio (Na): metal alcalino, 11 prótons, muito reativo',
          'Oxigênio (O): não-metal, essencial para respiração',
          'Ferro (Fe): metal de transição, usado em construções',
        ],
        exercises: [
          {
            id: 'ex9',
            question: 'Qual grupo é conhecido por ser muito estável e não reativo?',
            options: ['Metais alcalinos', 'Halogênios', 'Gases nobres', 'Metais de transição'],
            answer: 'Gases nobres',
            explanation: 'Os gases nobres têm a camada de valência completa, tornando-os estáveis.',
          },
        ],
        videoLinks: [
          'https://www.youtube.com/watch?v=fPnwBITSmgU',
        ],
        articleLinks: [
          {
            title: 'Tabela Periódica - Toda Matéria',
            url: 'https://www.todamateria.com.br/tabela-periodica/',
            source: 'Toda Matéria',
          },
          {
            title: 'Química - Khan Academy',
            url: 'https://pt.khanacademy.org/science/chemistry',
            source: 'Khan Academy',
          },
          {
            title: 'Tabela Periódica - Wikipedia',
            url: 'https://pt.wikipedia.org/wiki/Tabela_periódica',
            source: 'Wikipedia',
          },
          {
            title: 'Elementos Químicos - Britannica Escola',
            url: 'https://escola.britannica.com.br/artigo/elemento-químico/481067',
            source: 'Britannica Escola',
          },
        ],
      },
    ],
  },
];