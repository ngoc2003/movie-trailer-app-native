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

  getMovieDetail: (movieId: string, mediaType = "movie") =>
    `${API_domain}/${mediaType}/${movieId}?api_key=${apiKey}`,

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
};
