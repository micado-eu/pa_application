export function topic(state) {
    return state.topic
  }
export function topic_published(state) {
    return state.topic.filter((topico)=>{
      return topico.published == true
    })
  }
