// クイズデータ（全6問・4択）
// 各選択肢に、加算される性格特性（スコア）を紐付けています
const questions = [
    {
        question: "Q1. 休日、急に予定が空いたときのあなたの行動は？",
        choices: [
            { text: "1人で気になっていた場所へ出かけたり趣味に没頭する", scores: ["violin"] }, // 単独行動・芸術家
            { text: "事前に決めておいた『いつかやりたいことリスト』を消化する", scores: ["cello", "percussion"] }, // 計画的
            { text: "誰かを誘うか、みんなが集まる賑やかな場所へ行く", scores: ["trombone"] }, // 社交的・メンタル
            { text: "特に何もせず、その時の気分で家でゴロゴロ過ごす", scores: ["clarinet", "horn"] } // マイペース
        ]
    },
    {
        question: "Q2. 何か新しいプロジェクトや勉強を始めるときの手順は？",
        choices: [
            { text: "最終ゴールから逆算して、きっちり計画を立ててから進める", scores: ["cello", "percussion"] }, // 計画的・論理
            { text: "効率的な進め方をじっくり考えてから、要領よくこなす", scores: ["clarinet", "trombone"] }, // 器用
            { text: "細かいことは気にせず、自分のこだわりを詰め込みながら進める", scores: ["violin"] }, // 芸術家肌
            { text: "周りの困っている人を手伝いながら、みんなで一緒に進める", scores: ["horn"] } // おかん気質
        ]
    },
    {
        question: "Q3. 大勢の前で発表する直前や、大切な本番前のあなたの心境は？",
        choices: [
            { text: "「まぁ、なるようになるさ」とワクワク・緊張を楽しめる", scores: ["trombone", "percussion"] }, // メンタル強い
            { text: "「失敗したらどうしよう」と心臓がバクバクしてかなり緊張する", scores: ["violin"] }, // 繊細・芸術家
            { text: "緊張はするが、シミュレーション通りに進めようと冷静でいる", scores: ["cello"] }, // 論理的・計画的
            { text: "いつも通り自分のペースを崩さず、リラックスして臨む", scores: ["clarinet", "horn"] } // マイペース
        ]
    },
    {
        question: "Q4. 友人が理不尽な理由でひどく落ち込んでいるとき、どう声をかける？",
        choices: [
            { text: "「それは大変だったね」と味方になり、お菓子やご飯を差し入れる", scores: ["horn"] }, // おかん気質
            { text: "なぜそうなったのか理由を分析し、具体的な解決策を提案する", scores: ["cello"] }, // 論理的
            { text: "相手の気持ちにとことん共感して、自分のことのように一緒に悩む", scores: ["violin"] }, // 芸術家肌（感受性）
            { text: "「美味しいものでも食べて忘れよう！」とポジティブに励ます", scores: ["clarinet", "trombone", "percussion"] } // 器用・メンタル
        ]
    },
    {
        question: "Q5. 変化の激しい環境や、急な予定変更が起きたとき、あなたはどうなる？",
        choices: [
            { text: "持ち前の要領の良さで、その場の状況にサッと柔軟に適応する", scores: ["clarinet", "trombone"] }, // 器用
            { text: "自分のやり方やペースを崩さず、じっくりマイペースに対処する", scores: ["violin", "horn"] }, // マイペース
            { text: "トラブルの原因を冷静に見極め、次の計画を立て直す", scores: ["cello"] }, // 論理的・計画的
            { text: "動じることなく「よし、任せろ」と腹をくくって立ち向かう", scores: ["percussion"] } // メンタル強い
        ]
    },
    {
        question: "Q6. モノを選んだり、新しいアイデアを出したりするときの基準は？",
        choices: [
            { text: "直感、デザイン、美しさ、自分だけのこだわりを最も重視する", scores: ["violin"] }, // 芸術家肌
            { text: "実用性、効率、コスパを徹底的に計算して決定する", scores: ["cello"] }, // 論理的
            { text: "他人の意見や世間のトレンドをバランスよく取り入れる", scores: ["clarinet", "horn"] }, // 器用・おかん
            { text: "インパクト、面白さ、または長く使える耐久性を重視する", scores: ["trombone", "percussion"] } // メンタル・計画
        ]
    }
];

