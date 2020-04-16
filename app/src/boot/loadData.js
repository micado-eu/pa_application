export default async ({ store }) => {
    await store.dispatch('features/fetchFeatures');
    await store.dispatch('features/fetchStatistics');
}
