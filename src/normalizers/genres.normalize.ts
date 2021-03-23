import { Genre } from "../api/types/Genre";

export const normalizeGenres = (genres: Genre[]) => {
    let result: number[] = [];
    let entities: Record<number, Genre> = {};

    for (let i = 0; i < genres.length; i++) {
        const item = genres[i];

        result.push(item.id);

        entities[item.id] = {
            ...item,
        } as Genre;
    }

    return {
        result,
        entities
    };
}