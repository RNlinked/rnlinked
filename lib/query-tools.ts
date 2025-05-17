import qs from "query-string";

type UrlQueryParams = {
  params: string;
  key?: string;
  value?: string;
  deleteKeys?: string[];
};

/**
 * Modifies the query parameters of a URL.
 *
 * @param params - The current query string parameters.
 * @param key - The key of the query parameter to add or update.
 * @param value - The value of the query parameter to add or update.
 * @param deleteKeys - An array of keys to delete from the query parameters.
 * @returns The modified query string.
 */

export const modifyUrlQuery = ({
  params,
  key,
  value,
  deleteKeys,
}: UrlQueryParams) => {
  const queryString = qs.parse(params);

  if (key && value) {
    queryString[key] = value;
  }

  if (deleteKeys) {
    deleteKeys.forEach((key) => {
      delete queryString[key];
    });
  }

  return qs.stringify(queryString, { skipNull: true, skipEmptyString: true });
};
