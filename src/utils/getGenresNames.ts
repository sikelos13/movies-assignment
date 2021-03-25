export const getGenresNames = (genresEntities: any, genreIds: number[]) => {
    if(genreIds.length === 0) {
        return "No genres available"
    }
    
    const genresNames = [] as string[];

    genreIds.map((id: number) => {
        genresNames.push(genresEntities.entities[id].name);
    })

    return genresNames.join(', ');
}