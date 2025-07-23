export function useHtmlTransformer() {
  const transformMentionsAndLinks = (html: string): string => {
    if (!html) return "";

    // Transform <span class="mention" ...> to <a href="...">
    html = html.replace(
      /<span class="mention"[^>]*?data-type="mention"[^>]*?data-id="(.*?)"[^>]*?data-label="(.*?)"[^>]*?data-mention-suggestion-char="(@|#)"[^>]*?>.*?<\/span>/gi,
      (_match, id, label, char) => {
        const href = char === "#" ? `/search?q=${label}` : `/${id}`;
        return `<a class="mention" href="${href}" data-id="${id}" data-type="mention">${char}${label}</a>`;
      }
    );

    // Transform plain URLs to clickable <a> tags
    html = html.replace(
      /((https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\S*))/gi,
      (match) => {
        const url = match.startsWith("http") ? match : `https://${match}`;
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="link">${match}</a>`;
      }
    );

    html = html
      .replace(/<\/?p>/g, "")
      // Convert #hashtags
      .replace(/#([\w-]+)/g, (_, tag) => {
        return `<a  @click.stop="() => {}" href="/search?q=${tag}"  data-id="${tag}" data-type="${tag}" class="mention" class="font-medium">#${tag}</a>`;
      });

    return html;
  };

  return {
    transformMentionsAndLinks,
  };
}
