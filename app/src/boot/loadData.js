export default async ({ store }) => {
    await store.dispatch('statistics/fetchStatistics');
    await store.dispatch('features/fetchFeatures');
}
