import { motion, useReducedMotion } from 'framer-motion';
import './land_page.css';

const workflowSteps = [
  {
    number: '01',
    title: 'Upload CSV',
    description: 'Drop a dataset and start a guided ML flow instantly.',
    icon: '⊞',
  },
  {
    number: '02',
    title: 'Auto Detect ML Task',
    description: 'Regression, binary classification, or multi-class detection.',
    icon: '◌',
  },
  {
    number: '03',
    title: 'Tune Hyperparameters',
    description: 'Adjust sliders, toggles, and inputs with a polished GUI.',
    icon: '◎',
  },
  {
    number: '04',
    title: 'Train & Download',
    description: 'Get metrics, charts, EDA, and a downloadable trained model.',
    icon: '⬇',
  },
];

const featureCards = [
  'Auto preprocessing',
  'Column Transformer',
  'Function Transformer',
  'Pipeline integration',
  'Hyperparameter tuning',
  'Automatic metrics',
  'Interactive EDA',
  'Pandas profiling',
  'Download trained model',
  'Multi-model support',
  'Regression + classification',
  'GPU-friendly motion',
];

const metricCards = [
  { label: 'Accuracy', value: '97.8%' },
  { label: 'F1 Score', value: '0.94' },
  { label: 'Precision', value: '0.96' },
  { label: 'Recall', value: '0.92' },
  { label: 'RMSE', value: '2.14' },
  { label: 'MAE', value: '1.08' },
  { label: 'R²', value: '0.98' },
];

const hyperparameterRows = [
  { label: 'learning_rate', type: 'slider', value: '0.03' },
  { label: 'n_estimators', type: 'number', value: '320' },
  { label: 'max_depth', type: 'dropdown', value: '12' },
  { label: 'batch_size', type: 'slider', value: '64' },
  { label: 'epochs', type: 'number', value: '48' },
];

function MetricCard({ label, value }) {
  return (
    <motion.div
      className="metric-card"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </motion.div>
  );
}

