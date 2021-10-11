import editEntityMixin from '../../mixin/editEntityMixin'
import { i18nInstance } from 'boot/i18n.js' 
import { arrayToTree } from "performant-array-to-tree"


export function user(state) {
    return state.user_type
  }
  export function tree_options(state){
    var options = []
  /*var published_topi = state.topic.filter((topico)=>{
    return topico.published == true
  })*/
  /*state.user_type.forEach((top)=>{
    options.push({id:top.id, label:top.translations.filter(editEntityMixin.methods.filterTranslationModel((i18nInstance.locale)))[0].userType, published:top.published, isDefaultExpanded:false})
  })
  const tree = arrayToTree(options,{ dataField: null })
  console.log("I AM TREE")
  console.log(tree)*/
  options = state.user_type.map(i => ({
    id: i.id,
    label: i.translations.filter(editEntityMixin.methods.filterTranslationModel((i18nInstance.locale)))[0].userType,
    customLabel: i.translations.filter(editEntityMixin.methods.filterTranslationModel((i18nInstance.locale)))[0].userType,
    published:i.published, 
    isDefaultExpanded:false
  }))
  return options
  }
