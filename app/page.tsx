"use client";

import { useState } from "react";

type ModuleKey = "supervisor" | "landing" | "content" | "automation" | "quality";
type ScenarioKey = "launch" | "content" | "routine";

const modules: Record<
  ModuleKey,
  {
    number: string;
    title: string;
    short: string;
    description: string;
    receives: string;
    returns: string;
    accent: string;
  }
> = {
  supervisor: {
    number: "00",
    title: "Главный координатор",
    short: "Понимает задачу и собирает рабочую цепочку",
    description:
      "Принимает запрос бизнеса, уточняет критичные данные и передаёт работу нужным специализированным агентам. Сводит их результаты в один понятный итог.",
    receives: "Цель, исходные материалы, ограничения",
    returns: "Маршрут задачи и согласованный результат",
    accent: "violet",
  },
  landing: {
    number: "01",
    title: "Лендинг под ключ",
    short: "От брифа до проверенного прототипа страницы",
    description:
      "Проектирует структуру, тексты, действия посетителя, мобильную логику и требования к публикации. Неподтверждённые сведения отмечает для уточнения.",
    receives: "Бриф, факты о компании, предложение",
    returns: "Прототип лендинга и перечень проверок",
    accent: "lime",
  },
  content: {
    number: "02",
    title: "Контент-система",
    short: "Превращает факты бизнеса в связную коммуникацию",
    description:
      "Формирует темы, рубрики и материалы в едином стиле. Один исходный смысл адаптируется под разные форматы без потери фактов и голоса бренда.",
    receives: "Продукт, аудитория, площадка, тон",
    returns: "План и готовые материалы на согласование",
    accent: "cyan",
  },
  automation: {
    number: "03",
    title: "Автоматизация процессов",
    short: "Связывает повторяющиеся действия в управляемый поток",
    description:
      "Разбирает рабочий процесс на события, решения и действия. Проектирует места интеграций и обязательные точки человеческого контроля.",
    receives: "Текущий процесс, системы, правила",
    returns: "Схема автоматизации и сценарий проверки",
    accent: "orange",
  },
  quality: {
    number: "04",
    title: "Контур качества",
    short: "Проверяет факты, границы роли и готовность результата",
    description:
      "Единый защитный и проверочный слой работает внутри каждого агента. Он выявляет пробелы, противоречия и рискованные допущения до передачи результата.",
    receives: "Черновик, требования, подтверждения",
    returns: "Статус проверки и конкретные исправления",
    accent: "rose",
  },
};

const scenarios: Record<
  ScenarioKey,
  {
    label: string;
    title: string;
    intro: string;
    steps: { tag: string; title: string; text: string; owner: string }[];
    result: string[];
  }
