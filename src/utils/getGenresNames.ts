export const getGenresNames = (genresEntities: any, genreIds: number[]) => {
    const genresNames = [] as string[];

    genreIds.map((id: number) => {
        genresNames.push(genresEntities.entities[id].name);
    })

    return genresNames.join(', ');
}