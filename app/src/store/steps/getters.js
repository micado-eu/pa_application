export function steps(state) {
    return state.steps
  }

  /*export function step_icons(state) {
    return state.step_icons
  }*/

  export function step_icons(state) {
    var final_icons = []
    state.step_icons.forEach((ic)=>{
      final_icons.push({label:ic.id, value:ic.icon})

    })
    return final_icons
  }