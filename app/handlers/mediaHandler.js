const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

async function fetchFromTMDB(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.status_message || `Failed to fetch data from TMDB (Status: ${res.status})`);
  }
  return await res.json();
}

export async function searchMediaByQuery(query) {
  const url = `https://api.themoviedb.org/3/search/multi?query=${query}&language=en-US&page=1`;
  try {
    const data = await fetchFromTMDB(url);
    const media_outputs_only = data.results.filter(
      (r) => r.media_type == "tv" || r.media_type == "movie"
    );
    return media_outputs_only.sort((a, b) => b.popularity - a.popularity);
  } catch (error) {
    console.error("Error in searchMediaByQuery:", error);
    throw error;
  }
}

export async function getMediaByCategory(mediaCategory, mediaType) {
  let url = `https://api.themoviedb.org/3/${mediaType}/${mediaCategory}?language=en-US&page=1`;

  switch (mediaCategory) {
    case "trending_all_day":
      url = `https://api.themoviedb.org/3/trending/all/day?language=en-US`;
      break;
    case "trending_all_week":
      url = `https://api.themoviedb.org/3/trending/all/week?language=en-US`;
      break;
    case "trending_day":
      url = `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`;
      break;
    case "trending_week":
      url = `https://api.themoviedb.org/3/trending/${mediaType}/week?language=en-US`;
      break;
    case "top_grossing":
      url = `https://api.themoviedb.org/3/discover/${mediaType}?sort_by=revenue.desc&language=en-US&page=1`;
      break;
    case "anime":
      url = `https://api.themoviedb.org/3/discover/${mediaType}?with_genres=16&sort_by=release_date.desc&page=1`;
      break;
  }

  try {
    const data = await fetchFromTMDB(url);
    return data.results;
  } catch (error) {
    console.error(`Error in getMediaByCategory (${mediaCategory}, ${mediaType}):`, error);
    throw error;
  }
}

export async function getMediaByGenre(genreId, mediaType) {
  const url = `https://api.themoviedb.org/3/discover/${mediaType}?with_genres=${genreId}`;
  try {
    return await fetchFromTMDB(url);
  } catch (error) {
    console.error(`Error in getMediaByGenre (${genreId}, ${mediaType}):`, error);
    throw error;
  }
}

export async function getPersonDetails(personId) {
  const url = `https://api.themoviedb.org/3/person/${personId}?language=en-US`;
  try {
    return await fetchFromTMDB(url);
  } catch (error) {
    console.error(`Error in getPersonDetails (${personId}):`, error);
    throw error;
  }
}

export async function getPersonCredits(personId) {
  const url = `https://api.themoviedb.org/3/person/${personId}/combined_credits`;
  try {
    return await fetchFromTMDB(url);
  } catch (error) {
    console.error(`Error in getPersonCredits (${personId}):`, error);
    throw error;
  }
}

export async function getMediaById(mediaId, mediaType) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?language=en-US`;
  try {
    return await fetchFromTMDB(url);
  } catch (error) {
    console.error(`Error in getMediaById (${mediaId}, ${mediaType}):`, error);
    throw error;
  }
}

export async function getMediaVideos(mediaId, mediaType) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?language=en-US`;
  try {
    const data = await fetchFromTMDB(url);
    return data.results;
  } catch (error) {
    console.error(`Error in getMediaVideos (${mediaId}, ${mediaType}):`, error);
    throw error;
  }
}

export async function getMediaPictures(mediaId, mediaType) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/images`;
  try {
    const data = await fetchFromTMDB(url);
    return data.backdrops;
  } catch (error) {
    console.error(`Error in getMediaPictures (${mediaId}, ${mediaType}):`, error);
    throw error;
  }
}

export async function getMediaCredits(mediaId, mediaType) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?language=en-US`;
  try {
    const data = await fetchFromTMDB(url);
    const casts = data.cast;
    const directors = data.crew.filter((i) => i.job.startsWith("Direct"));
    const writers = data.crew.filter(
      (i) =>
        i.known_for_department.startsWith("Wri") ||
        i.known_for_department.startsWith("Screen") ||
        i.known_for_department.startsWith("Sto") ||
        i.known_for_department.startsWith("Auth")
    );
    
    const uniqueWriters = [];
    const writerNames = new Set();
    writers.forEach((writer) => {
      if (!writerNames.has(writer.name)) {
        uniqueWriters.push(writer);
        writerNames.add(writer.name);
      }
    });

    return { casts, directors, writers: uniqueWriters };
  } catch (error) {
    console.error(`Error in getMediaCredits (${mediaId}, ${mediaType}):`, error);
    throw error;
  }
}

export async function getMediaWatchProviders(mediaId, mediaType) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/watch/providers?language=en-US`;
  try {
    const data = await fetchFromTMDB(url);
    return data.results;
  } catch (error) {
    console.error(`Error in getMediaWatchProviders (${mediaId}, ${mediaType}):`, error);
    throw error;
  }
}

export async function getMediaReviews(mediaId, mediaType) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/reviews?language=en-US&page=1`;
  try {
    const data = await fetchFromTMDB(url);
    return data.results;
  } catch (error) {
    console.error(`Error in getMediaReviews (${mediaId}, ${mediaType}):`, error);
    throw error;
  }
}

export async function getMediaRecommendations(mediaId, mediaType) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/recommendations?language=en-US&page=1`;
  try {
    const data = await fetchFromTMDB(url);
    return data.results;
  } catch (error) {
    console.error(`Error in getMediaRecommendations (${mediaId}, ${mediaType}):`, error);
    throw error;
  }
}
