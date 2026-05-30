import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./train_model.css";

function TrainModel() {
  const location = useLocation();
  const data = location.state?.data || {};
  const target = location.state?.target || "";
  const file = location.state?.file || null;
  const models = data["models"] || {};
  const [modelType, setModelType] = useState(Object.keys(models)[0] || "");
  const [result, setResult] = useState(null);
  const type = data["type"] || "";

  const [parameters, setParameters] = useState({});
  const [selectedParams, setSelectedParams] = useState({});
  const [isFetchingParameters, setIsFetchingParameters] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  const onsubmit = async () => {
    const formData = new FormData();
    formData.append("model_name", modelType);
    formData.append("model_type", type);
    formData.append("file", file);
    formData.append("target", target);
    formData.append("parameters", JSON.stringify(selectedParams));

    try {
      setIsTraining(true);
      const res = await axios.post(
        "https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev/model",
        formData
      );
      setResult(res.data);

      window.open(
        `https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev${res.data["report_url"]}`,
        "_blank"
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsTraining(false);
    }
  };

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        setIsFetchingParameters(true);

        const param = await axios.get(
          `https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev/model/parameters/${modelType}/${type}`
        );

        setParameters(param.data.parameters);
        setSelectedParams(param.data.parameters);
        console.log(param.data.parameters);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetchingParameters(false);
      }
    };

    fetchParameters();
  }, [modelType, type]);

  const parameterEntries = Object.keys(parameters || {});
  const resultEntries = Object.entries(result?.other_info || {});
  const hasModels = Object.keys(models).length > 0;
  const selectedModelLabel = modelType || "No model selected";

  return (
    <div className="train-page">
      <div className="train-background train-background--one" aria-hidden="true" />
      <div className="train-background train-background--two" aria-hidden="true" />

      <div className="train-shell">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="hero-badge">Automated ML Training</span>
            <h1>Train models with a focused, high-signal workspace.</h1>
            <p>
              Review the recommended models, fine-tune hyperparameters, and launch training
              from a clean dashboard built for fast iteration.
            </p>
          </div>

          <div className="hero-summary" aria-label="Training summary">
            <div className="summary-chip">
              <span className="summary-label">Problem type</span>
              <strong>{type || "Unknown"}</strong>
            </div>
            <div className="summary-chip">
              <span className="summary-label">Target column</span>
              <strong>{target || "Not provided"}</strong>
            </div>
            <div className="summary-chip">
              <span className="summary-label">Active model</span>
              <strong>{selectedModelLabel}</strong>
            </div>
          </div>
        </section>

        <div className="train-grid">
          <section className="panel panel--setup">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Model selection</p>
                <h2>Choose the candidate to train</h2>
              </div>
              <span className={`status-pill ${isFetchingParameters ? "status-pill--loading" : ""}`}>
                {isFetchingParameters ? "Fetching parameters" : "Ready"}
              </span>
            </div>

            <label className="field-group">
              <span className="field-label">Recommended model</span>
              <select
                className="select-input select-input--primary"
                name="Select model"
                value={modelType}
                onChange={(e) => setModelType(e.target.value)}
                disabled={!hasModels || isTraining}
              >
                {Object.keys(models).map((modelName, index) => (
                  <option key={index} value={modelName}>
                    {modelName}
                  </option>
                ))}
              </select>
            </label>

            <div className="selection-hint">
              <span className="selection-hint__label">Selected</span>
              <strong>{selectedModelLabel}</strong>
            </div>
          </section>

          <section className="panel panel--parameters">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Hyperparameters</p>
                <h2>Fine-tune the training configuration</h2>
              </div>
              <span className="status-pill status-pill--soft">{parameterEntries.length} options</span>
            </div>

            {isFetchingParameters ? (
              <div className="loading-card loading-card--parameters" aria-live="polite">
                <div className="spinner" />
                <div>
                  <strong>Loading hyperparameters</strong>
                  <p>Preparing the recommended search space for this model.</p>
                </div>
              </div>
            ) : parameterEntries.length > 0 ? (
              <div className="parameter-grid">
                {parameterEntries.map((param, index) => (
                  <div className="parameter-card" key={index}>
                    <label className="field-group field-group--compact">
                      <span className="field-label">{param}</span>
                      <select
                        className="select-input"
                        name={param}
                        defaultValue=""
                        onChange={(e) =>
                          setSelectedParams((prev) => ({ ...prev, [param]: e.target.value }))
                        }
                        disabled={isTraining}
                      >
                        {parameters[param].map((value, inw) => (
                          <option key={inw} value={value}>
                            {String(value)}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <strong>No tunable parameters were returned.</strong>
                <p>The selected model uses the default training configuration.</p>
              </div>
            )}
          </section>
        </div>

        <section className="panel panel--action">
          <div className="action-copy">
            <p className="panel-kicker">Launch training</p>
            <h2>Start the training run and generate the report.</h2>
            <p>
              Your selected model and parameter set will be submitted exactly as configured.
            </p>
          </div>

          <button className="train-button" onClick={onsubmit} disabled={!modelType || isTraining}>
            {isTraining ? (
              <span className="button-loading" aria-live="polite">
                <span className="spinner spinner--button" />
                Training model...
              </span>
            ) : (
              "Train Model"
            )}
          </button>
        </section>

        {result && (
          <section className="panel panel--results">
            <div className="panel-header panel-header--results">
              <div>
                <p className="panel-kicker">Results</p>
                <h2>Training completed successfully</h2>
              </div>
              <span className="status-pill status-pill--success">Success</span>
            </div>

            <div className="result-hero">
              <div>
                <span className="result-hero__label">Model artifact</span>
                <a
                  className="download-link"
                  href={`https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev${result["model_key"]}`}
                  download
                >
                  Download trained model
                </a>
              </div>
              <p>The report has been generated and opened in a new tab for quick review.</p>
            </div>

            {resultEntries.length > 0 && (
              <div className="metrics-grid" aria-label="Training metrics">
                {resultEntries.map(([key, value]) => (
                  <article className="metric-card" key={key}>
                    <span className="metric-card__label">{key}</span>
                    <strong className="metric-card__value">{String(value)}</strong>
                  </article>
                ))}
              </div>
            )}

            <div className="report-card">
              <div className="report-card__header">
                <div>
                  <p className="panel-kicker">Generated report</p>
                  <h3>Interactive profiling summary</h3>
                </div>
              </div>
              <div className="report-frame">
                <iframe
                  src={`https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev${result["report_url"]}`}
                  width="100%"
                  height="900px"
                  title="Profiling Report"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default TrainModel;