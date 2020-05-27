/*
export function someMutation (state) {
}
*/
export function setTimeseries(state, timeseries) {
  if (timeseries) {
    state.timeseries = timeseries
  }
}

export function setOrigin(state, origin) {
  if (origin) {
    state.origin = origin
  }
}

export function setMigrants(state, migrants) {
  if (migrants) {
    state.migrants = migrants
  }
}

export function setMapping(state, mapping) {
  if (mapping) {
    state.mapping = mapping
  }
}

export function setInflux_for_family_reunion(state, influx_for_family_reunion) {
  if (influx_for_family_reunion) {
    state.influx_for_family_reunion = influx_for_family_reunion
  }
}

export function setInflux_hamburg(state, influx_hamburg) {
  if (influx_hamburg) {
    state.influx_hamburg = influx_hamburg
  }
}