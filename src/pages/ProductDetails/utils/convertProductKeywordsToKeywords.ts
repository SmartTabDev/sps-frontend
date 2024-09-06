import { Keyword } from '../components/ProductKeywordsMatch/components/KeywordList/KeywordList';

export const convertProductKeywordsToKeywords = (
  productKeywords: string
): Keyword[] => {
  if (!productKeywords) return [];

  const keywordGroups = productKeywords.split(';');

  const keywords: Keyword[] = keywordGroups.map((keywordGroup) => {
    const allVariations = keywordGroup.split(',');

    return {
      name: allVariations[0] as string,
      otherVariations: allVariations.slice(1),
    };
  });

  return keywords;
};
