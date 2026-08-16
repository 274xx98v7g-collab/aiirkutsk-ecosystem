"use client";

import { useState } from "react";

type ModuleKey = "supervisor" | "landing" | "content" | "automation" | "quality";
type ScenarioKey = "landing" | "content" | "automation";

const modules: Record<ModuleKey, {
  code: string;
  name: string;
  label: string;
  description: string;
  input: string;
  output: string;
}> = {
  supervisor: {
    code: "00",
    name: "Главный координатор",
    label: "Маршрутизация задач",
    description: "Понимает бизнес-задачу, определяет нужную цепочку агентов и объединяет их работу в один проверяемый результат.",
    input: "Цель, материалы, ограничения",
    output: "Рабочий маршрут и сводный результат",
  },
  landing: {
    code: "01",
    name: "Лендинг под ключ",
    label: "Сайты и предложения",
    description: "Проектирует структуру страницы, тексты, действия посетителя, мобильную логику и перечень проверок перед публикацией.",
    input: "Бриф и подтверждённые факты",
    output: "Прототип и список уточнений",
  },
  content: {
    code: "02",
    name: "Контент-система",
    label: "Регулярная коммуникация",
    description: "Разворачивает исходные материалы бизнеса в темы, рубрики и тексты для разных площадок в едином фирменном стиле.",
    input: "Продукт, аудитория, площадки",
    output: "План и материалы на согласование",
  },
  automation: {
    code: "03",
    name: "Автоматизация",
    label: "Управляемые процессы",
    description: "Разбирает рутину на события и действия, показывает точки интеграции и сохраняет человеческий контроль там, где он необходим.",
    input: "Текущий процесс и правила",
    output: "Схема потока и сценарий проверки",
  },
  quality: {
    code: "04",
    name: "Контур качества",
    label: "Проверка результата",
    description: "Выявляет неподтверждённые сведения, противоречия и пограничные случаи до передачи результата заказчику.",
    input: "Черновик и требования",
    output: "Статус проверки и исправления",
  },
};

const scenarios: Record<ScenarioKey, {
  code: string;
  tab: string;
  title: string;
  task: string;
  steps: { number: string; name: string; text: string; agent: string }[];
  results: string[];
}> = {
  landing: {
    code: "SCN-01",
    tab: "Запуск лендинга",
    title: "Новое предложение нужно быстро превратить в понятную страницу",
    task: "Компания передаёт бриф и подтверждённые сведения. Система собирает прототип и показывает, какие данные ещё нужны до публикации.",
    steps: [
      { number: "01", name: "Разбор задачи", text: "Цель, аудитория и ограничения фиксируются в едином контексте.", agent: "Координатор" },
      { number: "02", name: "Сборка страницы", text: "Проектируются структура, тексты, кнопки и мобильный путь.", agent: "Лендинг под ключ" },
      { number: "03", name: "Проверка", text: "Факты отделяются от допущений, пробелы возвращаются на уточнение.", agent: "Контур качества" },
    ],
    results: ["Прототип лендинга", "Перечень [УТОЧНИТЬ]", "Проверка перед публикацией"],
  },
  content: {
    code: "SCN-02",
    tab: "Контент-система",
    title: "Бизнесу нужен регулярный контент без повторов и потери смысла",
    task: "Одна база фактов превращается в связанную систему тем и материалов для разных площадок — с сохранением фирменного голоса.",
    steps: [
      { number: "01", name: "Настройка рамок", text: "Определяются площадки, аудитория, частота и стиль общения.", agent: "Координатор" },
      { number: "02", name: "Разворачивание тем", text: "Формируются рубрики и адаптации одного смысла под разные форматы.", agent: "Контент-система" },
      { number: "03", name: "Сверка фактов", text: "Обещания и цифры проходят проверку до согласования материалов.", agent: "Контур качества" },
    ],
    results: ["Матрица тем", "Пакет черновиков", "Очередь согласования"],
  },
  automation: {
    code: "SCN-03",
    tab: "Автоматизация",
    title: "Заявки теряются между таблицами, сообщениями и ручными действиями",
    task: "Процесс становится видимым: события, решения, интеграции и точки участия сотрудника собираются в одну управляемую схему.",
    steps: [
      { number: "01", name: "Карта процесса", text: "Фиксируются начало, участники, правила и критерий завершения.", agent: "Координатор" },
      { number: "02", name: "Рабочий поток", text: "События связываются с данными, действиями и точками контроля.", agent: "Автоматизация" },
      { number: "03", name: "Испытание", text: "Проверяются неполные данные, дубли, задержки и ошибочные входы.", agent: "Контур качества" },
    ],
    results: ["Карта процесса", "Точки интеграций", "Сценарий испытания"],
  },
};

