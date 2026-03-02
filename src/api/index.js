const BASE_URL = '/api'

export const api = {
  plot: () => fetch(`${BASE_URL}/plot`).then(r => r.json()),
}
