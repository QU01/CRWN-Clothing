import { createSelector } from 'reselect';

import SHOP_DATA from './shop.data';


const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => SHOP_DATA 
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  );