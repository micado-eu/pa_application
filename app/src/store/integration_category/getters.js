export function intervention_categories(state) {
    return state.integration_category
  }

  export function intervention_categories_published(state) {
    return state.integration_category.filter((cat)=>{
      return cat.published == true
    })
  }  
