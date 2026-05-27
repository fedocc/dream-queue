import { createRoot } from "react-dom/client";
import "./styles.css";

const evidenceRows = [
  {
    signal: "Genting / Alibaba",
    supports:
      "Подтверждают категорию: виртуальные слоты, планирование маршрута, стимулы для перераспределения гостей, прогноз потока, QR-проверка по билету, групповые бронирования, киоски, лимиты доступности и правила опозданий.",
    doesNotProve:
      "Экономику Dream Queue, рост выручки, сокращение ожидания, точность модели, долю неявок, соблюдение маршрутов или стоимость внедрения.",
  },
  {
    signal: "Умный туризм в Китае",
    supports:
      "Гибкие форматы бронирования: офлайн-доступ, меньше персональных данных, антискальперские меры и инструменты управления потоком посетителей.",
    doesNotProve:
      "Спрос в Москве, внутреннюю операционную боль «Острова Мечты» или коммерческий результат пилота.",
  },
  {
    signal: "Вендорская категория",
    supports:
      "Виртуальная очередь, панель оператора, проверка QR/билета, работа с группами, учет неявок и терминалы самообслуживания уже являются зрелыми паттернами.",
    doesNotProve:
      "Соответствие продукта рынку или вендорские KPI без независимой проверки.",
  },
  {
    signal: "Операционные правила Disney",
    supports:
      "Дефицит слотов, окна возврата, групповую и билетную логику, операционные исключения и отсутствие гарантии мгновенного прохода.",
    doesNotProve:
      "Исчезновение очередей, выручку Dream Queue или поведение гостей в другом парке.",
  },
  {
    signal: "Контекст «Острова Мечты»",
    supports:
      "Разговор о сфокусированном пилоте вокруг выбранных перегруженных аттракционов, существующих форматов приоритетного доступа и базовых замеров.",
    doesNotProve:
      "Подтвержденную внутреннюю проблему очередей, точное время ожидания, пропускную способность, неявки, платную конверсию или влияние на обычную очередь.",
  },
];

const problemPoints = [
  {
    title: "Пропускная способность остается физической.",
    text: "Система не добавляет места на аттракционах и не ускоряет циклы посадки. Она управляет тем, как дефицитные окна доступа выдаются и проверяются.",
  },
  {
    title: "Спрос становится видимым.",
    text: "Время, маршруты, запас слотов, опоздания, неявки и простои превращаются в понятные операционные сигналы, а не остаются разрозненными симптомами.",
  },
  {
    title: "Пилот проверяет ценность.",
    text: "Сначала фиксируется базовая ситуация, затем парк сравнивает, помогает ли управляемый поток повысить предсказуемость без ущерба для справедливости обычной очереди.",
  },
];

const workflow = [
  ["01", "Билет или группа", "Привязать виртуальный слот к действующему билету или связанной группе."],
  ["02", "Виртуальный слот", "Показывать ограниченные окна возврата там, где это допускает пропускная способность."],
  ["03", "Время вне очереди", "Перевести часть ожидания из физической линии в управляемое окно."],
  ["04", "Маршрут или стимул", "Предложить кафе, магазин, шоу или менее загруженную зону на время ожидания."],
  ["05", "QR-проверка", "Проверить билет, группу, окно возврата и исключения у входа на аттракцион."],
  ["06", "Панель оператора", "Следить за использованием слотов, нагрузкой, простоями, ручными решениями и защитой обычной очереди."],
];

const experienceCards = [
  {
    label: "Как это видит гость",
    title: "Ваш слот: 14:20-14:40",
    metric: "До входа 28 минут",
    text: "Рекомендуемый маршрут: кафе -> магазин -> аттракцион. Гость не стоит всё время в физической линии, но возвращается в ограниченное окно.",
    points: ["окно возврата", "маршрут ожидания", "QR у входа"],
  },
  {
    label: "Как это видит оператор",
    title: "Загрузка аттракциона 92%",
    metric: "Окна возврата заполнены на 73%",
    text: "Оператор видит неявки, опоздания, ручные исключения, риск простоя и лимит платной емкости до того, как это ломает очередь.",
    points: ["неявки 14%", "ручных исключений 6", "paid cap 10%"],
  },
];

