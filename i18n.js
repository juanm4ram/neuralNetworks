/* =========================================================
   i18n.js — Bilingual engine (English / Spanish)
   ---------------------------------------------------------
   The HTML source is written in Spanish and every translatable
   block carries a data-i18n="tNNN" key. This file holds the
   English strings for those keys.

   Default language: ENGLISH. The choice is stored in
   localStorage and applied on load. Switching language reloads
   the page (keeping the current section via the #hash) so that
   every canvas, SVG label and generated table is rebuilt in the
   selected language — no stale text anywhere.

   To translate a new block: add data-i18n="tNNN" in index.html
   and its English string to EN below.
   ========================================================= */
(function () {
  'use strict';

  var DEFAULT_LANG = 'en';
  var STORE_KEY = 'tp-ml-lang';

  var EN = {
    /* Expanded introduction: preserve colors, panels and mathematical notation. */
    "intro_p00": "When studying <span class=\"concept concept--red\">how a baby's brain learns</span>, we know that it comes with a <span class=\"concept concept--context\">structure</span> that develops as the baby grows, and with <span class=\"concept concept--learn\">information preloaded through genetics</span>. Part of studying human pedagogy involves understanding how the brain works at these stages and what it can be exposed to in order to encourage its best responses.",
    "intro_p01": "Just as a tutor uses techniques based on understanding how our brain works to help a learner achieve the best performance, training <span class=\"concept concept--learn\">artificial intelligence</span> requires understanding the structure in which its thinking unfolds and how it is optimised.",
    "intro_p02": "We call a mathematical model that produces text output according to a <span class=\"concept concept--learn\">probability function</span> (which varies between models), based on text input, a Large Language Model (LLM). We could think of it as the scaffolding or structure formed in a brain with millions of connections, some stronger than others, and areas organised by specialisation. We will now see why this analogy is useful.",
    "intro_p03": "This model calculates probabilities for the <span class=\"concept concept--text\">next token</span> it will write, and then the entire text is sent to the function again.",
    "intro_p04": "<span class=\"concept concept--text\">Tokens</span> are <span class=\"concept concept--text\">character fragments</span> with an associated <span class=\"concept concept--text\">numerical ID</span>. Which fragments are worth representing as separate units with a unique ID depends on how often they occur in the texts used to train a tokenizer. For example, a tokenizer would not assign an ID to a fragment such as &quot;jkdjfkdjfk&quot; because it does not appear in any word. In contrast, &quot;in&quot; is a common fragment in Spanish words such as &quot;inteligencia&quot; and &quot;intento&quot;. This makes it worth assigning an ID and allows text to be processed more economically: assigning IDs to every combination of characters would require a great deal of memory.",
    "intro_p05": "Also, using frequent fragments requires <span class=\"concept concept--gold\">fewer steps</span> than processing text letter by letter, reducing computation costs and allowing more text to fit in the context.",
    "intro_p06": "On the other hand, combining small fragments makes it possible to represent <span class=\"concept concept--vector\">new words</span> without storing every possible word.<br>A first tip to keep in mind: one tokenizer may be better than another <span class=\"concept concept--context\">depending on the context</span>. For example, one trained on a lot of English may split Spanish into more fragments. Something similar happens with code or scientific texts.",
    "intro_p07": "So, for example, suppose we have a sentence like this:",
    "intro_p08": "&quot;Hola, qué lindo día!&quot; (&quot;Hello, what a lovely day!&quot;)",
    "intro_p09": "And the tokens were these fragments:",
    "intro_p10": "The function's input will be represented by the <span class=\"concept concept--text\">ID of each token</span>, in the same order:",
    "intro_p11": "Each component of the vector corresponds to a token in the text. This example has <span class=\"concept concept--gold\">eight</span>; longer texts will produce vectors with more components.",
    "intro_p12": "The probability function of an LLM looks like this:",
    "intro_p13": "That is: “the probability of the next token given the preceding text”.",
    "intro_p14": "Where does this probability function come from, and how can it produce intelligent answers? Let's look at how it is designed...",
    "intro_p15": "We will call $f$ the <span class=\"concept concept--red\">function representing the entire model</span> (or model function), and $\\theta$ the set of all its <span class=\"concept concept--learn\">learned parameters</span> (we will explain this later). $x$ will be the vector made up of the token IDs.",
    "intro_p16": "This model function has many stages. Each modification at a stage must work with what the previous stage produced. That is what a <span class=\"concept concept--context\">composition of functions</span> does, expressed as follows:",
    "intro_p17": "Composition is read from right to left: stage 1 acts first, followed by stage 2 and finally stage 3.",
    "intro_p18": "Next, we will give a broad overview of these stages. Interestingly, how they are built varies between companies, and final designs are only partially public. As an example, Google's Gemini model has a structure similar to the following:",
    "intro_p19": "Each block $B_i$ includes attention and an MLP network or a mixture of experts (MoE). This diagram omits details to show the main stages.",
    "intro_p20": "Explaining each stage can take quite a while, so here we will work with the first stage used (the one furthest to the right): Embeddings.",
    "intro_p21": "Once the tokenizer converts text into IDs, each ID is used to look up a vector in a large embedding table.<br><span class=\"concept concept--vector\">An embedding</span> is a <span class=\"concept concept--vector\">vector of numbers</span> learned during training and assigned to a token. Unlike the tokenizer, this assignment does not assign numbers by frequency, but according to how close tokens are in meaning.",
    "intro_p22": "Think of it as a table where each row belongs to a token in the vocabulary.<br>Suppose the vocabulary has 4 tokens:",
    "intro_p23": "And the <span class=\"concept concept--vector\">embedding matrix</span> is:",
    "intro_p24": "Each row is a vector associated with a token.<br>If the tokenizer produces:",
    "intro_p25": "the model uses that $1$ as a row index:",
    "intro_p26": "Once the row is found, the entire vector replaces the ID as the token's representation for the next stages of the model function, because transformations can be applied to the embedding matrix (the main objective of the next stage).<br>That is:",
    "intro_p27": "was simply the identifier for &quot;perro&quot; (Spanish for &quot;dog&quot;).<br>After the lookup:",
    "intro_p28": "is the numerical representation that the network can start transforming.<br>If your input were:<br>perro corre",
    "intro_p29": "the tokenizer could return:",
    "intro_p30": "Both rows are looked up:",
    "intro_p31": "And a matrix is assembled:",
    "intro_p32": "We now have:",
    "intro_p33": "That $X$ is what the next stage, the Transformer, starts receiving.",
    "intro_p34": "Where do those numbers come from?<br>The values in the embedding matrix are part of the model's parameters:",
    "intro_p35": "They are initialised with small, usually pseudorandom values and are modified during training through <span class=\"concept concept--learn\">gradient descent</span> (a key concept explained later).<br>For example, initially:",
    "intro_p36": "After a great deal of training, it might end up as:",
    "intro_p37": "No person says:<br>“The first coordinate of perro will be 0.42 because it represents animals.”",
    "intro_p38": "Training adjusts those numbers because certain values help the model predict the next tokens better.",
    "intro_p39": "After obtaining the embeddings, those representations enter Transformer blocks.<br>The main function of a Transformer block is to take the tokens' initial vectors and turn them into representations that <span class=\"concept concept--context\">incorporate context</span>.<br>For example, the initial embedding of &quot;banco&quot; (Spanish for either &quot;bank&quot; or &quot;bench&quot;) is always the same:",
    "intro_p40": "But the Transformer transforms that vector differently depending on whether it appears in:<br>“I deposited money in the bank.”",
    "intro_p41": "or<br>“I sat on the bench.”",
    "intro_p42": "The idea is:",
    "intro_p43": "A Transformer block does this mainly with two components:<br><span class=\"concept concept--context\">1. Attention</span>: lets each token “look at” other tokens and determine which are relevant.<br><span class=\"concept concept--context\">2. Feed-forward neural network</span>: further transforms each token's representation.<br>Very simply:",
    "intro_p44": "where $X$ is the embedding matrix and $X'$ is a new matrix of more contextualised vectors.<br>For example:",
    "intro_p45": "starts as four independent embeddings:",
    "intro_p46": "After a Transformer layer, the vector for &quot;tomó&quot; can already incorporate information from &quot;gato&quot; and &quot;leche&quot;:",
    "intro_p47": "And this is repeated many times:",
    "intro_p48": "Each layer refines the representations.<br>In a few words: a Transformer block receives the tokens' embeddings and transforms them into new <span class=\"concept concept--context\">representations that incorporate contextual information</span>, mainly through attention mechanisms and internal neural networks.",
    "intro_p49": "So, researchers determine the model's architecture and its mathematical operations, but do not manually set all its parameter values. During training, the model adjusts them through an optimisation process that seeks to <span class=\"concept concept--learn\">progressively reduce</span> an <span class=\"concept concept--learn\">error function</span>, the distance from the objective.",
    "intro_p50": "In this project, we will see how tools from Calculus and Linear Algebra, such as functions of several variables, partial derivatives and the gradient, help us understand a fundamental part of that learning and optimisation process, and how it contributes to a language model's ability to generate coherent text.",
    "intro_math0": "$$f_{\\theta}(x)=(\\mathrm{Stage}_3\\circ\\mathrm{Stage}_2\\circ\\mathrm{Stage}_1)(x)$$",
    "intro_math1": "$$\\begin{aligned}f_{\\theta}={}&amp;\\operatorname{Softmax}\\circ\\operatorname{OutputProjection}\\\\&amp;\\circ\\underbrace{B_L\\circ\\cdots\\circ B_1}_{L\\text{ Transformer blocks}}\\\\&amp;\\circ\\operatorname{Embedding}\\end{aligned}$$",
    "intro_math2": "$$\\boxed{\n\\text{2 tokens}\\times\\text{3 internal features}\n}$$",
    "intro_math3": "$$\\boxed{\\text{initial embedding}}\n\\rightarrow\n\\boxed{\\text{contextual representation}}$$",
    "intro_math4": "$$\\mathbf h_{\\text{tomó}}\n=\n\\text{a representation of &quot;tomó&quot; in that context}$$",
    "intro_tokens_label": "Ho, la, comma, qué, lin, do, día, exclamation mark",

    /* ---------- Cover & intro ---------- */
    t002: 'The evolution of',
    t003: 'AGENTS',
    t004: 'and',
    t005: 'NEURAL NETWORKS',
    t006: 'START&nbsp;&rarr;',
    t008: 'Español',
    t009: 'English',
    t010: 'The evolution of agents and neural networks',
    t011: '&#8635; Home',
    t012: 'Introduction',
    t013: 'A big part of understanding how to work with AI agents is learning how they learn, how they are optimised and where they came from. We know there are huge mathematical functions behind them. But how were those functions created? What led researchers to be able to develop them?',
    t015: 'Missing video',
    t016: 'Copy it into the project’s <em>videos/</em> folder.',
    t017: 'Surprisingly, it is the machine itself that manages to find those functions. In this project we will see how the tools of Calculus II help us understand how artificial intelligence is able to generate meaningful text.',
    t018: '&larr; Cover',
    t019: 'Start the project &rarr;',

    /* ---------- Page 1 · Modelling reality ---------- */
    t020: 'Page 1',
    t021: 'What does it mean to model reality?',
    t022: 'Modelling reality means representing it in a simpler form — through numbers, words and relationships — so that we can understand it, predict it and make decisions about it.',
    t023: 'A machine can carry out this very same job. The work consists of taking reality into a model, then going from the model back to reality, and seeing how the two interact.',
    t024: 'Now it is worth asking: how could we model this reality in which models act with a developmental delay, and how could we improve it? That is what the big AI companies ask themselves every day. And one of the most influential factors they observed was <em>compute</em>.',
    t025: '<strong>“Scaling Laws for Neural Language Models”</strong><sup class="ref"><a href="https://arxiv.org/abs/2001.08361" rel="noopener" target="_blank">[1]</a></sup> (OpenAI, January 2020) measured how the error of their models changed as they scaled up size, data and compute, and empirically found an astonishingly regular pattern: the error fell following a <em>power law</em>. With that regularity they could estimate how much the loss would drop if they kept scaling. The estimate convinced OpenAI to invest millions of dollars in building GPT-3 that same year, expecting something considerably better than GPT-2. And it worked.',
    t026: 'And what is that “error” that goes down? The paper calls it <em>cross-entropy loss</em>, and it is easiest to understand by recalling how a language model writes: word by word. Before each word, the model spreads probabilities across all the candidates; it gives more to the ones it finds natural and less to the odd ones. Then we look at which word actually came next in the text, and the model is penalised according to how much probability it had assigned to it. Suppose the word that came next was <em>house</em>:',
    t027: '<span class="sym">80%</span> assigned to <em>house</em> → small penalty: $-\\ln(0{.}8) \\approx 0{.}22$.',
    t028: '<span class="sym">10%</span> assigned to <em>house</em> → large penalty: $-\\ln(0{.}1) \\approx 2{.}30$.',
    t029: 'To score a whole model we repeat that computation over thousands of tokens and average it. When the average is computed over texts the model never saw during training, it is called <em>test loss</em>. Using unseen text is what tells us whether the model really learned the language or merely memorised its examples:',
    t030: 'A low test loss means the model has been assigning good probability to the words that actually appear. That is still far from measuring “intelligence”, but as a thermometer of performance it works very well, and it is the yardstick the paper uses: more compute, lower test loss, better language model. With a large enough dataset and an optimally sized model, the loss falls following a power law:',
    t031: 'In other words, performance improves predictably but with <em>diminishing returns</em>: to lower the loss a lot, you need to increase compute enormously. We noted down some approximate points from Figure 1 of the paper (X axis = training compute in PF-days, Y axis = test loss, both on a logarithmic scale):',
    t032: 'Test loss vs. training compute',
    t033: 'on a log-log scale the points fall almost on a straight line',
    t034: 'On a log-log scale the curve drops almost like a straight line: that is the signature of a power law. Looking at the chart, we draw a line representing this trend. Believe it or not, what we have just drawn is a <em>model</em>.',
    t035: 'Mathematically, in a two-dimensional space, a straight line is defined by the following equation:',
    t036: '<span class="sym">$\\hat{y}$</span> (output): our model’s prediction (e.g. the test loss the language model will have).',
    t037: '<span class="sym">$x$</span> (input): our independent variable (e.g. the orders of magnitude of compute invested).',
    t038: '<span class="sym">$w$</span> (weight / slope): sets the tilt of the line; here it is negative: more compute, less error.',
    t039: '<span class="sym">$b$</span> (bias / intercept): tells us at what height the line crosses the axis.',
    t040: 'This is the structure of the <em>simple linear regression</em> model. But of course, what we would really want is an algorithm able to draw this line automatically from the data. How does such an algorithm decide which line is best? We will see that in the next chapter.',
    t041: 'Page 1 of 9',
    t042: '&larr; Introduction',
    t043: 'The cost function &rarr;',

    /* ---------- Page 2 · Cost function ---------- */
    t044: 'Page 2',
    t045: 'The cost function and the error',
    t046: 'How does the algorithm know whether one line is better than another? This is where the concept of <em>error</em> comes in. For a given point (say, a compute budget of $10^{0} = 1$ PF-day), our model predicts a test loss of 2.9, but the real figure from the Scaling Laws paper is 2.6. The distance between the predicted value and the actual value is our error.',
    t047: 'To evaluate the model as a whole we compute the <em>Mean Squared Error</em> (MSE), a cost function that penalises the furthest points more heavily:',
    t048: 'Our task is to tune the parameters $w$ and $b$ so as to minimise this cost function. Here is an interactive tool to try fitting the line ourselves: move the sliders and watch how the error changes.',
    t050: 'Fit the line to the data',
    t051: 'Current MSE: <b id="reg-mse">&mdash;</b>',
    t052: 'Slope <span class="sym">$w$</span><span class="val" id="reg-w-val">-0.10</span>',
    t053: 'Bias <span class="sym">$b$</span><span class="val" id="reg-b-val">3.0</span>',
    t054: 'Show best fit',
    t055: 'The best fit minimises the mean squared error.',
    t056: 'Page 2 of 9',
    t057: '&larr; The origin',
    t058: 'Adding dimensions &rarr;',
    /* ---------- Page 3 · Adding dimensions ---------- */
    t059: 'Page 3',
    t060: 'Adding dimensions',
    t061: 'Reality shows us it is far more complex, and that a phenomenon is rarely affected by a single factor. An agent’s success depends on the compute it has, yes, but also on the time it spends elaborating its thinking, or <em>Test-Time Compute</em> (Chain-of-Thought, 2022)<sup class="ref"><a href="https://arxiv.org/abs/2201.11903" rel="noopener" target="_blank">[2]</a></sup>.',
    t062: 'Unlike model size or internet data (where you need to multiply resources exponentially to see a minimal improvement), the thinking time you give a model during inference (using <em>Chain of Thought</em>) shows a direct and steady benefit: more compute time = more logical steps = higher accuracy. Give an advanced reasoning model an extremely complex maths problem: if it thinks for 1 second, its probability of success is low; if you let it explore paths and correct itself for 10 seconds, its accuracy scales sharply; and if it thinks for 60 seconds, the probability of solving the problem keeps rising almost in proportion to the time invested.',
    t063: 'If we bring this new variable into the model, we are no longer dealing with a simple regression but a <em>multiple</em> one. The equation grows to accommodate more weights ($w_1, w_2, \\dots$):',
    t064: 'This operation — taking several inputs, multiplying each by its corresponding weight, adding them up and adding the bias — is the fundamental mathematical piece on which we will build everything that follows.',
    t065: 'And here we would no longer be looking for the line that best fits two-dimensional data, but for the best <em>plane</em> fitting the three-dimensional cloud of points. If we add more variables, we will work with <em>hyperplanes</em> in multidimensional spaces. Each dimension represents a feature of the reality the data describes.',
    t066: 'The vector form',
    t067: 'The most convenient way to represent this data is in <em>vector</em> form, with matrices:',
    t068: '<span class="sym">$X$</span> — design matrix of size $n \\times (d+1)$: each row is a sample (an agent configuration) and each column a feature. The first column is all ones, to go with the bias.',
    t069: '<span class="sym">$W$</span> — parameter vector of size $(d+1) \\times 1$: it holds the weights $w_1, \\dots, w_d$ and the bias $b$.',
    t070: '<span class="sym">$Y$</span> — output vector of size $n \\times 1$: the prediction for each sample.',
    t071: 'The mean squared error in vector form',
    t072: 'The sum of squared errors is written as the product of the error vector with itself (its squared norm):',
    t073: 'We distribute the transpose and expand the parentheses:',
    t074: 'The cross terms $Y^{T}XW$ and $W^{T}X^{T}Y$ are scalars and one is the transpose of the other, which is why they combine into a single $-2\\,W^{T}X^{T}Y$.',
    t075: 'Recall that with the derivative we could find the minimum of a function by setting it to zero. If we differentiate the expression above with respect to $W$ and set it to $0$:',
    t076: 'Solving for $W$, we obtain the expression for the minimum mean squared error:',
    t077: 'This equation is all we need to obtain the parameters that minimise the error. We take the matrices $X$ and $Y$, compute $W$, and that is it: this is the method of <em>ordinary least squares</em>.',
    t078: 'Why is this formula not enough?',
    t079: 'In this case we were lucky to get a closed-form formula with which to compute the parameters. But that will not always happen. If we work with other models or other cost functions, we will not always be able to find the minimum analytically. And even applying the method above, we have to invert $X^{T}X$, and <em>inverting a matrix</em> is an operation that can be very inefficient for a computer.',
    t080: 'So we need a method that guarantees reducing the cost in general: an iterative method that gradually approaches the minimum error, <em>gradient descent</em>. But before getting there, let us take a good look at that fundamental piece: the perceptron.',
    t081: 'Page 3 of 9',
    t082: '&larr; The cost function',
    t083: 'The perceptron &rarr;',

    /* ---------- Page 4 · The perceptron ---------- */
    t084: 'Page 4',
    t085: 'The perceptron',
    t086: 'A neuron is the basic information-processing unit of a neural network. Much like a biological neuron, it has input connections through which it receives external stimuli (the input values). With those values it performs an internal computation and returns an output value. In short, it is a mathematical function.',
    t087: 'What does that computation involve?',
    t088: 'Internally, the neuron uses all the values to compute a <em>weighted sum</em>: it multiplies each input value by a weight associated with its connection. That weight is a number that makes one input stronger than another. The weights are the parameters of our model: we can change them positively or negatively to change the value of the sum.',
    t089: 'We can see that this function is the same one we already knew:',
    t090: 'You could say a neuron does something very similar to a linear regression. Here we call the term $b$ the <em>bias</em>, and it is another input to the neuron: we tune it so that the neuron is “biased” towards a specific value.',
    t091: 'the neuron adds up the inputs times their weights and adds the bias b',
    t092: 'A network made of a <strong>single neuron</strong> of this kind is known as a <strong>Perceptron</strong>: the simplest possible model, and the historical starting point of neural networks.',
    t093: 'With this piece in hand, in the next chapter we will put it to work on a concrete example taken from AI papers on agents.',
    t094: 'Page 4 of 9',
    t095: '&larr; Adding dimensions',
    t096: 'An example: logic gates &rarr;',

    /* ---------- Page 5 · Logic gates ---------- */
    t097: 'Page 5',
    t098: 'An example: the agent and logic gates',
    t099: 'Imagine we want to model a system that predicts whether an autonomous LLM-based agent will successfully solve a complex software engineering task. Analysing the papers, we determine that a successful deployment depends critically on the combination of two binary input variables ($0$ or $1$):',
    t100: '<span class="sym">$x_1$</span> (training compute / Scaling Laws): it is $1$ if the model was trained with the compute and data the power law demands for its size, and $0$ if it is a small or under-trained model.',
    t101: '<span class="sym">$x_2$</span> (Test-Time Compute / Chain of Thought): it is $1$ if we give the agent thinking time during inference to reason step by step, explore paths and correct itself, and $0$ if we force it to answer immediately.',
    t102: 'Our desired output ($y$) will also be binary: $1$ if performance is <em>successful</em> and $0$ if the agent <em>fails</em>. But the neuron performs a linear weighted sum ($z$) that returns a continuous number, not a binary decision.',
    t103: 'The threshold',
    t104: 'To solve this, the classic design evaluates the result of the linear regression against a <em>threshold</em>: if the weighted sum exceeds it, the output is $1$; if it falls below, the output is $0$. If we fold the bias ($b$) in with a value equal to the negative of the threshold, the logic simplifies and the output depends only on whether $z$ is greater or smaller than zero:',
    t105: 'Case A: the strict agent (AND gate)',
    t106: 'Suppose that, to succeed on complex software, we absolutely need <em>both</em> conditions to hold at once (a model trained with enough compute <em>and</em> thinking time at inference). Any partial combination causes failure. This is equivalent to a logical AND gate. Choosing $w_1 = 2$, $w_2 = 2$ and $b = -3$:',
    t107: '$x_1$ (compute)',
    t108: '$x_2$ (reasoning)',
    t109: 'Actual success $y$',
    t110: 'Sum $z$',
    t111: 'Output',
    t112: 'The neuron only returns a positive value, and therefore an output of $1$, when both inputs are active. If we plot the table, these parameters trace a line (the <em>decision boundary</em>) that perfectly separates the single success point from the three failures.',
    t113: 'AND gate &mdash; w₁ = 2, w₂ = 2, b = −3',
    t114: 'Case B: the flexible agent (OR gate)',
    t115: 'Now imagine a more forgiving setting, where the agent gets the task done if it has at least one of the two advantages (either because the model is so large and well trained that it gets it right first try, <em>or</em> because a modest model reasoning step by step still reaches the answer). This is equivalent to an OR gate. We adjust the parameter levers: with $w_1 = 2$, $w_2 = 2$ and a less defensive bias $b = -1$, it is enough for either input to be $1$ for $z$ to come out positive — for example $2(1)+2(0)-1=+1$ — and success is triggered. A single linear neuron handles this case without trouble.',
    t116: 'OR gate &mdash; w₁ = 2, w₂ = 2, b = −1',
    t117: 'Page 5 of 9',
    t118: '&larr; The perceptron',
    t119: 'The XOR paradox &rarr;',
    /* ---------- Page 6 · XOR ---------- */
    t120: 'Page 6',
    t121: 'The multi-agent paradox and the non-linear boundary (XOR)',
    t122: 'Let us now confront our model with a genuinely complex real-world scenario, taken from the Google DeepMind and MIT paper <em>“Towards a Science of Scaling Agent Systems”</em><sup class="ref"><a href="https://arxiv.org/abs/2512.08296" rel="noopener" target="_blank">[3]</a></sup>. After evaluating more than 260 software configurations, the researchers discovered a fascinating and contradictory (non-linear) behaviour:',
    t123: 'If a task is highly <strong>parallelisable</strong>, deploying a massive system of coordinated multi-agents boosts success by <strong>+80.8%</strong>. But if the task is strictly <strong>sequential</strong>, using multi-agents degrades performance by between <strong>−39%</strong> and <strong>−70%</strong> because of bottlenecks and communication chaos. On sequential tasks, a single agent is decisively better.',
    t124: 'What is a parallelisable task?',
    t125: 'A task is <em>parallelisable</em> when it can be broken down into independent subtasks: none of them needs another’s result in order to start, so they can all be solved at the same time and the results combined at the end. The total time stops being the sum of the steps and becomes, roughly, that of the slowest step.',
    t126: '<strong>Example: financial operations.</strong> Suppose a fund asks an agent to evaluate a portfolio of 50 companies before the market closes. Analysing each company (reading its balance sheet, computing cash flow, estimating risk) does not depend at all on what happens with the other 49: valuing an airline does not need the result of valuing a bank. A multi-agent system can launch 50 sub-agents at once, each with its own company, plus a coordinator that finally aggregates everything into a single portfolio report. Where a single agent would take 50 consecutive analyses, the system finishes in the time of one: that is why multi-agents boost success on this kind of task.',
    t127: 'What is a sequential task?',
    t128: 'A task is <em>sequential</em> when each step depends on the result of the previous one: there is a chain of dependencies that imposes a strict order, and no step can begin until the one before it finishes. Adding more agents speeds up nothing, because they would all be waiting for the same intermediate result; they only add noise and coordination costs.',
    t129: '<strong>Example: crafting in Minecraft.</strong> The <em>Plancraft</em><sup class="ref"><a href="https://arxiv.org/abs/2412.21033" rel="noopener" target="_blank">[4]</a></sup> paper (University of Edinburgh) evaluates LLM agents on precisely this kind of task, using Minecraft’s crafting interface. To craft a <em>green bed</em>, the agent must first smelt the cactus to obtain green dye; only with the dye in hand can it move it into the crafting grid along with the white bed; and only then can it craft the green bed. It is impossible to dye the bed before having the dye: recipes chain dependencies (a bed requires planks, and planks require wood), which the paper represents as a tree where each node needs its children solved first. Putting 50 agents to “help” does not produce the dye any faster: the plan is a chain, and a chain is walked one link at a time.',
    t130: 'We model this scenario as a logical XOR gate (exclusive OR), to predict whether an architecture will succeed ($1$) or fail ($0$) given two inputs:',
    t131: '<span class="sym">$x_1$</span> (nature of the task): $1$ if it is parallelisable, $0$ if it is sequential.',
    t132: '<span class="sym">$x_2$</span> (infrastructure): $1$ if it is multi-agent, $0$ if it is a single agent.',
    t133: 'Success $y$',
    t134: 'Real-world scenario',
    t135: 'Sequential + single agent: nimble and optimal.',
    t136: 'Sequential + multi-agent: chaos and collapse.',
    t137: 'Parallelisable + single agent: wasted resources.',
    t138: 'Parallelisable + multi-agent: perfect coordination.',
    t139: 'XOR gate',
    t140: 'no straight line separates the successes from the failures',
    t141: 'If we try to tune the parameters of a <em>single</em> neuron to solve this, we hit a wall. To separate the successes — the points $[0,0]$ and $[1,1]$ — from the failures — $[0,1]$ and $[1,0]$ — we would need a straight line, and it turns out to be geometrically impossible! There is no straight line capable of segmenting this crossed pattern (the dashed red line tries, and always leaves one point on the wrong side).',
    t142: 'This limitation of a single neuron for solving non-linear problems such as XOR has been formally known since 1969. The milestone illustrated forcefully the need to <em>combine multiple neurons into a network</em> in order to model truly complex knowledge.',
    t143: 'Page 6 of 9',
    t144: '&larr; AND and OR',
    t145: 'Networks and activation &rarr;',

    /* ---------- Page 7 · Layers and activations ---------- */
    t146: 'Page 7',
    t147: 'Solving the problem: complex networks and activation functions',
    t148: 'The solution to the agents’ XOR dilemma is, in hindsight, very elegant: we need to <em>duplicate and chain</em> our neurons. If we place several neurons in the same column (a <em>hidden layer</em>), we now have multiple independent lines acting in the space at once. By combining the conclusions of those intermediate lines through a neuron in the output layer, we generate two separators that together isolate both classes correctly. This is the demonstration of how, by adding neurons, we begin to model hierarchical and abstract information.',
    t149: 'The layered structure',
    t150: 'Each neuron in the hidden layer traces its own line. One draws the boundary $2x_1 + 2x_2 - 1 = 0$ and the other $2x_1 + 2x_2 - 3 = 0$: two parallel lines leaving a strip in between. The output neuron combines both and declares “success” only for the points that fall <em>outside</em> that strip, achieving what a single line could not.',
    t151: 'XOR solved with two neurons',
    t152: 'However, for this chaining to be effective and not suffer the linear collapse we saw earlier (where the sum of lines simply collapses into another line), we need the last critical component: the <em>non-linear activation function</em>.',
    t153: 'Instead of a rigid threshold that cuts abruptly, we pass the weighted sum ($z$) through a non-linear activation function, whose job is to distort, bend and deform the plane. It is the mathematical equivalent of doing <em>origami</em> with the data: we fold the paper of the chart so that a single final straight line manages to separate the crossed success and failure points.',
    t154: 'The most widely used activation functions',
    t155: 'Sigmoid',
    t156: 'squashes z into the range (0, 1) — a probability',
    t157: 'ReLU',
    t158: 'linear if z &gt; 0; zero if z ≤ 0',
    t159: 'The <em>sigmoid</em> is fantastic because its output can be read directly as a probability of success. The <em>ReLU</em> (rectified linear unit) has the huge practical advantage of letting networks train and converge far faster on our servers.',
    t160: 'The sigmoid in three dimensions',
    t161: 'To close, let us look at the sigmoid in three dimensions. Applied to the weighted sum $z = w_1 x_1 + w_2 x_2 + b$, it turns the tilted plane into a smooth surface shaped like a curved step: on one side it saturates near $0$ and on the other near $1$, with a continuous transition in between. That curvature is exactly what lets us separate the gates: instead of a straight, abrupt cut like the threshold’s, we get a <em>smooth, deformable boundary</em> which, chained across layers, can wrap around the crossed XOR points.',
    t163: 'The sigmoid surface over the (x₁, x₂) plane and how it curves the decision boundary.',
    t164: 'With this the architecture is complete: neurons that compute weighted sums, organised in layers, with non-linear activations in between. But so far <em>we</em> have chosen the weights by hand, by looking at the picture. The real magic of machine learning is that the network finds them on its own. How? That is the subject of the next page.',
    t165: 'Page 7 of 9',
    t166: '&larr; The XOR paradox',
    t167: 'Backpropagation &rarr;',
    /* ---------- Page 8 · Backpropagation ---------- */
    t168: 'Page 8',
    t169: 'Scaling up learning: the backpropagation algorithm',
    t170: 'Once we decide to interconnect hundreds of neurons across multiple hidden layers to form a deep neural network (<em>deep learning</em>), we face the ultimate problem: how do we get the network to self-adjust the millions of weights and biases in its guts completely autonomously from the data? The algorithm we used for a single neuron did not extend to multi-layer networks, which left us in the dark for over 15 years, in the so-called <em>AI winter</em>.',
    t171: 'Fortunately, in 1986, <strong>Rumelhart, Hinton and Williams</strong><sup class="ref"><a href="https://www.nature.com/articles/323533a0" rel="noopener" target="_blank">[5]</a></sup> published the paper that would change the fate of the discipline: they showed how, with a new optimisation algorithm, a multi-layer network could self-adjust all its parameters iteratively and efficiently. That technique is <strong>backpropagation</strong> (backward propagation of errors).',
    t172: 'From the simple gradient to the gradient of a network',
    t173: 'When we worked with linear regression, obtaining the gradient vector was straightforward: we only had to answer how the cost varied when each parameter $w$ changed. That is, the <em>partial derivative</em> of the cost function with respect to each parameter:',
    t174: 'In a neural network, however, the gradient is far more complex, because each parameter affects the rest, creating a <em>chain of responsibilities</em>. To untangle it we will use an algorithm that gives us exactly the value we are after: <strong>backpropagation</strong>. We will use it to compute the gradient vector inside the complexity of this network.',
    t175: 'The intuition: whose fault is it?',
    t176: 'To understand it without drowning in notation, let us picture the network as an <em>assembly line</em>: each layer receives parts from the previous one, transforms them and passes them on to the next. One day the product comes out defective: the network predicted badly, and that error is detected at the end of the line. The question we must answer to fix the factory is: which station was at fault, and how much?',
    t177: 'Backpropagation distributes the “blame” by operating recursively <em>backwards</em>, from the output error towards the initial layers, penalising the neuron with the greatest responsibility more strongly, and thereby also learning how much we should change its parameters. We call that responsibility value the neuron’s error ($\\delta$).',
    t178: 'Distributing responsibility in the last layer',
    t179: 'the thickness of the arrow and the size of the node grow with the “blame”',
    t180: 'Once the errors in this layer have been assigned, we move to the previous layer and repeat the same process. Recursively, we walk through every layer: we move the error backwards until we reach the first one, having obtained the error of each neuron and of each of its parameters, and all of it <em>by propagating the error backwards just once</em>.',
    t181: 'From errors to the gradient vector',
    t182: 'To measure how much each weight contributed, backpropagation relies on the <em>chain rule</em>: since the network is an enormous composition of chained functions, the derivative is obtained by multiplying the partial derivatives of each link.',
    t183: 'We will use these errors to compute the partial derivatives of every parameter in the network, thereby forming the <em>gradient vector</em>, which is exactly what we need in order to minimise the error and train the network.',
    t184: 'Gradient descent',
    t185: 'With the gradient vector in hand, <em>gradient descent</em> updates each parameter by subtracting a fraction of the gradient, regulated by the learning rate ($\\alpha$), always in the direction that reduces the error the most. It is like walking down a mountain of cost step by step towards its valley:',
    t186: 'Descending the error surface',
    t187: 'each step goes down in the direction opposite to the gradient',
    t188: 'Repeated thousands of times over the data, this loop gradually sculpts the weights until the network predicts accurately.',
    t189: 'This is how the network finds its parameters: the gradient does all the work. And with that the story is complete. All that is left is the conclusion.',
    t190: 'Page 8 of 9',
    t191: '&larr; Networks and activation',
    t192: 'Conclusion &rarr;',

    /* ---------- Page 9 · Conclusion ---------- */
    t193: 'Page 9',
    t194: 'Conclusion',
    t195: 'Looking back, everything we used was the following:',
    t196: '<strong>A line and a way to measure error</strong> (pages 1 and 2) — we started from the real Scaling Laws data and modelled it with the simplest thing there is: $\\hat{y} = w \\cdot x + b$. To decide which line was best we defined the mean squared error, and that changed everything: modelling stopped being drawing by eye and became <em>minimising a function</em>.',
    t197: '<strong>More dimensions</strong> (page 3) — reality almost never depends on a single variable, so the line became a plane and the arithmetic became matrices: $Y = XW$. Differentiating the cost with respect to the parameters and setting it to zero gave us the least-squares formula, and also showed us its limit: outside linear regression that closed form does not always exist, and an iterative method is needed.',
    t198: '<strong>A neuron</strong> (pages 4 and 5) — that same weighted sum, with a bias and a threshold on top, turned out to be the perceptron. By choosing three numbers by hand we made it compute the AND and OR gates: in the plane, its line separates the successful combinations from the failing ones.',
    t199: '<strong>A geometric limit</strong> (page 6) — DeepMind and MIT’s multi-agent finding has the shape of an XOR, and no straight line can separate that crossed pattern. A single neuron is not enough. This limitation has been known since 1969, and for years it held back the entire field.',
    t200: '<strong>Layers and activation functions</strong> (page 7) — with two neurons in a hidden layer there are two lines acting at once, and by passing each sum through a non-linear function (the sigmoid, the ReLU) the boundaries curve and combine. Together they separate what a single line could not: XOR solved.',
    t201: '<strong>An algorithm for learning</strong> (page 8) — so that the network tunes its millions of parameters on its own, backpropagation distributes the blame for the error backwards using the chain rule and assembles the gradient vector $\\nabla C$. Gradient descent does the rest: $\\theta := \\theta - \\alpha\\,\\nabla C$, one small step downhill after another. Repeated thousands of times, that is what training is.',
    t202: 'That is a neural network. The giant systems that motivated this project — LLMs, agents that program by themselves — are this same idea repeated at an unimaginable scale: more inputs, more neurons, more layers. But inside there is nothing more mysterious than what we have seen: weighted sums, functions that curve and derivatives that hand out responsibility.',
    t203: 'The whole edifice rests on the mathematics of this course: partial derivatives, the chain rule and a humble procedure that insists on being a little less wrong at every step. You do not need more than that to start understanding what is coming.',
    t204: 'References',
    t205: 'The findings that motivated each page, with their paper and source:',
    t206: 'Finding',
    t207: 'Paper',
    t208: 'Source',
    t209: 'Page 9 of 9',
    t210: '&larr; Backpropagation',
    t211: 'Back to the cover &#8635;',

    /* ---------- Strings not present in the HTML (charts, UI chrome) ---------- */
    docTitle: 'The evolution of agents and neural networks',
    docDesc: 'The evolution of agents and neural networks: an exploration using the tools of Calculus II.',
    chartXLabel: 'training compute (PF-days)',
    chartError: 'Error (MSE) = ',
    layerPrev: 'LAYER N−1',
    layerCurr: 'LAYER N',
    layerNext: 'LAYER N+1',
    layerInput: 'INPUT',
    layerHidden: 'HIDDEN',
    layerOutput: 'OUTPUT',
    respHidden: 'hidden layer',
    respOutput: 'output',
    respInput: 'input',
    respError: 'error',
    pagerLabel: 'Pages',
    langLabel: 'Language',
  };

  /* Spanish strings that do not live in the HTML (chart labels, chrome). */
  var ES_EXTRA = {
    docTitle: 'La evolución de los agentes y las redes neuronales',
    docDesc: 'La evolución de los agentes y las redes neuronales: una exploración con herramientas de Análisis Matemático 2.',
    chartXLabel: 'cómputo de entrenamiento (PF-days)',
    chartError: 'Error (MSE) = ',
    layerPrev: 'CAPA N−1',
    layerCurr: 'CAPA N',
    layerNext: 'CAPA N+1',
    layerInput: 'ENTRADA',
    layerHidden: 'OCULTAS',
    layerOutput: 'SALIDA',
    respHidden: 'capa oculta',
    respOutput: 'salida',
    respInput: 'entrada',
    respError: 'error',
    pagerLabel: 'Páginas',
    langLabel: 'Idioma',
  };

  /* ---------- Current language ---------- */
  function stored() {
    try { return window.localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  var lang = stored() === 'es' || stored() === 'en' ? stored() : DEFAULT_LANG;

  /** Translate a key that is not bound to a DOM node (charts, labels). */
  function t(key) {
    if (lang === 'en') return EN[key] !== undefined ? EN[key] : ES_EXTRA[key];
    return ES_EXTRA[key] !== undefined ? ES_EXTRA[key] : EN[key];
  }

  /** Apply the dictionary to every [data-i18n] node. The HTML source is
      Spanish, so there is nothing to do when the language is Spanish. */
  function apply() {
    document.documentElement.setAttribute('lang', lang);
    document.title = t('docTitle');
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('docDesc'));
    if (lang !== 'en') return;
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (EN[key] !== undefined) nodes[i].innerHTML = EN[key];
    }
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-aria-label');
      if (EN[key] !== undefined) node.setAttribute('aria-label', EN[key]);
    });
    // Si MathJax ya compuso la página, volvemos a componer el texto nuevo.
    if (window.MathJax && window.MathJax.typesetPromise && window.MathJax.startup && window.MathJax.startup.document) {
      window.MathJax.typesetPromise().catch(function () {});
    }
  }

  /** Switch language: remember the choice, keep the current page and reload,
      so that canvases, SVG labels and generated tables are rebuilt too. */
  function setLang(next) {
    if (next !== 'es' && next !== 'en') return;
    try { window.localStorage.setItem(STORE_KEY, next); } catch (e) {}
    var activa = document.querySelector('.screen.is-active');
    var id = activa ? activa.id : '';
    window.location.hash = id && id !== 'splash' ? id : '';
    window.location.reload();
  }

  /* ---------- Language switch on every page bar ---------- */
  function buildSwitches() {
    // Portada: los enlaces Español / English ya existen en el HTML.
    var linksPortada = document.querySelectorAll('.splash__lang');
    for (var i = 0; i < linksPortada.length; i++) {
      (function (a) {
        var code = (a.getAttribute('href') || '').indexOf('en') > -1 ? 'en' : 'es';
        a.classList.toggle('is-current', code === lang);
        a.addEventListener('click', function (e) {
          e.preventDefault();
          setLang(code);
        });
      })(linksPortada[i]);
    }
    // Resto de las páginas: se inyecta el selector en la barra superior.
    var barras = document.querySelectorAll('.page__bar');
    for (var j = 0; j < barras.length; j++) {
      var sw = document.createElement('div');
      sw.className = 'lang-switch';
      sw.setAttribute('aria-label', t('langLabel'));
      ['es', 'en'].forEach(function (code) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'lang-switch__btn' + (code === lang ? ' is-current' : '');
        b.textContent = code.toUpperCase();
        b.addEventListener('click', function () { setLang(code); });
        sw.appendChild(b);
      });
      var home = barras[j].querySelector('.page__home');
      if (home) barras[j].insertBefore(sw, home);
      else barras[j].appendChild(sw);
    }
  }

  /* ---------- Numbered pager (1 … N) available on every page ---------- */
  function buildPager() {
    var paginas = [];
    var secs = document.querySelectorAll('.screen');
    for (var i = 0; i < secs.length; i++) {
      if (/^cap\d+$/.test(secs[i].id)) paginas.push(secs[i].id);
    }
    if (!paginas.length) return;
    paginas.sort(function (a, b) {
      return parseInt(a.replace('cap', ''), 10) - parseInt(b.replace('cap', ''), 10);
    });

    function pagerPara(idActual) {
      var nav = document.createElement('nav');
      nav.className = 'pager';
      nav.setAttribute('aria-label', t('pagerLabel'));
      paginas.forEach(function (id, idx) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pager__btn' + (id === idActual ? ' is-current' : '');
        b.textContent = String(idx + 1);
        b.setAttribute('data-goto', id);          // lo maneja app.js
        b.setAttribute('aria-label', t('pagerLabel') + ' ' + (idx + 1));
        if (id === idActual) b.setAttribute('aria-current', 'page');
        nav.appendChild(b);
      });
      return nav;
    }

    for (var k = 0; k < secs.length; k++) {
      var sec = secs[k];
      if (sec.id === 'splash') continue;
      var ancla = sec.querySelector('.doc-progress') || sec.querySelector('.page__nav');
      if (!ancla) continue;
      var nav = pagerPara(sec.id);
      if (ancla.classList.contains('doc-progress')) {
        ancla.parentNode.insertBefore(nav, ancla.nextSibling);
      } else {
        ancla.parentNode.insertBefore(nav, ancla);
      }
    }
  }

  /* ---------- Public API (used by app.js for chart labels) ---------- */
  window.I18N = { lang: lang, t: t, setLang: setLang };

  apply();
  buildSwitches();
  buildPager();
})();
