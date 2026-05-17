import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


const questions = [
  {
    id: 1,
    text: "グループで活動するとき、あなたに近いのは？",
    options: [
      { text: "自分の世界観を大切にしたい", instrument: "violin" },
      { text: "周りを見ながら柔軟に動きたい", instrument: "clarinet" },
      { text: "計画を立てて落ち着いて進めたい", instrument: "cello" },
      { text: "場を支える役割が好き", instrument: "horn" }
    ]
  },
  {
    id: 2,
    text: "初対面の人が多い場では？",
    options: [
      "自分から話しかける",
      "様子を見ながら合わせる",
      "必要なときに話す",
      "周りをサポートする"
    ]
  }
];

function App() {

  const [answers, setAnswers] = useState({});

  return (
    <div className="container">
      <header className="hero">
        <h1>オーケストラ楽器診断</h1>
        <p>6つの質問に答えて、あなたに合う楽器を診断します。</p>
      </header>

      <main>
        {questions.map((question) => (
          <section className="question-card" key={question.id}>
            <h2>Q{question.id}. {question.text}</h2>

            {question.options.map((option) => (
              <label key={option.text}>
                <input
                  type="radio"
                  name={`q${question.id}`}
                  value={option.instrument}
                  checked={answers[question.id] === option.instrument}
                  onChange={() =>
                    setAnswers({
                      ...answers,
                      [question.id]: option.instrument
                    })
                  }
                />
                {option.text}
              </label>
            ))}
          </section>
        ))}
        <pre>{JSON.stringify(answers, null, 2)}</pre>
        <button type="button">診断する</button>
      </main>
    </div>
  );
}

export default App;