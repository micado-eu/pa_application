import editEntityMixin from '../../mixin/editEntityMixin'
import { i18nInstance } from 'boot/i18n.js' 
import { arrayToTree } from "performant-array-to-tree";


export function topic(state) {
    return state.topic
  }
export function topic_published(state) {
    return state.topic.filter((topico)=>{
      return topico.published == true
    })
  }
  export function tree_options(state){
    var options = []
  var published_topi = state.topic.filter((topico)=>{
    return topico.published == true
  })
  published_topi.forEach((top)=>{
    options.push({id:top.id, parentId:top.father, label:top.translations.filter(editEntityMixin.methods.filterTranslationModel((i18nInstance.locale)))[0].topic})
  })
  const tree = arrayToTree(options,{ dataField: null })
  console.log(tree)
  return tree
  }

