const gifCache = {};

export async function getGif(searchTerm) {
    if (gifCache[searchTerm]) {
        return gifCache[searchTerm];
    }

    const url = `https://api.giphy.com/v1/gifs/search?api_key=llaL0IkVsCwI3NBQR14A6toKeFhHnA6J&q=${searchTerm}+sky&limit=1&offset=1&rating=g&lang=en&bundle=messaging_non_clips`;
    const response = await fetch(url);
    const data = await response.json();

    const gifUrl = data.data[0]?.images?.original?.url;
    if (!gifUrl) {
        throw new Error("No GIF found for that search");
    }

    gifCache[searchTerm] = gifUrl;
    return gifUrl;
}