const modelRows = [
  {
    scenario: "Без Dream Queue",
    wait: "82 мин",
    queue: "1 550",
    meaning: "Базовая ситуация без управляемых слотов.",
    tone: "neutral",
  },
  {
    scenario: "С Dream Queue",
    wait: "72 мин",
    queue: "967",
    meaning: "Возможное улучшение при рабочих предпосылках.",
    tone: "positive",
  },
  {
    scenario: "Стресс-сценарий",
    wait: "163 мин",
    queue: "1 686",
    meaning: "Если растут опоздания, неявки и сбои, эффект может ухудшиться или исчезнуть.",
    tone: "warning",
  },
];

const assumptions = ["неявки 5%", "опоздания 8%", "следование маршруту 75%", "лимит платных слотов 10%", "доля киосков 12%"];

const riskGroups = [
  {
    title: "Контроль доступа",
    items: ["QR привязан к билету", "проверка группы", "непередаваемые слоты"],
  },
  {
    title: "Операционные исключения",
    items: ["неявки", "опоздания", "простои", "решение сотрудника"],
  },
  {
    title: "Справедливость и доверие",
    items: ["лимит платной емкости", "офлайн/киоск-доступ", "минимум персональных данных", "порог защиты обычной очереди"],
  },
];

const pilotSteps = [
  ["01", "Замерить", "Базовое ожидание, пропускную способность, простои, пиковые окна и ограничения персонала."],
  ["02", "Смоделировать", "Использовать реальные вводные, чтобы проверить запас слотов, маршрутизацию, платный лимит и стресс-сценарий."],
  ["03", "Запустить пилот", "Провести 4-8 недель на 5-8 перегруженных аттракционах с QR-проверкой и панелью оператора."],
  ["04", "Принять решение", "Сравнить данные до/после и решить, масштабировать, сузить или остановить инициативу."],
];

const dataRequest = [
  "посещаемость по часам",
  "пропускная способность и цикл посадки",
  "замеры ожидания",
  "простои и временные закрытия",
  "ограничения экспресс/VIP",
  "агрегированные прокси по кафе и магазинам, если можно раскрыть",
  "возможности приложения, киосков и билетной системы",
  "ограничения персонала у входов",
];