// 診断結果のテキストデータ
const results = {
    violin: {
        name: "バイオリン",
        desc: "あなたの楽器は【バイオリン】です！独特の美意識を持つ芸術家肌で、1人の時間を愛するタイプ。オーケストラの華として圧倒的な存在感を放ちます。感受性が豊かでこだわりが強い反面、周囲の環境や人間関係の『湿気』に影響されやすい繊細さも。自分の世界を貫くことで最も輝きます。"
    },
    clarinet: {
        name: "クラリネット",
        desc: "あなたの楽器は【クラリネット】です！高い表現力と柔軟性を合わせ持つ、世渡り上手な器用人。どんなコミュニティにも自然に馴染めますが、内面は芯のあるマイペース派です。周囲に合わせつつも自分のペースを絶対に崩さない、大人の余裕を持っています。"
    },
    cello: {
        name: "チェロ",
        desc: "あなたの楽器は【チェロ】です！物事を一歩引いて見つめ、筋道を立てて行動できる論理的・計画的な人。感情に流されず冷静にベストな選択ができます。周囲からは『この人に任せれば安心』と厚い信頼を寄せられますが、たまには計画を忘れて直感で動いてみるのもアリです。"
    },
    horn: {
        name: "ホルン",
        desc: "あなたの楽器は【ホルン】です！周囲の調和を何よりも重んじ、困っている人を放っておけないおかん気質。ギネスに載るほど演奏が難しい楽器のように、一見掴みどころがないマイペースさもありますが、内面は包容力で満ちています。あなたの笑顔がみんなの安心材料です。"
    },
    trombone: {
        name: "トロンボーン",
        desc: "あなたの楽器は【トロンボーン】です！どんな逆境にも動じない最強のメンタルの持ち主。状況を素早く察知して動ける器用さも持ち合わせています。プレッシャーがかかる場面ほど本領を発揮し、チームの士気を一気に高める頼れる兄貴・姉御肌なポジションです。"
    },
    percussion: {
        name: "パーカッション（打楽器）",
        desc: "あなたの楽器は【パーカッション】です！一撃で全体の流れを変える度胸（強いメンタル）と、絶対にズレない緻密な計画性を併せ持つ人。本番にめちゃくちゃ強いタイプです。あなたがどっしり構えているだけで、周囲は安心して自分の実力を発揮できます。"
    }
};

// 状態管理変数
let currentQuestionIndex = 0;
let score = { violin: 0, clarinet: 0, cello: 0, horn: 0, trombone: 0, percussion: 0 };

// DOM要素の取得
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices-container");
const progressBar = document.getElementById("progress");
const instrumentResult = document.getElementById("instrument-result");
const resultDescription = document.getElementById("result-description");

// イベントリスナーの登録
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("retry-btn").addEventListener("click", resetQuiz);

// 診断開始
function startQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
}

// 質問の表示
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";

    // プログレスバーの更新
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // 4つの選択肢ボタンを生成
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.classList.add("choice-btn");
        button.addEventListener("click", () => selectAnswer(choice.scores));
        choicesContainer.appendChild(button);
    });
}

// 回答の選択とスコア加算
function selectAnswer(scores) {
    scores.forEach(instrument => {
        score[instrument]++;
    });

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 結果の判定と表示
function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    // 最もスコアが高い楽器を特定
    let highestInstrument = "violin";
    let maxScore = -1;

    for (const instrument in score) {
        if (score[instrument] > maxScore) {
            maxScore = score[instrument];
            highestInstrument = instrument;
        }
    }

    // 結果画面に反映
    instrumentResult.textContent = results[highestInstrument].name;
    resultDescription.textContent = results[highestInstrument].desc;
}

// リセット（もう一度診断）
function resetQuiz() {
    currentQuestionIndex = 0;
    score = { violin: 0, clarinet: 0, cello: 0, horn: 0, trombone: 0, percussion: 0 };
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}