function LineIcon({ type }: { type: ModuleKey }) {
  const paths: Record<ModuleKey, React.ReactNode> = {
    supervisor: <><circle cx="12" cy="12" r="3"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></>,
    landing: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 8h16M8 12h8M8 16h5"/></>,
    content: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
    automation: <><path d="M8 6h8M16 6l-2-2M16 6l-2 2M16 18H8M8 18l2-2M8 18l2 2"/><rect x="3" y="9" width="7" height="6" rx="1"/><rect x="14" y="9" width="7" height="6" rx="1"/></>,
    quality: <><path d="M12 3l7 3v5c0 4.6-2.8 8-7 10-4.2-2-7-5.4-7-10V6l7-3Z"/><path d="m9 12 2 2 4-5"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5"/></svg>;
}

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("supervisor");
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("landing");
  const selected = modules[activeModule];
  const scenario = scenarios[activeScenario];

  return (
    <main>
      <header className="topbar">
        <a className="logo" href="#top" aria-label="AIIRK — на главную">
          <span className="logo-star">✦</span>
          <strong>AI<span>IRK</span></strong>
        </a>
        <nav aria-label="Навигация">
          <a href="#ecosystem">Экосистема</a>
          <a href="#principles">Принципы</a>
          <a href="#scenarios">Сценарии</a>
        </nav>
        <a className="top-action" href="#ecosystem">Исследовать <Arrow /></a>
      </header>

      <section className="hero" id="top">
        <div className="grid-field" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker"><i /> ИИ для бизнеса Иркутска</p>
          <h1>Экосистема,<br />где <em>ИИ работает</em><br />на результат.</h1>
          <p className="hero-text">Специализированные ИИ-агенты объединены главным координатором: автоматизация, контент, лендинги и проверка качества — в одной управляемой системе.</p>
          <div className="hero-actions">
            <a className="neon-button" href="#ecosystem">Открыть архитектуру <Arrow /></a>
            <span className="microcopy"><i /> Интерактивная демонстрация</span>
          </div>
        </div>

        <div className="command-orb" aria-label="Схема центра управления AIIRK">
          <div className="orb-halo halo-1" />
          <div className="orb-halo halo-2" />
          <div className="orb-ring ring-1" />
          <div className="orb-ring ring-2" />
          <div className="orb-ring ring-3" />
          <div className="orb-core">
            <span>SUPERVISOR</span>
            <strong>AI</strong>
            <small>КООРДИНАТОР</small>
          </div>
          <span className="data-pill pill-1">LANDING <b>01</b></span>
          <span className="data-pill pill-2">CONTENT <b>02</b></span>
          <span className="data-pill pill-3">PROCESS <b>03</b></span>
          <span className="data-pill pill-4">QUALITY <b>04</b></span>
          <i className="spark s1"/><i className="spark s2"/><i className="spark s3"/>
        </div>

        <div className="hero-strip">
          <div><span>01</span><strong>Единая точка входа</strong><small>Один запрос — связная цепочка</small></div>
          <div><span>04</span><strong>Предметных модуля</strong><small>Каждый отвечает за свою часть</small></div>
          <div><span>✓</span><strong>Контур проверки</strong><small>Факты отделены от допущений</small></div>
        </div>
      </section>

      <section className="ecosystem shell" id="ecosystem">
        <div className="section-head">
          <div>
            <p className="kicker"><i /> Архитектура AIIRK</p>
            <h2>Пять модулей.<br /><em>Одна логика работы.</em></h2>
          </div>
          <p>Нажмите на узел системы: справа появятся его задача, входные данные и ожидаемый результат.</p>
        </div>

        <div className="architecture">
          <div className="module-console" role="group" aria-label="Модули экосистемы">
            <div className="console-label"><span>СХЕМА СИСТЕМЫ</span><b>ONLINE</b></div>
            <div className="nodes">
              {(Object.keys(modules) as ModuleKey[]).map((key, index) => (
                <button
                  key={key}
                  className={`node node-${index} ${activeModule === key ? "active" : ""}`}
                  onClick={() => setActiveModule(key)}
                  aria-pressed={activeModule === key}
                >
                  <LineIcon type={key}/>
                  <span>{modules[key].code}</span>
                  <strong>{modules[key].name}</strong>
                  <small>{modules[key].label}</small>
                </button>
              ))}
              <div className="trace trace-a"/><div className="trace trace-b"/><div className="trace trace-c"/><div className="trace trace-d"/>
            </div>
          </div>

          <aside className="module-readout" aria-live="polite">
            <div className="readout-top"><span>MODULE / {selected.code}</span><i>● ACTIVE</i></div>
            <div className="readout-icon"><LineIcon type={activeModule}/></div>
            <p className="readout-label">{selected.label}</p>
            <h3>{selected.name}</h3>
            <p className="readout-desc">{selected.description}</p>
            <dl>
              <div><dt>ВХОД</dt><dd>{selected.input}</dd></div>
              <div><dt>РЕЗУЛЬТАТ</dt><dd>{selected.output}</dd></div>
            </dl>
            <div className="readout-progress"><span>ГОТОВНОСТЬ МОДУЛЯ</span><i><b /></i><em>READY</em></div>
          </aside>
        </div>

        <div className="principles" id="principles">
          <article><span>01</span><LineIcon type="quality"/><div><h3>Встроенная проверка</h3><p>Каждый агент сохраняет собственный контур качества и не зависит от внешнего контроля.</p></div></article>
          <article><span>02</span><LineIcon type="supervisor"/><div><h3>Общая координация</h3><p>Главный модуль распределяет работу, сохраняет контекст и собирает единый результат.</p></div></article>
          <article><span>03</span><LineIcon type="automation"/><div><h3>Модульный рост</h3><p>Новый агент подключается к архитектуре без перестройки всей экосистемы.</p></div></article>
        </div>
      </section>

      <section className="scenarios shell" id="scenarios">
        <div className="scenario-heading">
          <div>
            <p className="kicker"><i /> Сценарии работы</p>
            <h2>От задачи бизнеса<br />к <em>проверяемому результату.</em></h2>
          </div>
          <p>Выберите сценарий, чтобы увидеть маршрут задачи через модули экосистемы.</p>
        </div>

        <div className="scenario-tabs" role="tablist" aria-label="Сценарии экосистемы">
          {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
            <button key={key} role="tab" aria-selected={activeScenario === key} className={activeScenario === key ? "active" : ""} onClick={() => setActiveScenario(key)}>
              <span>{scenarios[key].code}</span><strong>{scenarios[key].tab}</strong><i>→</i>
            </button>
          ))}
        </div>

        <div className="scenario-board" aria-live="polite">
          <div className="scenario-brief">
            <div className="board-status"><span>{scenario.code} / BUSINESS CASE</span><i>● SELECTED</i></div>
            <p>ЗАДАЧА БИЗНЕСА</p>
            <h3>{scenario.title}</h3>
            <p className="brief-text">{scenario.task}</p>
          </div>
          <div className="scenario-flow">
            {scenario.steps.map((step, index) => (
              <article key={step.number}>
                <div className="flow-code"><span>{step.number}</span><i>{index < 2 ? "→" : "✓"}</i></div>
                <h4>{step.name}</h4>
                <p>{step.text}</p>
                <small>{step.agent}</small>
              </article>
            ))}
          </div>
          <aside className="result-panel">
            <div><span>OUTPUT</span><i>✓ ГОТОВО</i></div>
            <h3>Результат</h3>
            <ul>{scenario.results.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
            <div className="signal-chart" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
          </aside>
        </div>

        <div className="final-message">
          <div className="final-grid" aria-hidden="true" />
          <p className="kicker"><i /> AIIRK · Иркутск</p>
          <h2>Ваш бизнес работает<br />быстрее <em>с ИИ.</em></h2>
          <p>Модульная архитектура растёт вместе с задачами: новый агент подключается к системе, не разрушая уже работающие процессы.</p>
          <a href="#ecosystem" className="neon-button">Вернуться к архитектуре <Arrow /></a>
        </div>
      </section>

      <footer>
        <a className="logo" href="#top"><span className="logo-star">✦</span><strong>AI<span>IRK</span></strong></a>
        <p>Автоматизация. Контент. Результат.</p>
        <span>Иркутск · Сибирь</span>
      </footer>
    </main>
  );
}