function App() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Dream Queue: на главную">Dream Queue</a>
        <nav className="primaryNav" aria-label="Основная навигация">
          <a href="#problem">Проблема</a>
          <a className="optionalNav" href="#evidence">Основания</a>
          <a className="optionalNav" href="#how">Как это работает</a>
          <a href="#model">Модель</a>
          <a href="#pilot">Пилот</a>
        </nav>
        <a className="headerCta" href="#data">Какие данные нужны</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="metadata">Исследовательский MVP · Пилот на 4-8 недель · 5-8 перегруженных аттракционов · Сначала базовые замеры</p>
          <h1>Управляйте временем гостей, а не только очередями.</h1>
          <p className="lede">
            Dream Queue - это B2B-пилот для парка: гость получает виртуальное окно входа и маршрут
            ожидания, а оператор видит загрузку, неявки, опоздания, QR-проверку и лимит priority-слотов.
          </p>
          <div className="heroActions" aria-label="Действия в первом экране">
            <a className="button primary" href="#pilot">Посмотреть рамки пилота</a>
            <a className="button secondary" href="#evidence">Открыть карту оснований</a>
          </div>
        </div>
        <HeroInfographic />
      </section>

      <section className="section" id="problem">
        <SectionHeader eyebrow="Проблема" title="Физическая емкость фиксирована. Управляемый рычаг - поток гостей." />
        <div className="editorialColumns">
          {problemPoints.map((point) => (
            <article className="textPoint" key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section pilotSection" id="pilot">
        <SectionHeader eyebrow="Пилот" title="Проверяем на 5-8 перегруженных аттракционах за 4-8 недель." />
        <div className="timeline">
          {pilotSteps.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="pilotMeta">
          4-8 недель · 5-8 перегруженных аттракционов · пиковые окна · сначала базовые замеры ·
          QR-проверка · панель оператора · анализ до/после
        </p>
      </section>

      <section className="section" id="how">
        <SectionHeader eyebrow="Как это выглядит" title="Один пилот, два интерфейса: понятный путь для гостя и контрольная панель для оператора." />
        <div className="experienceGrid">
          {experienceCards.map((card) => (
            <article className="experienceCard" key={card.label}>
              <span>{card.label}</span>
              <h3>{card.title}</h3>
              <strong>{card.metric}</strong>
              <p>{card.text}</p>
              <ul>
                {card.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="evidence">
        <SectionHeader eyebrow="Основания" title="Рыночные примеры полезны только тогда, когда видны их ограничения." />
        <div className="provenanceNote">
          <span>Источник</span>
          <span>Предпосылка</span>
          <span>Модельный расчет</span>
          <span>Гипотеза пилота</span>
        </div>
        <div className="ledger" role="table" aria-label="Карта оснований">
          <div className="ledgerHead" role="row">
            <span role="columnheader">Сигнал</span>
            <span role="columnheader">Что подтверждает</span>
            <span role="columnheader">Что не доказывает</span>
          </div>
          {evidenceRows.map((row) => (
            <div className="ledgerRow" role="row" key={row.signal}>
              <strong role="cell">{row.signal}</strong>
              <p role="cell">{row.supports}</p>
              <p role="cell">{row.doesNotProve}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Как это работает" title="Небольшой операционный контур, а не тяжелая корпоративная платформа." />
        <ol className="stepFlow">
          {workflow.map(([number, title, text]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section modelSection" id="model">
        <SectionHeader eyebrow="Модель" title="Базовый сценарий улучшается. Стресс-сценарий показывает границы эффекта." />
        <p className="modelWarning">
          <span>Модельный расчет</span>
          Это модельные расчёты, а не реальные данные «Острова Мечты».
        </p>
        <div className="comparisonGrid" aria-label="Сравнение сценариев модели">
          {modelRows.map((row) => (
            <article className={`comparisonCard ${row.tone}`} key={row.scenario}>
              <div className="scenarioTitle">
                <span>Сценарий</span>
                <strong>{row.scenario}</strong>
              </div>
              <div className="scenarioMetrics">
                <div>
                  <span>Среднее ожидание</span>
                  <strong className="metricValue">{row.wait}</strong>
                </div>
                <div>
                  <span>Максимальная очередь</span>
                  <strong className="metricValue">{row.queue}</strong>
                </div>
              </div>
              <p>{row.meaning}</p>
            </article>
          ))}
        </div>
        <p className="assumptionLine">
          <span>Предпосылки:</span>
          {assumptions.join(" · ")}
        </p>
      </section>

      <section className="section" id="risk">
        <SectionHeader eyebrow="Контроль рисков" title="Виртуальная очередь - это управляемый дефицит и проверка на месте." />
        <div className="riskBands">
          {riskGroups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section dataSection" id="data">
        <div>
          <SectionHeader eyebrow="Какие данные нужны" title="Исследовательский этап нужно проводить на реальных данных парка." />
          <p className="dataIntro">
            Следующий шаг практический: собрать минимальные вводные, чтобы измерить базовую ситуацию,
            смоделировать риски и решить, стоит ли запускать пилот.
          </p>
        </div>
        <ul className="dataList">
          {dataRequest.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <a className="button primary finalCta" href="mailto:hello@dreamqueue.ai?subject=Dream%20Queue%20pilot%20data%20request">
          Обсудить исследовательский этап на данных парка
        </a>
      </section>

      <footer className="footer">
        <span>Dream Queue</span>
        <span>Исследовательский MVP и пилотное предложение. Сценарные расчеты не являются измеренными данными парка.</span>
      </footer>
    </main>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="sectionHeader">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function HeroInfographic() {
  return (
    <figure className="heroInfographic">
      <img
        src="/images/dream-queue-hero-infographic.png"
        alt="Инфографика маршрута гостя: вход, перегруженный аттракцион, свободный слот, маршрут ожидания и возврат по QR."
        width="1448"
        height="1086"
      />
      <figcaption>
        Иллюстрация показывает логику пилота: виртуальный слот, маршрут ожидания, возврат по QR и контроль опозданий.
      </figcaption>
    </figure>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
