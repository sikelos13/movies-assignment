export const getGenresNames = (genresEntities: any, genreIds: number[]) => {
    if(genreIds.length === 0) {
        return "No genres available"
    }

   const genresNameList = genreIds.map((id: number) => {
       return genresEntities.entities[id].name;
    })

    return genresNameList.join(', ');
}