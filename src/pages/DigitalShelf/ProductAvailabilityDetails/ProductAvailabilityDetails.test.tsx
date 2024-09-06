import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { setKPIConfig } from 'reducers/config/actions';
import { setAvailabilityDetails } from 'reducers/productAvailability';
import storeRegistry from 'storeRegistry';
import { nextId, render } from '__test__/test-utils-new';
import ProductAvailabilityDetails from '.';
import { Product } from '../../../types/Product';

const store = storeRegistry.getStore();

// Why ProductAvailabilityDetails exists?
// It is:
// - rendering two switches
// - - first for changing "view"
// - - second for changing "filter"
// - rendering DetailsTable, but it's not passign any props to it,
// - - that's why we don't need to test any other cases with it

function newProduct(
  retailerid: number,
  productname: string,
  available = true
): Product {
  const id = nextId();
  return {
    price: '',
    available,
    categoryid: nextId(),
    ispageavailable: true,
    productid: id,
    productname,
    retailerid,
    url: 'https://www.doz.pl/apteka/p5535-Essentiale_forte_300_mg_kapsulki_50_szt.',
    variantlinkid: nextId(),
    brandname: 'brandname',
    brandid: nextId(),
    retailername: 'retailername',
    currencyiso: 'currencyiso',
    countryiso: 'countryiso',
    categoryname: 'categoryname',
    createdat: null,
    rundate: null,
    reviewcount: 123,
    clients: 1,
    roundrating: 2,
    rating: 2,
  };
}

// run this action before each test
beforeEach(async () => {
  store.dispatch(
    setKPIConfig({
      config: {
        products: [],
        brands: [],
        categories: [],
        retailers: [
          { id: 1, name: 'Retailer A', url: 'retailer-a-url' },
          { id: 2, name: 'Retailer B', url: 'retailer-a-url' },
          { id: 3, name: 'Retailer C', url: 'retailer-a-url' },
        ],
        links: [],
        categoryRetailers: [],
        searchRetailers: [],
        productRetailers: [],
        keywordLinks: [],
      },
    })
  );

  store.dispatch(
    setAvailabilityDetails([
      newProduct(1, 'Retailer A, Product A Available'),
      newProduct(1, 'Retailer A, Product B Available'),
      newProduct(1, 'Retailer A, Product Unavailable', false),

      newProduct(2, 'Retailer B, Product A Available'),
      newProduct(2, 'Retailer B, Product B Available'),
      newProduct(2, 'Retailer B, Product Unavailable', false),
      // retailer C will be empty
    ])
  );

  render(<ProductAvailabilityDetails searchFilter="" />);

  await waitForElementToBeRemoved(
    () => screen.queryByText('Building your table'),
    { timeout: 5000 }
  );
});

function getFilterButtonByText(
  text: string
): ReturnType<typeof screen.getByText> {
  return screen.getByText(text, { selector: 'li' });
}

test('should render all active elements', async () => {
  expect(getFilterButtonByText('Retailer')).toBeInTheDocument();
  expect(getFilterButtonByText('Category')).toBeInTheDocument();
  expect(getFilterButtonByText('SKU')).toBeInTheDocument();

  expect(getFilterButtonByText('All')).toBeInTheDocument();
  expect(getFilterButtonByText('In stock')).toBeInTheDocument();
  expect(getFilterButtonByText('Out of stock')).toBeInTheDocument();
});

test('initially should display table by retailer', async () => {
  const [first, second, third] = screen.getAllByText(
    /Retailer|Category|Product/,
    { selector: 'th' }
  );

  expect(first).toHaveTextContent('Retailer');
  expect(second).toHaveTextContent('Product');
  expect(third).toHaveTextContent('Category');
});

test('display table by product', async () => {
  fireEvent.click(getFilterButtonByText('SKU'));
  const [first, second, third] = screen.getAllByText(
    /Retailer|Category|Product/,
    { selector: 'th' }
  );

  expect(first).toHaveTextContent('Product');
  expect(second).toHaveTextContent('Retailer');
  expect(third).toHaveTextContent('Category');
});

test('display table by category', async () => {
  fireEvent.click(getFilterButtonByText('Category'));
  const [first, second, third] = screen.getAllByText(
    /Retailer|Category|Product/,
    { selector: 'th' }
  );

  expect(first).toHaveTextContent('Category');
  expect(second).toHaveTextContent('Product');
  expect(third).toHaveTextContent('Retailer');
});

// test('filter - all products', () => {
//   expect(screen.queryByText('Retailer A, Product A Available')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer A, Product B Available')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer A, Product Unavailable')).toBeInTheDocument();

//   expect(screen.queryByText('Retailer B, Product A Available')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer B, Product B Available')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer B, Product Unavailable')).toBeInTheDocument();

//   expect(screen.queryByText('Retailer A')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer B')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer C')).not.toBeInTheDocument();
// });

// test('filter - only available products', () => {
//   fireEvent.click(getFilterButtonByText('In stock'));

//   expect(screen.queryByText('Retailer A, Product A Available')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer A, Product B Available')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer A, Product Unavailable')).not.toBeInTheDocument();

//   expect(screen.queryByText('Retailer B, Product A Available')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer B, Product B Available')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer B, Product Unavailable')).not.toBeInTheDocument();

//   expect(screen.queryByText('Retailer A')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer B')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer C')).not.toBeInTheDocument();
// });

// test('filter - only unavailable products', () => {
//   fireEvent.click(getFilterButtonByText('Out of stock'));

//   expect(screen.queryByText('Retailer A, Product A Available')).not.toBeInTheDocument();
//   expect(screen.queryByText('Retailer A, Product B Available')).not.toBeInTheDocument();
//   expect(screen.queryByText('Retailer A, Product Unavailable')).toBeInTheDocument();

//   expect(screen.queryByText('Retailer B, Product A Available')).not.toBeInTheDocument();
//   expect(screen.queryByText('Retailer B, Product B Available')).not.toBeInTheDocument();
//   expect(screen.queryByText('Retailer B, Product Unavailable')).toBeInTheDocument();

//   expect(screen.queryByText('Retailer A')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer B')).toBeInTheDocument();
//   expect(screen.queryByText('Retailer C')).not.toBeInTheDocument();
// });
