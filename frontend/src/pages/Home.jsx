import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import LocationFinder from "../components/LocationFinder";
import WeatherWidget from "../components/WeatherWidget";

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="page layout-center">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Urban Harvest Hub</span>

            <h1>{t("welcome")}</h1>

            <p>{t("heroDescription")}</p>

            <div className="hero-cta">
              <button
                className="primary-btn"
                onClick={() => navigate("/events")}
              >
                {t("exploreEvents")}
              </button>

              <Link to="/login" className="secondary-btn">
                {t("login")}
              </Link>

              <Link to="/register" className="secondary-btn">
                {t("joinWorkshops")}
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="/IMG1.jpg"
              alt="Hero"
              width="520"
              height="420"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="about-section card-soft">
          <div className="about-copy">
            <span className="eyebrow">{t("aboutUs")}</span>

            <h2>{t("aboutTitle")}</h2>

            <p>{t("aboutDescription")}</p>

            <ul>
              <li>{t("feature1")}</li>
              <li>{t("feature2")}</li>
              <li>{t("feature3")}</li>
            </ul>
          </div>

          <div className="about-image">
            <img
              src="/IMG2.jpg"
              alt="About"
              width="520"
              height="420"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        <section className="home-features">
          <div className="feature-card">
            <h3>{t("card1Title")}</h3>
            <p>{t("card1Desc")}</p>
          </div>

          <div className="feature-card">
            <h3>{t("card2Title")}</h3>
            <p>{t("card2Desc")}</p>
          </div>

          <div className="feature-card">
            <h3>{t("card3Title")}</h3>
            <p>{t("card3Desc")}</p>
          </div>
        </section>

        <div className="support-row">
          <LocationFinder />
        </div>
      </div>

      {/* WEATHER / LOCAL INFO SECTION */}
      <section className="relative px-6 py-24 bg-gradient-to-t from-green-50/40 via-white to-transparent dark:from-gray-950 dark:via-gray-900 dark:to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ecoGreen dark:text-green-400 mb-4">
            Colombo Climate Center
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-10 text-sm md:text-base">
            Check the current weather conditions to plan your gardening
            sessions, planting schedules, or outdoor eco-events.
          </p>

          <div className="hover:scale-[1.01] transition-transform duration-300">
            <WeatherWidget />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;