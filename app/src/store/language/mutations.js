import Vue from 'vue'
export function setLanguages (state, languages) {
  state.languages = languages
}

export function setLanguageActive (state, language) {
  let index = state.languages.findIndex(x => x.iso_code == language.iso_code);
  if (index !== -1) {
    Vue.set(state.languages[index], "active", language.active)
  } else {
    console.error("Language not found: " + language.iso_code);
  }
}