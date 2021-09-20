import Vue from 'vue'
export function setLanguages(state, languages) {
  state.languages = languages
}

export function setLanguageActive(state, language) {
  let index = state.languages.findIndex(x => x.lang == language.lang);
  if (index !== -1) {
    Vue.set(state.languages[index], "active", language.active)
  } else {
    console.error("Language not found: " + language.lang);
  }
}
export function saveLanguage(state, language){
  state.languages.push(language)
}
export function updateLanguage(state, language){
    console.log("update the state")
    console.log(language)
    const index = state.languages.findIndex(item => item.lang === language.lang)
    console.log(index)
    if (index !== -1) state.languages.splice(index, 1, language)
}