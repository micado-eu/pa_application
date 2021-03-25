export function document_types(state) {
    return state.document_type
  }
  export function document_types_icons(state) {
    var final_icons = []
    state.document_type_icons.forEach((ic)=>{
      final_icons.push({label:"", value:ic.icon})

    })
    return final_icons
  }