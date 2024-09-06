import { SPSConfig, ProductLink } from 'types/AppConfig';

const getProductLinks = (config: SPSConfig): ProductLink[] => {
  const {
    links, categories, brands, products, retailers,
  } = config;

  const productLinks = links.map((link) => {
    const { product, retailer } = link;
    const productId = product;
    const retailerId = retailer;
    const productObject = products.find((p) => p.id === productId);

    if (productObject) {
      const retailerObject = retailers.find((r) => r.id === retailerId);
      const categoryObject = categories.find((c) => c.id === productObject.category);
      const brandObject = brands.find((b) => b.id === productObject.brand);

      return {
        ...link,
        product: productObject,
        retailer: retailerObject || null,
        category: categoryObject || null,
        brand: brandObject || null,
      };
    }

    return null as any;
  });

  const filteredLinks = productLinks.filter(Boolean);

  return filteredLinks;
};

export default getProductLinks;
