/**
 * Grafton Studio Site
 *
 * @module /stores/tabStore.js
 * @description Nano Store for tab system - <TabsCollection>, <Tab>, <TabPanel>.
 */
import { atom } from 'nanostores';

export const $activeTabId = atom('featured-tab');