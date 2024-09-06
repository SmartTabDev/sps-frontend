import { Query } from '@cubejs-client/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import uniqBy from 'lodash/uniqBy';
import map from 'lodash/map';
import pick from 'lodash/pick';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import axios from 'axios';
import { ProductMonitorFeature } from '../types';

const Features = getCubeName('Features', 'prm', true);
const ProductFeatures = getCubeName('ProductFeatures', 'prm', true);

export function getQueryFeatures(productIds: string[]): Query {
  return {
    dimensions: [
      `${Features}.name`,
      `${Features}.id`,
      `${ProductFeatures}.value`,
      `${ProductFeatures}.id`,
      `${ProductFeatures}.productId`,
    ],
    filters: [
      {
        dimension: `${ProductFeatures}.productId`,
        operator: 'equals',
        values: productIds,
      },
    ],
  };
}

export function useProductMonitorFeatures(
  productIds?: string[]
): ProductMonitorFeature[] | undefined {
  const dispatch = useDispatch();
  const [result, setResult] = useState<ProductMonitorFeature[]>();

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (productIdsToFetch: string[]) => {
      if (cubeAccessToken) {
        try {
          const res = await axios.post<{ data: any[] }>(
            `${process.env.REACT_APP_CUBE_JS_API}/load`,
            { query: getQueryFeatures(productIdsToFetch) },
            {
              headers: {
                'Content-type': 'application/json',
                Authorization: cubeAccessToken,
              },
            }
          );

          const rows = res.data.data;

          const features = uniqBy(rows, `${Features}.id`);

          const productFeatures = uniqBy(rows, `${ProductFeatures}.id`);

          const mainFeaturesKeys = map(
            map(features, (feature) =>
              pick(feature, `${Features}.id`, `${Features}.name`)
            ),
            getDimensionKeys
          );
          const featuresWithValues = mainFeaturesKeys.map((feature) => ({
            ...feature,
            values: map(
              map(
                productFeatures.filter(
                  (productFeature) =>
                    productFeature[`${Features}.id`] === feature.id
                ),
                (productFeature) =>
                  pick(
                    productFeature,
                    `${ProductFeatures}.id`,
                    `${ProductFeatures}.value`,
                    `${ProductFeatures}.productId`
                  )
              ),
              getDimensionKeys
            ),
          }));

          setResult(featuresWithValues);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchProductMonitorFeatures'));
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (productIds) {
      fetch(productIds);
    }
  }, [productIds, fetch]);

  return result;
}
