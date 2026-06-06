import i18n from "i18next";

function LanguageSelector() {

  return (

    <select
      className="language-selector"
      onChange={(e) =>
        i18n.changeLanguage(
          e.target.value
        )
      }
    >

      <option value="en">
        English
      </option>

      <option value="si">
        Sinhala
      </option>

      <option value="ta">
        Tamil
      </option>

    </select>

  );
}

export default LanguageSelector;