> = {
  launch: {
    label: "Запуск лендинга",
    title: "Компания хочет быстро проверить новое предложение",
    intro:
      "Из разрозненного брифа — в прозрачный прототип, где видно, что уже готово, а что требует подтверждения.",
    steps: [
      {
        tag: "01 · Вход",
        title: "Координатор разбирает задачу",
        text: "Выделяет цель страницы, аудиторию, предложение и недостающие данные.",
        owner: "Главный координатор",
      },
      {
        tag: "02 · Сборка",
        title: "Агент создаёт структуру",
        text: "Проектирует первый экран, смысловые блоки, кнопки действия и мобильный путь.",
        owner: "Лендинг под ключ",
      },
      {
        tag: "03 · Контроль",
        title: "Контур качества проверяет",
        text: "Отделяет подтверждённые факты от допущений и формирует перечень уточнений.",
        owner: "Контур качества",
      },
    ],
    result: ["Прототип страницы", "Список [УТОЧНИТЬ]", "Проверка перед публикацией"],
  },
  content: {
    label: "Контент на месяц",
    title: "Бизнесу нужна регулярная коммуникация без смысловых повторов",
    intro:
      "Одна продуктовая база превращается в систему тем и материалов, связанных с реальными задачами аудитории.",
    steps: [
      {
        tag: "01 · Контекст",
        title: "Координатор фиксирует рамки",
        text: "Сверяет цели, площадки, ограничения, частоту публикаций и стиль общения.",
        owner: "Главный координатор",
      },
      {
        tag: "02 · Производство",
        title: "Система разворачивает темы",
        text: "Собирает рубрики и адаптирует один смысл под разные форматы и этапы выбора.",
        owner: "Контент-система",
      },
      {
        tag: "03 · Проверка",
        title: "Факты проходят контроль",
        text: "Спорные обещания и неподтверждённые цифры возвращаются на уточнение.",
        owner: "Контур качества",
      },
    ],
    result: ["Матрица тем", "Пакет черновиков", "Очередь согласования"],
  },
  routine: {
    label: "Автоматизация рутины",
    title: "Команда теряет заявки между таблицами и перепиской",
    intro:
      "Процесс сначала становится видимым, затем — управляемым: с понятными событиями, проверками и ответственными.",
    steps: [
      {
        tag: "01 · Разбор",
        title: "Координатор ставит границы",
        text: "Фиксирует, где начинается задача, кто принимает решения и что считается завершением.",
        owner: "Главный координатор",
      },
      {
        tag: "02 · Проектирование",
        title: "Агент строит рабочий поток",
        text: "Связывает события, данные, действия и точки обязательного участия сотрудника.",
        owner: "Автоматизация процессов",
      },
      {
        tag: "03 · Испытание",
        title: "Пограничные случаи проверяются",
        text: "Сценарий проходит на неполных данных, дублях, задержках и ошибочных входах.",
        owner: "Контур качества",
      },
    ],
    result: ["Карта процесса", "Точки интеграций", "Сценарий испытания"],
  },
};

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="arrow-icon">
    <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("supervisor");
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("launch");
  const selected = modules[activeModule];
  const scenario = scenarios[activeScenario];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AIIrkutsk — на главную">
          <span className="brand-mark">AI</span>
          <span>AIIrkutsk</span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#ecosystem">Экосистема</a>
          <a href="#scenarios">Сценарии</a>
        </nav>
        <a className="header-cta" href="#scenarios">
          Как это работает <Arrow />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Архитектура для бизнеса</p>
          <h1>
            Не набор помощников.
            <span>Единая система работы.</span>
          </h1>
          <p className="hero-lead">
            AIIrkutsk объединяет специализированных ИИ-агентов вокруг главного
            координатора — от лендинга и контента до автоматизации и проверки качества.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#ecosystem">Исследовать систему <Arrow /></a>
            <a className="text-link" href="#scenarios">Посмотреть сценарии <span>↓</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Краткая схема экосистемы">
          <div className="signal signal-one" />
          <div className="signal signal-two" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="core">
            <span className="core-kicker">SUPERVISOR</span>
            <strong>AII</strong>
            <small>Главный<br />координатор</small>
          </div>
          <span className="satellite sat-one">Лендинги</span>
          <span className="satellite sat-two">Контент</span>
          <span className="satellite sat-three">Процессы</span>
          <span className="satellite sat-four">Контроль</span>
        </div>
        <div className="hero-proof" aria-label="Основные свойства">
          <div><strong>01</strong><span>Единая точка входа</span></div>
          <div><strong>04</strong><span>Специализированных модуля</span></div>
          <div><strong>01→N</strong><span>Масштабирование новыми агентами</span></div>
        </div>
      </section>

      <section className="ecosystem section-shell" id="ecosystem">
        <div className="section-heading">
          <p className="eyebrow dark"><span /> Карта экосистемы</p>
          <h2>Каждый агент знает свою работу.<br />Координатор держит целое.</h2>
          <p>Выберите модуль на схеме, чтобы увидеть его роль, входные данные и результат.</p>
        </div>

        <div className="system-grid">
          <div className="module-map" role="group" aria-label="Модули экосистемы">
            <div className="map-row map-supervisor">
              <button
                className={`module-node node-supervisor ${activeModule === "supervisor" ? "active" : ""}`}
                onClick={() => setActiveModule("supervisor")}
                aria-pressed={activeModule === "supervisor"}
              >
                <span>00</span><strong>Главный<br />координатор</strong><i>Маршрутизация</i>
              </button>
            </div>
            <div className="map-connector" aria-hidden="true"><span /><span /><span /><span /></div>
            <div className="map-row map-agents">
              {(["landing", "content", "automation", "quality"] as ModuleKey[]).map((key) => (
                <button
                  key={key}
                  className={`module-node ${modules[key].accent} ${activeModule === key ? "active" : ""}`}
                  onClick={() => setActiveModule(key)}
                  aria-pressed={activeModule === key}
                >
                  <span>{modules[key].number}</span>
                  <strong>{modules[key].title}</strong>
                  <i>{key === "landing" ? "Проектирование" : key === "content" ? "Коммуникация" : key === "automation" ? "Оркестрация" : "Проверка"}</i>
                </button>
              ))}
            </div>
          </div>

          <aside className={`module-detail accent-${selected.accent}`} aria-live="polite">
            <div className="detail-top">
              <span className="detail-number">{selected.number}</span>
              <span className="live-label"><i /> выбранный модуль</span>
            </div>
            <h3>{selected.title}</h3>
            <p className="detail-short">{selected.short}</p>
            <p className="detail-description">{selected.description}</p>
            <dl>
              <div><dt>Получает</dt><dd>{selected.receives}</dd></div>
              <div><dt>Возвращает</dt><dd>{selected.returns}</dd></div>
            </dl>
          </aside>
        </div>

        <div className="principles" aria-label="Принципы архитектуры">
          <article><span>↗</span><div><h3>Автономность</h3><p>Каждый агент сохраняет собственную рабочую логику и контур проверки.</p></div></article>
          <article><span>⌘</span><div><h3>Координация</h3><p>Сложная задача делится между модулями, но возвращается единым результатом.</p></div></article>
          <article><span>✓</span><div><h3>Проверяемость</h3><p>Факты, пробелы и решения видны до запуска — без скрытых допущений.</p></div></article>
        </div>
      </section>

      <section className="scenarios" id="scenarios">
        <div className="section-shell">
          <div className="section-heading light">
            <p className="eyebrow"><span /> Сценарии работы</p>
            <h2>От запроса к результату —<br />без потери контекста.</h2>
          </div>

          <div className="scenario-tabs" role="tablist" aria-label="Выбор сценария">
            {(Object.keys(scenarios) as ScenarioKey[]).map((key, index) => (
              <button
                key={key}
                role="tab"
                aria-selected={activeScenario === key}
                onClick={() => setActiveScenario(key)}
                className={activeScenario === key ? "active" : ""}
              >
                <span>0{index + 1}</span>{scenarios[key].label}
              </button>
            ))}
          </div>

          <div className="scenario-intro" aria-live="polite">
            <div>
              <p>Задача бизнеса</p>
              <h3>{scenario.title}</h3>
            </div>
            <p>{scenario.intro}</p>
          </div>

          <div className="flow">
            {scenario.steps.map((step, index) => (
              <article className="flow-step" key={step.tag}>
                <div className="flow-index"><span>{step.tag}</span><i>{index < 2 ? "→" : "✓"}</i></div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
                <small>{step.owner}</small>
              </article>
            ))}
            <article className="flow-result">
              <span>Результат</span>
              <ul>
                {scenario.result.map((item) => <li key={item}><i>✓</i>{item}</li>)}
              </ul>
            </article>
          </div>

          <div className="closing-card">
            <div>
              <p className="eyebrow"><span /> AIIrkutsk</p>
              <h2>Одна экосистема.<br />Много решённых задач.</h2>
            </div>
            <div>
              <p>Архитектура растёт вместе с бизнесом: новый агент подключается как отдельный модуль, не разрушая общую систему.</p>
              <a href="#ecosystem">Вернуться к карте <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark">AI</span><span>AIIrkutsk</span></a>
        <p>Демонстрация архитектуры экосистемы ИИ-агентов</p>
        <a href="#top">Наверх ↑</a>
      </footer>
    </main>
  );
}
