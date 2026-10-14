const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Separate host/base-path for the AdminApi subcategory endpoint —
// e.g. https://mapi.sadaivsatya.com/api/AdminApi/subcatsbycategory/Motivational%20Effort
const SUBCAT_API_BASE = "https://mapi.sadaivsatya.com/api/AdminApi";

// export const cleanText = (str: string = ""): string =>
//   str.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
export const cleanText = (str: any = ""): string =>
  String(str || "").replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
export const toSlug = (str: string = ""): string =>
  cleanText(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export async function getAllTazaHalchalArticles(
  category: string,
  page = 1,
  pageSize = 8
): Promise<unknown[]> {
  if (!API_BASE_URL) return [];

  try {
    const res = await fetch(
      `${API_BASE_URL}getnewsbytazahalchal?page=${page}&pageSize=${pageSize}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching ${category} articles:`, error);
    return [];
  }
}

export async function getCategoryArticles(
  category: string,
  page = 1,
  pageSize = 8
): Promise<unknown[]> {
  if (!API_BASE_URL) return [];

  try {
    const res = await fetch(
      `${API_BASE_URL}getnews-bycategory/${encodeURIComponent(category)}?page=${page}&pageSize=${pageSize}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching ${category} articles:`, error);
    return [];
  }
}

export async function getSubCategoryArticles(
  category: string,
  subcategory: string,
  page = 1,
  pageSize = 8
): Promise<unknown[]> {
  if (!API_BASE_URL) return [];

  try {
    const res = await fetch(
      `${API_BASE_URL}getnews-bycategoryandsubcat/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}?page=${page}&pageSize=${pageSize}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching ${category}/${subcategory} articles:`, error);
    return [];
  }
}

/**
 * Fetches the list of subcategories for a given category, e.g.
 * https://mapi.sadaivsatya.com/api/AdminApi/subcatsbycategory/Motivational%20Effort
 *
 * Response shape: [{ nameinHindi, subCat_Name, cat_Name }, ...]
 *
 * Note: this hits a different base URL (SUBCAT_API_BASE) than the other
 * functions in this file, which use API_BASE_URL from env.
 */
export async function getJourneySubCategories(
  category: string
): Promise<{ nameinHindi: string; subCat_Name: string; cat_Name: string }[]> {
  try {
    const res = await fetch(
      `${SUBCAT_API_BASE}/subcatsbycategory/${encodeURIComponent(category)}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching subcategories for ${category}:`, error);
    return [];
  }
}

export const webStoriesAPI = {
  getAll: async (category = 'all', page = 1, limit = 12) => {
    if (!API_BASE_URL) return { success: false, stories: [] };

    try {
      const res = await fetch(
        `${API_BASE_URL}GetWebStories?category=${category}&page=${page}&pageSize=${limit}`,
        { next: { revalidate: 60 } }
      );

      if (!res.ok) return { success: false, stories: [] };
      return await res.json();
    } catch (error) {
      console.error('Error fetching web stories:', error);
      return { success: false, stories: [] };
    }
  },

  getBySlug: async (slug: string) => {
    if (!API_BASE_URL) {
      throw new Error('API_BASE_URL is not defined');
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}GetWebStoryBySlug/${slug}`,
        { next: { revalidate: 60 } }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch story: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error(`Error fetching story ${slug}:`, error);
      throw error;
    }
  }
};

export async function getNewsByState(
  state: string,
  page = 1,
  pageSize = 8
): Promise<unknown[]> {
  if (!API_BASE_URL) return [];

  try {
    const res = await fetch(
      `${API_BASE_URL}getnews-bystate/${encodeURIComponent(state)}?page=${page}&pageSize=${pageSize}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching state news:`, error);
    return [];
  }
}