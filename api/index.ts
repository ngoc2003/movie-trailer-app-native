export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const apiKey = "1a763884400befdbd957d043e8e9e19c";

const API_domain = `https://api.themoviedb.org/3`;

export const API = {
  getMoviebyID: (id: string, mediaType: string) =>
    `${API_domain}/${mediaType}/${id}?api_key=${apiKey}`,

  getMovieSearch: (query: string) =>
    `${API_domain}/search/movie?api_key=${apiKey}&query=${query}`,

  getMovieList: (type: string, page = 1, mediaType = "all") => {
    return type === "popular" || type === "top_rated" || type === "now_playing"
      ? `${API_domain}/${mediaType}/${type}?api_key=${apiKey}&page=${page}`
      : type === "discover"
      ? ` ${API_domain}/${type}/${mediaType}?api_key=${apiKey}&page=${page}`
      : ` ${API_domain}/${type}/${mediaType}/day?api_key=${apiKey}&page=${page}`;
  },

  getDetail: (
    id: string,
    type = "movie" //movie | tv | person
  ) => `${API_domain}/${type}/${id}?api_key=${apiKey}`,

  getImageUrl: (backdrop_path: string, size = "original") =>
    `https://image.tmdb.org/t/p/${size}/${backdrop_path}`,

  getDetailMeta: (movieId: string, meta: string, mediaType = "movie") =>
    `${API_domain}/${mediaType}/${movieId}/${meta}?api_key=${apiKey}`,

  getYoutubeVideo: (path: string) => `https://www.youtube.com/embed/${path}`,

  getAnimeList:
    () => `${API_domain}/discover/movie?api_key=${apiKey}&language=en-US&page=1&with_genres=16&with_keywords=210024|287501&with_text_query=death&sort_by=popularity.desc
  `,
  getAnimeEpisodeList:
    () => `${API_domain}/discover/tv?api_key=${apiKey}&language=en-US&page=1&with_genres=16&with_keywords=210024|287501&with_text_query=death&sort_by=popularity.desc
  `,

  getHorrorList: () =>
    `${API_domain}/discover/movie?api_key=${apiKey}&include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27`,

  getTrendingList: (
    query = "person" //movie | person | tv
  ) => `${API_domain}/trending/${query}/day?api_key=${apiKey}`,

  getRecommendationList: (id: string, mediaType = "movie") =>
    `${API_domain}/${mediaType}/${id}/recommendations?language=en-US&page=1&api_key=${apiKey}`,

  getSeason: (seriesId: string, seasonNumber: string) =>
    `${API_domain}/tv/${seriesId}/season/${seasonNumber}?language=en-US&api_key=${apiKey}`,

  getExternalIdsOfPerson: (id: number) =>
    `${API_domain}/person/${id}/external_ids?language=en-US&api_key=${apiKey}`,

  getCombinedCreditOfArtist: (id: number) =>
    `${API_domain}/person/${id}/combined_credits?language=en-US&api_key=${apiKey}`,

  getCreditsOfArtist: (
    id: number,
    type = "movie" //type = movie | tv
  ) =>
    `${API_domain}/person/${id}/${type}_credits?language=en-US&api_key=${apiKey}`,
};