function LandPage() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="landing-page">
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />
      <div className="grid-overlay" />
      <div className="floating-particles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <header className="navbar">
        <div className="brand">
          <span className="brand-mark">E</span>
          <div>
            <strong>EasyTrain</strong>
            <p>Machine Learning made simple</p>
          </div>
        </div>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#analytics">Analytics</a>
        </nav>

        <a className="nav-cta" href="/">
          Open App
        </a>
      </header>

      <section className="hero section-shell" id="hero">
        <div className="hero-copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            FUTURISTIC ML WORKFLOW
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            Train Machine Learning Models Without Writing Code
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            Upload your dataset, configure models visually, and get production-ready
            ML pipelines instantly. Automatic preprocessing, pipelines, metrics,
            EDA, and downloadable models are all orchestrated in one smooth flow.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            <a className="btn btn-primary" href="/train">
              Start Training
            </a>
            <a className="btn btn-secondary" href="#analytics">
              Watch Demo
            </a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
          >
            <div>
              <strong>03</strong>
              <span>problem types detected</span>
            </div>
            <div>
              <strong>12+</strong>
              <span>automated ML steps</span>
            </div>
            <div>
              <strong>1-click</strong>
              <span>model export</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <div className="dashboard-shell">
            <div className="dashboard-topbar">
              <div className="dashboard-window-dots">
                <span />
                <span />
                <span />
              </div>
              <span>Live training session</span>
            </div>

            <div className="dashboard-grid">
              <div className="mock-panel mock-panel-wide">
                <div className="panel-label">Dataset flow</div>
                <div className="flow-track">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="flow-caption">CSV → preprocessing → pipeline → model</div>
              </div>

              <div className="mock-panel chart-panel">
                <div className="panel-label">Training curve</div>
                <div className={`sparkline ${reduceMotion ? 'reduce-motion' : ''}`}>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="mock-panel metric-panel">
                <div className="panel-label">Model status</div>
                <strong>Optimizing</strong>
                <p>Column transformer, scaling, and feature selection active.</p>
              </div>

              <div className="mock-panel metric-panel metric-panel-accent">
                <div className="panel-label">Auto detection</div>
                <strong>Multi-class</strong>
                <p>Classification task inferred from target distribution.</p>
              </div>
            </div>
          </div>

          <div className="scroll-hint">
            <span />
            <p>Scroll for the full pipeline</p>
          </div>
        </motion.div>
      </section>

      <section className="section-shell workflow-section" id="how-it-works">
        <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>Interactive pipeline from dataset to downloadable model</h2>
          <p>
            The flow is intentionally simple: the system detects the task, prepares the
            data, tunes the model, and packages the results in a clean GUI.
          </p>
        </motion.div>

        <div className="workflow-layout">
          <div className="workflow-cards">
            {workflowSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="workflow-card"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -10, scale: 1.01 }}
              >
                <span className="card-number">{step.number}</span>
                <div className="card-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>

          <div className="pipeline-diagram">
            <div className="diagram-node active">Upload</div>
            <div className="diagram-line" />
            <div className="diagram-node">Detect</div>
            <div className="diagram-line" />
            <div className="diagram-node">Tune</div>
            <div className="diagram-line" />
            <div className="diagram-node highlight">Train</div>
          </div>
        </div>
      </section>

      <section className="section-shell features-section" id="features">
        <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">FEATURES</p>
          <h2>Premium automation for modern ML teams</h2>
          <p>
            Every card communicates the platform’s value: preprocessing, pipeline
            orchestration, tuning, metrics, reports, and export in one polished flow.
          </p>
        </motion.div>

        <div className="features-grid">
          {featureCards.map((feature, index) => (
            <motion.article
              key={feature}
              className="feature-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              whileHover={{ y: -8, rotateX: 5, rotateY: -5 }}
            >
              <span className="feature-glow" aria-hidden="true" />
              <span className="feature-pill">AI FLOW</span>
              <h3>{feature}</h3>
              <p>
                Built to feel like a high-end SaaS tool with smooth motion,
                glass surfaces, and clear hierarchy.
              </p>
            </motion.article>
          ))}
        </div>

        <div className="code-snippets" aria-hidden="true">
          <span>pipeline = make_pipeline(preprocess, model)</span>
          <span>column_transformer.fit_transform(X)</span>
          <span>metrics = [accuracy, f1, rmse, r2]</span>
        </div>
      </section>

      <section className="section-shell analytics-section" id="analytics">
        <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">ANALYTICS & VISUALIZATION</p>
          <h2>Metrics and dashboards that feel live</h2>
          <p>
            Accuracy, F1, precision, recall, RMSE, MAE, and R² are surfaced in a dashboard
            that looks and feels like a real training console.
          </p>
        </motion.div>

        <div className="analytics-grid">
          <div className="analytics-main">
            <div className="chart-canvas chart-canvas-primary">
              <div className="chart-grid" />
              <div className="chart-line chart-line-one" />
              <div className="chart-line chart-line-two" />
              <div className="chart-pulse" />
            </div>

            <div className="chart-row">
              <div className="chart-canvas chart-canvas-small">
                <div className="panel-label">Confusion matrix</div>
                <div className="matrix-grid">
                  <span className="heat high" />
                  <span className="heat mid" />
                  <span className="heat low" />
                  <span className="heat high" />
                </div>
              </div>

              <div className="chart-canvas chart-canvas-small">
                <div className="panel-label">Feature importance</div>
                <div className="bar-graph">
                  <span style={{ '--bar-level': '86%' }} />
                  <span style={{ '--bar-level': '62%' }} />
                  <span style={{ '--bar-level': '74%' }} />
                  <span style={{ '--bar-level': '48%' }} />
                </div>
              </div>
            </div>
          </div>

          <aside className="metrics-panel">
            <div className="panel-heading">
              <p className="eyebrow">LIVE METRICS</p>
              <h3>Training pulse</h3>
            </div>

            <div className="metrics-grid">
              {metricCards.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>

            <div className="hyperparameter-card">
              <div className="panel-heading compact">
                <p className="eyebrow">HYPERPARAMETERS</p>
                <h3>Interactive controls</h3>
              </div>

              <div className="hyperparameter-ui">
                {hyperparameterRows.map((row) => (
                  <div className="hyperparameter-row" key={row.label}>
                    <div>
                      <strong>{row.label}</strong>
                      <p>{row.value}</p>
                    </div>
                    {row.type === 'slider' ? (
                      <div className="slider-shell" aria-hidden="true">
                        <span />
                      </div>
                    ) : row.type === 'dropdown' ? (
                      <button className="input-pill">selected</button>
                    ) : (
                      <div className="input-pill numeric">42</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell closing-section">
        <motion.div className="closing-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">BUILT FOR SPEED</p>
          <h2>Machine learning made simple, visual, and premium.</h2>
          <p>
            This interface is designed to make the workflow obvious at a glance: upload a
            dataset, tune the model visually, inspect the results, and export a trained
            artifact with confidence.
          </p>
          <div className="hero-actions compact">
            <a className="btn btn-primary" href="/train">
              Start Training
            </a>
            <a className="btn btn-secondary" href="#hero">
              Back to top
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="footer">
        <div>
          <strong>EasyTrain</strong>
          <p>Futuristic GUI for automated ML workflows.</p>
        </div>
        <p>Scalable pipelines, polished UX, and visual model training in one place.</p>
      </footer>
    </main>
  );
}

export default LandPage;